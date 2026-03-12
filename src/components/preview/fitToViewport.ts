import type { Bounds } from "../../types/geometry";

export interface FitPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface FitResult {
  scale: number;
  offsetX: number;
  offsetY: number;
}

export function fitToViewport(
  bounds: Bounds,
  viewportWidth: number,
  viewportHeight: number,
  padding: number | FitPadding = 40,
  zoom = 1,
  panX = 0,
  panY = 0
): FitResult {
  const resolvedPadding =
    typeof padding === "number"
      ? {
          top: padding,
          right: padding,
          bottom: padding,
          left: padding,
        }
      : padding;

  const shapeWidth = Math.max(1, bounds.maxX - bounds.minX);
  const shapeHeight = Math.max(1, bounds.maxY - bounds.minY);

  const availableWidth = Math.max(
    1,
    viewportWidth - resolvedPadding.left - resolvedPadding.right
  );
  const availableHeight = Math.max(
    1,
    viewportHeight - resolvedPadding.top - resolvedPadding.bottom
  );

  const baseScale = Math.min(
    availableWidth / shapeWidth,
    availableHeight / shapeHeight
  );

  const scale = baseScale * zoom;

  const offsetX =
    resolvedPadding.left +
    (availableWidth - shapeWidth * scale) / 2 -
    bounds.minX * scale +
    panX;

  const offsetY =
    resolvedPadding.top +
    (availableHeight - shapeHeight * scale) / 2 -
    bounds.minY * scale +
    panY;

  return {
    scale,
    offsetX,
    offsetY,
  };
}