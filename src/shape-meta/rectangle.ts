import type { ShapeMeta } from "../types/shape";

export const rectangleMeta: ShapeMeta = {
  type: "rectangle",
  label: "Rectangle",
  defaultParameters: {
    width: 1200,
    height: 800,
  },
  parameterMeta: [
    { key: "width", label: "Width", min: 1, step: 1 },
    { key: "height", label: "Height", min: 1, step: 1 },
  ],
};