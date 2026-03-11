import type { FitResult } from "./fitToViewport";

interface DrawShapeImageOptions {
  image: CanvasImageSource;
  fit: FitResult;
  imageBounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
}

export function drawShapeImage(
  ctx: CanvasRenderingContext2D,
  options: DrawShapeImageOptions
): void {
  const { image, fit, imageBounds } = options;

  const width = (imageBounds.maxX - imageBounds.minX) * fit.scale;
  const height = (imageBounds.maxY - imageBounds.minY) * fit.scale;
  const x = imageBounds.minX * fit.scale + fit.offsetX;
  const y = imageBounds.minY * fit.scale + fit.offsetY;

  ctx.drawImage(image, x, y, width, height);
}