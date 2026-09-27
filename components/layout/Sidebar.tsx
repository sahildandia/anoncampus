"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Compass, 
  Dices, 
  MessageCircle, 
  Users, 
  MessageSquare, 
  UsersRound, 
  BookOpen, 
  Search, 
  BarChart2, 
  Folder, 
  Bell, 
  Settings 
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/random-chat", label: "Random Chat", icon: Dices },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/communities", label: "Communities", icon: Users },
  { href: "/confessions", label: "Confessions", icon: MessageSquare },
  { href: "/groups", label: "Groups", icon: UsersRound },
  { href: "/study-groups", label: "Study Groups", icon: BookOpen },
  { href: "/team-finder", label: "Team Finder", icon: Search },
  { href: "/polls", label: "Polls", icon: BarChart2 },
  { href: "/resources", label: "Resources", icon: Folder },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ username = "Anonymous" }: { username?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col h-screen sticky top-0 hidden md:flex">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 dark:text-blue-500">
          <Dices className="w-6 h-6" />
          <span>AnonCampus</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium truncate max-w-[140px]">{username}</span>
            <span className="text-xs text-neutral-500">View Profile</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
