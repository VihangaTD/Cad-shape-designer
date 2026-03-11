import type { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}