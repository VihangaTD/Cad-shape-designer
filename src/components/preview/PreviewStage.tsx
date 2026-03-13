import type { RefObject } from "react";
import { Loader2, Ruler } from "lucide-react";
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

function formatAreaMm2(area: number): string {
  return `${area.toFixed(2)} mm²`;
}

function calculateShapeArea(
  type: string,
  parameters: Record<string, number>
): number {
  switch (type) {
    case "rectangle":
      return (parameters.width ?? 0) * (parameters.height ?? 0);

    case "circle":
      return Math.PI * (parameters.radius ?? 0) ** 2;

    case "triangle":
      return 0.5 * (parameters.base ?? 0) * (parameters.height ?? 0);

    case "lshape":
      return (
        (parameters.outerWidth ?? 0) * (parameters.outerHeight ?? 0) -
        (parameters.cutoutWidth ?? 0) * (parameters.cutoutHeight ?? 0)
      );

    case "trapezoid":
      return (
        ((parameters.topWidth ?? 0) + (parameters.bottomWidth ?? 0)) / 2 *
        (parameters.height ?? 0)
      );

    default:
      return 0;
  }
}

export default function PreviewStage({ canvasRef }: PreviewStageProps) {
  const config = useShapeStore((state) => state.config);
  const preview = usePreviewStore((state) => state.preview);
  const isLoading = usePreviewStore((state) => state.isLoading);
  const error = usePreviewStore((state) => state.error);
  const resetView = useUiStore((state) => state.resetView);

  const meta = shapeMetaRegistry[config.type];
  const area = calculateShapeArea(config.type, config.parameters);

  return (
    <Panel
      title="Preview Workspace"
      description="Live canvas preview with measurements."
      className="w-full"
    >
      <div className="flex flex-col gap-4">

        {/* HEADER */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <span className="text-sm font-medium text-slate-700">
            {meta.label} preview
          </span>

          <div className="flex gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-white px-3 py-1 shadow">
              Rotation {config.rotation}°
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow">
              Flip X {config.flipX ? "On" : "Off"}
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow">
              Flip Y {config.flipY ? "On" : "Off"}
            </span>
          </div>
        </div>

        {/* TOOLBAR */}
        <PreviewToolbar onFit={resetView} />

        {/* CANVAS */}
        <div className="min-h-[420px]">
          {isLoading ? (
            <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <Loader2 className="animate-spin" size={18} />
            </div>
          ) : error ? (
            <div className="flex h-[420px] items-center justify-center rounded-xl border border-red-200 bg-red-50">
              <span className="text-sm text-red-600">{error}</span>
            </div>
          ) : preview ? (
            <ShapePreviewCanvas preview={preview} canvasRef={canvasRef} />
          ) : null}
        </div>

        {/* MEASUREMENTS BELOW CANVAS */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex items-center gap-2 mb-4">
            <Ruler size={16} />
            <h3 className="text-sm font-semibold">Measurements</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

            {meta.parameterMeta.map((param) => (
              <div
                key={param.key}
                className="flex justify-between rounded-lg bg-slate-50 px-3 py-2"
              >
                <span className="text-sm text-slate-600">
                  {param.label}
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {(config.parameters[param.key] ?? 0).toFixed(2)} mm
                </span>
              </div>
            ))}

            {/* AREA */}
            <div className="flex justify-between rounded-lg bg-slate-100 px-3 py-2 border border-slate-200">

              <span className="text-sm text-slate-700">
                Area
              </span>

              <span className="text-sm font-bold text-slate-900">
                {formatAreaMm2(area)}
              </span>

            </div>

          </div>

        </div>

      </div>
    </Panel>
  );
}