import Link from "next/link";
import { MessageSquare, Users, BookOpen, Shield, Dices, UsersRound } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <header className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900 sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-500" />
          <span>AnonCampus</span>
        </div>
        <nav className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500">
            Log In
          </Link>
          <Link href="/register" className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <section className="text-center max-w-3xl mx-auto mb-24">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Connect Without Revealing Who You Are
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            An anonymous college community for conversations, random connections, collaboration and campus life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md transition shadow-lg">
              Get Started
            </Link>
            <Link href="/explore" className="text-lg font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-8 py-4 rounded-md transition shadow-sm">
              Explore
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 w-full">
          <FeatureCard
            icon={<Dices className="w-8 h-8 text-blue-500" />}
            title="Random Connections"
            description="Meet another student anonymously. Have spontaneous chats without judgment."
          />
          <FeatureCard
            icon={<MessageSquare className="w-8 h-8 text-blue-500" />}
            title="Anonymous Discussions"
            description="Share thoughts and questions without displaying your real identity."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-blue-500" />}
            title="College Communities"
            description="Join conversations around your department, year and interests."
          />
          <FeatureCard
            icon={<UsersRound className="w-8 h-8 text-blue-500" />}
            title="Find Teammates"
            description="Build teams for projects and hackathons with fellow students."
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-blue-500" />}
            title="Study Together"
            description="Create and join study groups to prepare for exams and placements."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-500" />}
            title="Safe Community"
            description="Built-in reporting, blocking and moderation tools to keep discussions healthy."
          />
        </section>
      </main>

      <footer className="px-6 py-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-neutral-500 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} AnonCampus. All rights reserved.</p>
        <p className="text-sm mt-2">Connect. Chat. Share. Stay Anonymous.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm flex flex-col items-start gap-4 hover:shadow-md transition">
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
