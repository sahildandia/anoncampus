import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-neutral-500 mt-2">See what&apos;s happening across campus.</p>
      </header>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 mb-8">
        <textarea 
          placeholder="Share something anonymously..." 
          className="w-full bg-transparent resize-none outline-none text-lg min-h-[100px]"
        ></textarea>
        <div className="flex justify-between items-center mt-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex gap-2">
            <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full font-medium">Posting as Anonymous_472</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition">
            Post
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <PostCard 
          author="Anonymous_821" 
          time="2 hours ago" 
          content="Does anyone know when the placement training starts? I heard it was next week but haven't received any email yet."
          likes={12}
          comments={5}
        />
        <PostCard 
          author="Anonymous_193" 
          time="4 hours ago" 
          content="The new AI elective is actually so hard. The professor expects us to know PyTorch inside out."
          likes={45}
          comments={18}
          community="CSE 3rd Year"
        />
        <PostCard 
          author="Anonymous_527" 
          time="1 day ago" 
          content="Confession: I pretend to take notes in the front row but I'm actually just playing 2048."
          likes={132}
          comments={24}
          isConfession={true}
        />
      </div>
    </div>
  );
}

function PostCard({ author, time, content, likes, comments, community, isConfession }: { author: string, time: string, content: string, likes: number, comments: number, community?: string, isConfession?: boolean }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-neutral-300 dark:hover:border-neutral-700 transition">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isConfession ? 'bg-purple-100 text-purple-700' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'}`}>
            {author.charAt(10)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{isConfession ? 'Anonymous Confession' : author}</span>
              {community && (
                <>
                  <span className="text-neutral-400 text-xs">•</span>
                  <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">{community}</span>
                </>
              )}
            </div>
            <span className="text-xs text-neutral-500">{time}</span>
          </div>
        </div>
        <button className="text-neutral-400 hover:text-neutral-600 transition">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <p className="text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
        {content}
      </p>
      
      <div className="flex gap-6 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/50 text-neutral-500">
        <button className="flex items-center gap-1.5 hover:text-red-500 transition group">
          <Heart className="w-5 h-5 group-hover:fill-red-500/20" />
          <span className="text-sm font-medium">{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-blue-500 transition group">
          <MessageSquare className="w-5 h-5 group-hover:fill-blue-500/20" />
          <span className="text-sm font-medium">{comments}</span>
        </button>
        <button className="flex items-center gap-1.5 hover:text-green-500 transition ml-auto">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
