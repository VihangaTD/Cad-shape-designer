import { FlipHorizontal2, FlipVertical2 } from "lucide-react";

interface FlipControlProps {
  flipX: boolean;
  flipY: boolean;
  onToggleX: () => void;
  onToggleY: () => void;
}

export default function FlipControl({
  flipX,
  flipY,
  onToggleX,
  onToggleY,
}: FlipControlProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-600">Flip</label>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onToggleX}
          className={[
            "inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition",
            flipX
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
          ].join(" ")}
        >
          <FlipHorizontal2 size={14} />
          <span>X</span>
        </button>

        <button
          type="button"
          onClick={onToggleY}
          className={[
            "inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition",
            flipY
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
          ].join(" ")}
        >
          <FlipVertical2 size={14} />
          <span>Y</span>
        </button>
      </div>
    </div>
  );
}