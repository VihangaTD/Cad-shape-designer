import type { ShapeMeta } from "../types/shape";

export const circleMeta: ShapeMeta = {
  type: "circle",
  label: "Circle",
  defaultParameters: {
    radius: 500,
  },
  parameterMeta: [{ key: "radius", label: "Radius", min: 1, step: 1 }],
};