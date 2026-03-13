import { RotateCcw, Ruler } from "lucide-react";
import { shapeMetaRegistry } from "../../shape-meta";
import { useShapeStore } from "../../store/shapeStore";
import { useUiStore } from "../../store/uiStore";
import { snapValue } from "../../utils/snap";
import Panel from "../layout/Panel";
import FlipControl from "./FlipControl";
import ParameterInput from "./ParameterInput";
import RotationControl from "./RotationControl";

export default function ShapeEditor() {
  const config = useShapeStore((state) => state.config);
  const setParameter = useShapeStore((state) => state.setParameter);
  const setRotation = useShapeStore((state) => state.setRotation);
  const toggleFlipX = useShapeStore((state) => state.toggleFlipX);
  const toggleFlipY = useShapeStore((state) => state.toggleFlipY);
  const resetCurrentShape = useShapeStore((state) => state.resetCurrentShape);

  const snapEnabled = useUiStore((state) => state.snapEnabled);
  const snapSize = useUiStore((state) => state.snapSize);

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