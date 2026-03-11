import { ScanSearch, SquareDashedMousePointer } from "lucide-react";
import Panel from "../layout/Panel";
import { useShapeStore } from "../../store/shapeStore";
import { shapeMetaRegistry } from "../../shape-meta";

export default function PreviewStage() {
  const config = useShapeStore((state) => state.config);
  const meta = shapeMetaRegistry[config.type];

  return (
    <Panel
      title="Preview Workspace"
      description="Phase 2 preview summary before backend SVG and Canvas integration."
      className="h-full min-h-[640px]"
    >
      <div className="flex h-[560px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
        <div className="flex w-full max-w-[760px] flex-col items-center gap-6 p-6">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <ScanSearch size={14} />
              <span>Shape config preview</span>
            </div>

            <p className="text-base font-semibold text-slate-800">
              {meta.label} selected
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Next phase will replace this placeholder with backend SVG +
              Canvas rendering.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative flex min-h-[300px] items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm">
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600">
                <SquareDashedMousePointer size={14} />
                <span>Canvas area placeholder</span>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="rounded-xl border-2 border-slate-900 bg-slate-200 px-10 py-12 text-sm font-semibold text-slate-800">
                  {meta.label}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    Rotation: {config.rotation}°
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    Flip X: {config.flipX ? "On" : "Off"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    Flip Y: {config.flipY ? "On" : "Off"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Current Parameters
              </h3>

              <div className="mt-4 space-y-3">
                {meta.parameterMeta.map((parameter) => (
                  <div
                    key={parameter.key}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                  >
                    <span className="text-sm text-slate-600">
                      {parameter.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {config.parameters[parameter.key] ?? 0} mm
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}