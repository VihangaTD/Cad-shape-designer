import type { Point } from "../../types/geometry";
import type { FitResult } from "./fitToViewport";

export function worldToCanvas(point: Point, fit: FitResult): Point {
  return {
    x: point.x * fit.scale + fit.offsetX,
    y: point.y * fit.scale + fit.offsetY,
  };
}