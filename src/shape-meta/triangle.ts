import type { ShapeMeta } from "../types/shape";

export const triangleMeta: ShapeMeta = {
  type: "triangle",
  label: "Triangle",
  defaultParameters: {
    base: 1000,
    height: 700,
  },
  parameterMeta: [
    { key: "base", label: "Base", min: 1, step: 1 },
    { key: "height", label: "Height", min: 1, step: 1 },
  ],
};