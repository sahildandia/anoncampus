import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponse & { socket: any }) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
    
    // Matchmaking variables
    let waitingQueue: string[] = [];

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("join_random_queue", () => {
        // Basic matchmaking
        if (waitingQueue.length > 0) {
          const partnerId = waitingQueue.shift();
          if (partnerId) {
            const roomId = `room-${Date.now()}`;
            socket.join(roomId);
            io.sockets.sockets.get(partnerId)?.join(roomId);
            
            io.to(roomId).emit("random_match_found", { roomId });
            console.log(`Matched ${socket.id} with ${partnerId} in ${roomId}`);
          }
        } else {
          waitingQueue.push(socket.id);
          console.log("Added to queue:", socket.id);
        }
      });
      
      socket.on("cancel_random_queue", () => {
        waitingQueue = waitingQueue.filter(id => id !== socket.id);
      });

      socket.on("send_message", ({ roomId, content, sender }) => {
        io.to(roomId).emit("receive_message", { id: Date.now().toString(), sender, content });
      });
      
      socket.on("end_chat", ({ roomId }) => {
        socket.to(roomId).emit("partner_disconnected");
        socket.leave(roomId);
      });

      socket.on("disconnect", () => {
        waitingQueue = waitingQueue.filter(id => id !== socket.id);
        console.log("Socket disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
