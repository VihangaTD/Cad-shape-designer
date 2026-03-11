import { ScanSearch, SquareDashedMousePointer } from "lucide-react";
import Panel from "../layout/Panel";

export default function PreviewStage() {
  return (
    <Panel
      title="Preview Workspace"
      description="Centered canvas area for the live shape preview."
      className="h-full min-h-[640px]"
    >
      <div className="flex h-[560px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
        <div className="flex w-full max-w-[720px] flex-col items-center gap-6 p-6">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <ScanSearch size={14} />
              <span>Canvas preview area</span>
            </div>

            <p className="text-base font-semibold text-slate-800">
              Canvas Preview Placeholder
            </p>
            <p className="mt-1 text-sm text-slate-500">
              In the next phase, backend-generated SVG will be drawn here using
              Canvas.
            </p>
          </div>

          <div className="relative flex h-[280px] w-[420px] items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm">
            <div className="absolute inset-4 rounded-lg border border-dashed border-slate-200" />

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600">
              <SquareDashedMousePointer size={14} />
              <span>Shape area</span>
            </div>

            <div className="relative h-[140px] w-[220px] rounded-md border-2 border-slate-900 bg-slate-200/70">
              <span className="absolute left-1/2 top-[-34px] -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white">
                1200 mm
              </span>

              <span className="absolute right-[-52px] top-1/2 -translate-y-1/2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white">
                800 mm
              </span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}