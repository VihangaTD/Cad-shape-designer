import type { RefObject } from "react";
import { Loader2, ScanSearch } from "lucide-react";
import Panel from "../layout/Panel";
import { useShapeStore } from "../../store/shapeStore";
import { usePreviewStore } from "../../store/previewStore";
import { shapeMetaRegistry } from "../../shape-meta";
import ShapePreviewCanvas from "./ShapePreviewCanvas";
import PreviewToolbar from "./PreviewToolbar";
import { useUiStore } from "../../store/uiStore";

interface PreviewStageProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function PreviewStage({ canvasRef }: PreviewStageProps) {
  const config = useShapeStore((state) => state.config);
  const preview = usePreviewStore((state) => state.preview);
  const isLoading = usePreviewStore((state) => state.isLoading);
  const error = usePreviewStore((state) => state.error);
  const resetView = useUiStore((state) => state.resetView);

  const meta = shapeMetaRegistry[config.type];

  return (
    <Panel
      title="Preview Workspace"
      description="Live canvas preview with improved zoom, pan, grid, and dimensions."
      className="h-full min-h-[640px]"
    >
      <div className="flex h-[560px] flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
            <ScanSearch size={16} />
            <span>{meta.label} live preview</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Rotation: {config.rotation}°
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Flip X: {config.flipX ? "On" : "Off"}
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Flip Y: {config.flipY ? "On" : "Off"}
            </span>
          </div>
        </div>

        <PreviewToolbar onFit={resetView} />

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-h-0">
            {isLoading ? (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Loading preview...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-xl border border-dashed border-red-300 bg-red-50">
                <p className="text-sm font-medium text-red-600">{error}</p>
              </div>
            ) : preview ? (
              <ShapePreviewCanvas preview={preview} canvasRef={canvasRef} />
            ) : (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <p className="text-sm font-medium text-slate-500">
                  No preview available
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Measurements
            </h3>

            <div className="mt-4 space-y-3">
              {Object.entries(config.parameters).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                >
                  <span className="text-sm capitalize text-slate-600">
                    {key}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {value} mm
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}