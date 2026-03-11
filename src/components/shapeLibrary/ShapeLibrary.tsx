import {
  Circle,
  Pentagon,
  Radius,
  RectangleHorizontal,
  Shapes,
} from "lucide-react";
import Panel from "../layout/Panel";

const shapes = [
  { label: "Rectangle", icon: RectangleHorizontal },
  { label: "Circle", icon: Circle },
  { label: "Triangle", icon: Pentagon },
  { label: "L Shape", icon: Shapes },
  { label: "Trapezoid", icon: Radius },
];

export default function ShapeLibrary() {
  return (
    <Panel
      title="Shape Library"
      description="Choose one of the predefined shapes."
    >
      <div className="grid grid-cols-1 gap-3">
        {shapes.map((shape, index) => {
          const active = index === 0;
          const Icon = shape.icon;

          return (
            <button
              key={shape.label}
              type="button"
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
                <span className="text-sm font-medium">{shape.label}</span>
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