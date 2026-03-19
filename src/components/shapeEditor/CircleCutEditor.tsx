import Panel from "../layout/Panel";
import ParameterInput from "./ParameterInput";
import { useShapeStore } from "../../store/shapeStore";
import { usePreviewStore } from "../../store/previewStore";

export default function CircleCutEditor() {
  const config = useShapeStore((state) => state.config);
  const updateCircleCut = useShapeStore((state) => state.updateCircleCut);
  const preview = usePreviewStore((state) => state.preview);

  if (config.type === "circle") {
    return null;
  }

  const circleCut = config.circleCut ?? {
    enabled: false,
    cornerId: "c1",
    offsetX: 100,
    offsetY: -100,
    radius: 50,
  };

  const corners = preview?.geometry.cornerLabels ?? [];

  return (
    <Panel
      title="Circle Cut"
      description="Select a corner, then set X/Y offsets and radius."
    >
      <div className="space-y-4">
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={circleCut.enabled}
            onChange={(event) =>
              updateCircleCut({ enabled: event.target.checked })
            }
          />
          <span>Enable circle cut</span>
        </label>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Corner</label>
          <select
            value={circleCut.cornerId}
            onChange={(event) => updateCircleCut({ cornerId: event.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
            disabled={!circleCut.enabled}
          >
            {corners.length > 0 ? (
              corners.map((corner) => (
                <option key={corner.id} value={corner.id}>
                  {corner.id.toUpperCase()}
                </option>
              ))
            ) : (
              <option value="c1">C1</option>
            )}
          </select>
        </div>

        <ParameterInput
          label="X Offset"
          value={circleCut.offsetX}
          step={1}
          onChange={(value) => updateCircleCut({ offsetX: value })}
        />

        <ParameterInput
          label="Y Offset"
          value={circleCut.offsetY}
          step={1}
          onChange={(value) => updateCircleCut({ offsetY: value })}
        />

        <ParameterInput
          label="Radius"
          value={circleCut.radius}
          min={1}
          step={1}
          onChange={(value) => updateCircleCut({ radius: value })}
        />

        <p className="text-xs text-slate-500">
          Positive Y goes downward in the current canvas coordinate system.
        </p>
      </div>
    </Panel>
  );
}