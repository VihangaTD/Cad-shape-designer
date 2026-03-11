import { AppWindow, Layers3 } from "lucide-react";

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
          <AppWindow size={20} />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            CAD Shape Designer
          </h1>
          
        </div>
      </div>
    </header>
  );
}