import type { ShapeMeta } from "../types/shape";

export const trapezoidMeta: ShapeMeta = {
  type: "trapezoid",
  label: "Trapezoid",
  defaultParameters: {
    topWidth: 700,
    bottomWidth: 1200,
    height: 700,
  },
  parameterMeta: [
    { key: "topWidth", label: "Top Width", min: 1, step: 1 },
    { key: "bottomWidth", label: "Bottom Width", min: 1, step: 1 },
    { key: "height", label: "Height", min: 1, step: 1 },
  ],
};