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
  padding: number | FitPadding = 40
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

  const scale = Math.min(
    availableWidth / shapeWidth,
    availableHeight / shapeHeight
  );

  const offsetX =
    resolvedPadding.left +
    (availableWidth - shapeWidth * scale) / 2 -
    bounds.minX * scale;

  const offsetY =
    resolvedPadding.top +
    (availableHeight - shapeHeight * scale) / 2 -
    bounds.minY * scale;

  return {
    scale,
    offsetX,
    offsetY,
  };
}