import Link from "next/link";
import { Sparkles, MessageCircle, Shield, Dices, Ghost } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 selection:bg-blue-500/30">
      <header className="px-6 py-4 border-b border-neutral-800/50 flex justify-between items-center bg-neutral-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Ghost className="w-6 h-6 text-blue-500" />
          <span>AnonChat</span>
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/random-chat" className="text-sm font-medium bg-white text-black hover:bg-neutral-200 px-5 py-2 rounded-full transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Start Chatting
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

        <section className="text-center max-w-4xl mx-auto mb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-300 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>No login required. Completely anonymous.</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Meet strangers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Just talk.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Instantly connect with random people for spontaneous conversations. 
            No signups, no profiles, just text.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/random-chat" 
              className="group relative text-lg font-medium bg-white text-black px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Dices className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Start Random Chat</span>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 w-full relative z-10 mt-10">
          <FeatureCard
            icon={<Ghost className="w-6 h-6 text-blue-400" />}
            title="100% Anonymous"
            description="We don't ask for your name, email, or any personal details."
          />
          <FeatureCard
            icon={<MessageCircle className="w-6 h-6 text-purple-400" />}
            title="Instant Matching"
            description="Our matchmaking algorithm connects you with an available stranger in milliseconds."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-green-400" />}
            title="End-to-End Privacy"
            description="Chats are never saved to a database. Once you disconnect, the history is gone forever."
          />
        </section>
      </main>

      <footer className="px-6 py-8 border-t border-neutral-900 text-center text-neutral-600 relative z-10 bg-neutral-950">
        <p>© {new Date().getFullYear()} AnonChat. Built for private conversations.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-6 rounded-2xl flex flex-col items-start gap-4 hover:bg-neutral-900 transition-colors">
      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-neutral-200">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
