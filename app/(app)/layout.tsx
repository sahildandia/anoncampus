// Minimal layout for the random chat app

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
