import { circleMeta } from "./circle";
import { lshapeMeta } from "./lshape";
import { rectangleMeta } from "./rectangle";
import { trapezoidMeta } from "./trapezoid";
import { triangleMeta } from "./triangle";
import type { ShapeMeta, ShapeType } from "../types/shape";

export const shapeMetaRegistry: Record<ShapeType, ShapeMeta> = {
  rectangle: rectangleMeta,
  circle: circleMeta,
  triangle: triangleMeta,
  lshape: lshapeMeta,
  trapezoid: trapezoidMeta,
};

export const shapeMetaList: ShapeMeta[] = [
  rectangleMeta,
  circleMeta,
  triangleMeta,
  lshapeMeta,
  trapezoidMeta,
];