import {
  Grid3X3,
  Maximize,
  Minus,
  Move,
  Plus,
  Ruler,
  RotateCcw,
} from "lucide-react";
import { useUiStore } from "../../store/uiStore";

interface PreviewToolbarProps {
  onFit: () => void;
}

export default function PreviewToolbar({ onFit }: PreviewToolbarProps) {
  const zoom = useUiStore((state) => state.zoom);
  const zoomIn = useUiStore((state) => state.zoomIn);
  const zoomOut = useUiStore((state) => state.zoomOut);
  const resetView = useUiStore((state) => state.resetView);
  const showGrid = useUiStore((state) => state.showGrid);
  const setShowGrid = useUiStore((state) => state.setShowGrid);
  const showDimensions = useUiStore((state) => state.showDimensions);
  const setShowDimensions = useUiStore((state) => state.setShowDimensions);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
      <button
        type="button"
        onClick={zoomOut}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
      >
        <Minus size={16} />
      </button>

      <div className="min-w-[72px] text-center text-sm font-medium text-slate-700">
        {Math.round(zoom * 100)}%
      </div>

      <button
        type="button"
        onClick={zoomIn}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
      >
        <Plus size={16} />
      </button>

      <button
        type="button"
        onClick={onFit}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
      >
        <Maximize size={16} />
        <span>Fit</span>
      </button>

      <button
        type="button"
        onClick={resetView}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
      >
        <RotateCcw size={16} />
        <span>Reset</span>
      </button>

      <button
        type="button"
        onClick={() => setShowGrid(!showGrid)}
        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
          showGrid
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 hover:bg-slate-50"
        }`}
      >
        <Grid3X3 size={16} />
        <span>Grid</span>
      </button>

      <button
        type="button"
        onClick={() => setShowDimensions(!showDimensions)}
        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
          showDimensions
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-200 hover:bg-slate-50"
        }`}
      >
        <Ruler size={16} />
        <span>Dimensions</span>
      </button>

      <div className="ml-auto inline-flex items-center gap-2 text-xs text-slate-500">
        <Move size={14} />
        <span>Drag to pan</span>
      </div>
    </div>
  );
}