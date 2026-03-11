import type { ReactNode } from "react";

interface AppShellProps {
  header: ReactNode;
  sidebar: ReactNode;
  preview: ReactNode;
  footer: ReactNode;
}

export default function AppShell({
  header,
  sidebar,
  preview,
  footer,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <div className="border-b border-slate-200 bg-white">{header}</div>

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 gap-4 p-4">
        <aside className="flex w-full max-w-[360px] flex-col gap-4">
          {sidebar}
        </aside>

        <section className="min-w-0 flex-1">{preview}</section>
      </main>

      <div className="mx-auto w-full max-w-[1600px] px-4 pb-4">{footer}</div>
    </div>
  );
}