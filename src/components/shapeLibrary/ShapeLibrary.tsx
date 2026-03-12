import {
  Circle,
  Pentagon,
  Radius,
  RectangleHorizontal,
  Shapes,
  ShapesIcon,
  Triangle,
} from "lucide-react";
import Panel from "../layout/Panel";
import { shapeMetaList } from "../../shape-meta";
import { useShapeStore } from "../../store/shapeStore";
import type { ShapeType } from "../../types/shape";

const iconMap: Record<ShapeType, React.ComponentType<{ size?: number }>> = {
  rectangle: RectangleHorizontal,
  circle: Circle,
  triangle: Triangle,
  lshape: Shapes,
  trapezoid: ShapesIcon,
};

export default function ShapeLibrary() {
  const currentType = useShapeStore((state) => state.config.type);
  const selectShape = useShapeStore((state) => state.selectShape);

  return (
    <Panel
      title="Shape Library"
      description="Choose one of the predefined shapes."
    >
      <div className="grid grid-cols-1 gap-3">
        {shapeMetaList.map((shape) => {
          const active = currentType === shape.type;
          const Icon = iconMap[shape.type];

          return (
            <button
              key={shape.type}
              type="button"
              onClick={() => selectShape(shape.type)}
              className={[
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition",
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    active ? "bg-white/10" : "bg-white",
                  ].join(" ")}
                >
                  <Icon size={18} />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium">{shape.label}</span>
                  <span className="text-xs opacity-80">
                    {shape.parameterMeta.length} parameter
                    {shape.parameterMeta.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <span className="text-xs opacity-80">
                {active ? "Selected" : "Select"}
              </span>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}