import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Dices } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const username = session?.user?.name || "Anonymous";

  return (
    <div className="p-6">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Welcome back 👋</h1>
          <p className="text-neutral-500 mt-2 text-lg">Logged in as <span className="font-semibold text-blue-600 dark:text-blue-500">{username}</span></p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Dices className="w-6 h-6" /> Random Chat
                </h2>
                <p className="text-blue-100 max-w-md">Meet someone new anonymously. Start a spontaneous conversation right now.</p>
              </div>
              <Link href="/random-chat" className="shrink-0 bg-white text-blue-600 hover:bg-neutral-50 px-6 py-3 rounded-xl font-bold transition-all shadow-md">
                Start Chat
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 tracking-tight">Trending Discussions</h2>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
              <p className="text-sm text-neutral-500 mb-2">General • 2 hours ago</p>
              <h3 className="font-medium">Does anyone know when the placement training starts?</h3>
              <div className="flex gap-4 mt-4 text-sm text-neutral-500">
                <span>❤️ 12</span>
                <span>💬 5</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
              <p className="text-sm text-neutral-500 mb-2">Anonymous_821 • 5 mins ago</p>
              <h3 className="font-medium">The new cafeteria menu is actually pretty good!</h3>
              <div className="flex gap-4 mt-4 text-sm text-neutral-500">
                <span>❤️ 3</span>
                <span>💬 1</span>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-4">Active Communities</h2>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">CSE 3rd Year</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Placements 2027</span>
                <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">New</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Team Opportunities</h2>
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
              <h3 className="font-medium">AI Attendance System</h3>
              <p className="text-sm text-neutral-500 mt-1">Looking for: Frontend Developer</p>
              <p className="text-xs text-neutral-400 mt-2">Team: 2 / 4</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
