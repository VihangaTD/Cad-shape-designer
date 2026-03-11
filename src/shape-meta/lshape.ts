import type { ShapeMeta } from "../types/shape";

export const lshapeMeta: ShapeMeta = {
  type: "lshape",
  label: "L Shape",
  defaultParameters: {
    outerWidth: 1200,
    outerHeight: 1000,
    cutoutWidth: 500,
    cutoutHeight: 400,
  },
  parameterMeta: [
    { key: "outerWidth", label: "Outer Width", min: 1, step: 1 },
    { key: "outerHeight", label: "Outer Height", min: 1, step: 1 },
    { key: "cutoutWidth", label: "Cutout Width", min: 1, step: 1 },
    { key: "cutoutHeight", label: "Cutout Height", min: 1, step: 1 },
  ],
};