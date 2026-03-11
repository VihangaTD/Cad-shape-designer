import { FlipHorizontal2, FlipVertical2, RotateCw, Ruler } from "lucide-react";
import Panel from "../layout/Panel";

export default function ShapeEditor() {
  return (
    <Panel
      title="Dimension Editor"
      description="Editable parameters and transformations will come next."
    >
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
          <Ruler size={14} />
          <span>Phase 1 placeholder controls</span>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Width</label>
          <input
            type="number"
            value={1200}
            readOnly
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Height</label>
          <input
            type="number"
            value={800}
            readOnly
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <RotateCw size={14} />
              <span>Rotation</span>
            </label>
            <select
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none"
              defaultValue="0"
            >
              <option value="0">0°</option>
              <option value="90">90°</option>
              <option value="180">180°</option>
              <option value="270">270°</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">Flip</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400"
              >
                <FlipHorizontal2 size={14} />
                <span>X</span>
              </button>
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400"
              >
                <FlipVertical2 size={14} />
                <span>Y</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}