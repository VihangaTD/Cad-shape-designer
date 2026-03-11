import { ScanSearch, SquareDashedMousePointer } from "lucide-react";
import Panel from "../layout/Panel";
import { useShapeStore } from "../../store/shapeStore";
import { usePreviewStore } from "../../store/previewStore";
import { shapeMetaRegistry } from "../../shape-meta";

export default function PreviewStage() {
  const config = useShapeStore((state) => state.config);
  const meta = shapeMetaRegistry[config.type];

  const preview = usePreviewStore((state) => state.preview);
  const isLoading = usePreviewStore((state) => state.isLoading);
  const error = usePreviewStore((state) => state.error);

  return (
    <Panel
      title="Preview Workspace"
      description="Phase 3 backend preview contract through Tauri."
      className="h-full min-h-[640px]"
    >
      <div className="flex h-[560px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
        <div className="flex w-full max-w-[820px] flex-col items-center gap-6 p-6">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <ScanSearch size={14} />
              <span>Backend preview contract</span>
            </div>

            <p className="text-base font-semibold text-slate-800">
              {meta.label} selected
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Rust now returns preview data through a real Tauri command.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[320px] rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600">
                <SquareDashedMousePointer size={14} />
                <span>Canvas area next phase</span>
              </div>

              <div className="mt-12 flex h-[240px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
                {isLoading ? (
                  <p className="text-sm font-medium text-slate-500">
                    Loading preview from Rust...
                  </p>
                ) : error ? (
                  <p className="text-sm font-medium text-red-600">{error}</p>
                ) : preview ? (
                  <div className="space-y-3 text-center">
                    <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
                      <p className="text-sm font-semibold text-slate-900">
                        Preview response received
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        SVG generation will be implemented in the next phase.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
                      <span className="rounded-full bg-slate-100 px-3 py-1">
                        ViewBox: {preview.viewBox}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">
                        Dimensions: {preview.dimensions.length}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-slate-500">
                    No preview available
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Backend Response Summary
              </h3>

              <div className="mt-4 space-y-3">
                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-xs text-slate-500">Shape Type</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {config.type}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-xs text-slate-500">Rotation</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {config.rotation}°
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-xs text-slate-500">Flip</p>
                  <p className="text-sm font-semibold text-slate-900">
                    X: {config.flipX ? "On" : "Off"} | Y:{" "}
                    {config.flipY ? "On" : "Off"}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-xs text-slate-500">Bounds</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {preview
                      ? `${preview.bounds.minX}, ${preview.bounds.minY} → ${preview.bounds.maxX}, ${preview.bounds.maxY}`
                      : "-"}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-xs text-slate-500">SVG Length</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {preview ? `${preview.svg.length} chars` : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}