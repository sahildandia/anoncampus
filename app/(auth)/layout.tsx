import { Dices } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-3xl tracking-tight text-blue-600 dark:text-blue-500 mb-2">
          <Dices className="w-10 h-10" />
          <span>AnonCampus</span>
        </Link>
        <p className="text-neutral-500 dark:text-neutral-400">Connect. Chat. Share. Stay Anonymous.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-neutral-900 py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-neutral-200 dark:border-neutral-800">
          {children}
        </div>
      </div>
    </div>
  );
}
