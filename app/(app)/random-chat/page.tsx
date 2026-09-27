"use client";

import { useState, useEffect } from "react";
import { Dices, Search, X, Flag, Ban, Send, User } from "lucide-react";
import { io as ClientIO, Socket } from "socket.io-client";

type ChatState = "IDLE" | "SEARCHING" | "MATCHED";

export default function RandomChatPage() {
  const [chatState, setChatState] = useState<ChatState>("IDLE");
  const [messages, setMessages] = useState<{ id: string; sender: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    const socketInstance = ClientIO(process.env.NEXT_PUBLIC_APP_URL || "", {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      console.log("Connected to socket");
    });

    socketInstance.on("random_match_found", (data) => {
      setRoomId(data.roomId);
      setChatState("MATCHED");
      setMessages([{ id: "sys1", sender: "system", content: "You have been matched anonymously. Say hi!" }]);
    });

    socketInstance.on("receive_message", (data) => {
      setMessages(prev => [...prev, { id: data.id, sender: data.sender === socketInstance.id ? "me" : "partner", content: data.content }]);
    });
    
    socketInstance.on("partner_disconnected", () => {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: "system", content: "Your partner has left the chat." }]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleStartSearch = () => {
    setChatState("SEARCHING");
    socket?.emit("join_random_queue");
  };

  const handleCancelSearch = () => {
    setChatState("IDLE");
    socket?.emit("cancel_random_queue");
  };

  const handleEndChat = () => {
    setChatState("IDLE");
    setMessages([]);
    if (roomId) {
      socket?.emit("end_chat", { roomId });
      setRoomId(null);
    }
  };

  const handleNext = () => {
    handleEndChat();
    handleStartSearch();
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !roomId) return;
    socket?.emit("send_message", { roomId, content: input, sender: socket?.id });
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-2rem)] p-6 flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Random Chat</h1>
        <p className="text-neutral-500 mt-2">Connect anonymously with another student.</p>
      </header>

      <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col">
        {chatState === "IDLE" && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <Dices className="w-10 h-10 text-blue-600 dark:text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ready to meet someone?</h2>
            <p className="text-neutral-500 max-w-md mb-8">
              You will be matched with another student anonymously. Please be respectful and follow the community guidelines.
            </p>
            <button 
              onClick={handleStartSearch}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
            >
              <Search className="w-5 h-5" />
              Find Someone
            </button>
          </div>
        )}

        {chatState === "SEARCHING" && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Search className="w-10 h-10 text-blue-600 dark:text-blue-500 animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Searching for another student...</h2>
            <p className="text-neutral-500 max-w-md mb-8">
              This might take a moment depending on how many people are currently online.
            </p>
            <button 
              onClick={handleCancelSearch}
              className="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 px-6 py-3 rounded-lg font-medium transition"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        )}

        {chatState === "MATCHED" && (
          <div className="flex-1 flex flex-col h-full">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-neutral-50 dark:bg-neutral-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-neutral-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Anonymous Partner</h3>
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button title="Report" className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition">
                  <Flag className="w-5 h-5" />
                </button>
                <button title="Block" className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition">
                  <Ban className="w-5 h-5" />
                </button>
                <button onClick={handleNext} className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-md font-medium text-sm transition">
                  Next
                </button>
                <button onClick={handleEndChat} className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md font-medium text-sm transition flex items-center gap-1">
                  <X className="w-4 h-4" />
                  End
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === "system" ? "self-center items-center my-4" : 
                    msg.sender === "me" ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  {msg.sender === "system" ? (
                    <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-xs px-3 py-1 rounded-full">
                      {msg.content}
                    </span>
                  ) : (
                    <div className={`px-4 py-2 rounded-2xl ${
                      msg.sender === "me" 
                        ? "bg-blue-600 text-white rounded-br-sm" 
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 bg-neutral-100 dark:bg-neutral-800 border-transparent focus:bg-white dark:focus:bg-neutral-900 focus:border-blue-500 rounded-lg px-4 py-2 outline-none transition"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
