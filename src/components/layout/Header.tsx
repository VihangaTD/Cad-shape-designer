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
            Tauri CAD Shape Designer
          </h1>
          
        </div>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
        <Layers3 size={14} />
        <span>Phase 1</span>
      </div>
    </header>
  );
}