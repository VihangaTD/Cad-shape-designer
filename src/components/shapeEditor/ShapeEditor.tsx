import { Grid3X3, Ruler, RotateCcw } from "lucide-react";
import Panel from "../layout/Panel";
import ParameterInput from "./ParameterInput";
import RotationControl from "./RotationControl";
import FlipControl from "./FlipControl";
import { useShapeStore } from "../../store/shapeStore";
import { shapeMetaRegistry } from "../../shape-meta";
import { useUiStore } from "../../store/uiStore";
import { snapValue } from "../../utils/snap";

export default function ShapeEditor() {
  const config = useShapeStore((state) => state.config);
  const setParameter = useShapeStore((state) => state.setParameter);
  const setRotation = useShapeStore((state) => state.setRotation);
  const toggleFlipX = useShapeStore((state) => state.toggleFlipX);
  const toggleFlipY = useShapeStore((state) => state.toggleFlipY);
  const resetCurrentShape = useShapeStore((state) => state.resetCurrentShape);

  const snapEnabled = useUiStore((state) => state.snapEnabled);
  const snapSize = useUiStore((state) => state.snapSize);
  const setSnapEnabled = useUiStore((state) => state.setSnapEnabled);
  const setSnapSize = useUiStore((state) => state.setSnapSize);

  const meta = shapeMetaRegistry[config.type];

  return (
    <Panel
      title="Dimension Editor"
      description="Edit dimensions and transformations for the selected shape."
    >
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
          <Ruler size={14} />
          <span>{meta.label} parameters</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-600">
            <Grid3X3 size={14} />
            <span>Grid Snapping</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={snapEnabled}
                onChange={(e) => setSnapEnabled(e.target.checked)}
              />
              <span>Enable snap</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Step</span>
              <input
                type="number"
                min={1}
                value={snapSize}
                onChange={(e) => setSnapSize(Number(e.target.value) || 1)}
                className="h-9 w-24 rounded-lg border border-slate-200 bg-white px-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {meta.parameterMeta.map((parameter) => (
            <ParameterInput
              key={parameter.key}
              label={parameter.label}
              value={config.parameters[parameter.key] ?? 0}
              min={parameter.min}
              step={parameter.step}
              onChange={(value) =>
                setParameter(
                  parameter.key,
                  snapValue(value, snapEnabled, snapSize)
                )
              }
            />
          ))}
        </div>

        <RotationControl value={config.rotation} onChange={setRotation} />

        <FlipControl
          flipX={config.flipX}
          flipY={config.flipY}
          onToggleX={toggleFlipX}
          onToggleY={toggleFlipY}
        />

        <button
          type="button"
          onClick={resetCurrentShape}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
        >
          <RotateCcw size={14} />
          <span>Reset Current Shape</span>
        </button>
      </div>
    </Panel>
  );
}