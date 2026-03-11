import type { Bounds } from "../../types/geometry";

export interface FitResult {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export function fitToViewport(
  bounds: Bounds,
  viewportWidth: number,
  viewportHeight: number,
  padding = 40
): FitResult {
  const shapeWidth = Math.max(1, bounds.maxX - bounds.minX);
  const shapeHeight = Math.max(1, bounds.maxY - bounds.minY);

  const availableWidth = Math.max(1, viewportWidth - padding * 2);
  const availableHeight = Math.max(1, viewportHeight - padding * 2);

  const scale = Math.min(
    availableWidth / shapeWidth,
    availableHeight / shapeHeight
  );

  const offsetX =
    (viewportWidth - shapeWidth * scale) / 2 - bounds.minX * scale;
  const offsetY =
    (viewportHeight - shapeHeight * scale) / 2 - bounds.minY * scale;

  return {
    scale,
    offsetX,
    offsetY,
  };
}