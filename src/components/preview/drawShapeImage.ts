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

function snap(value: number): number {
  return Math.round(value);
}

export function drawShapeImage(
  ctx: CanvasRenderingContext2D,
  options: DrawShapeImageOptions
): void {
  const { image, fit, imageBounds } = options;

  const rawWidth = (imageBounds.maxX - imageBounds.minX) * fit.scale;
  const rawHeight = (imageBounds.maxY - imageBounds.minY) * fit.scale;
  const rawX = imageBounds.minX * fit.scale + fit.offsetX;
  const rawY = imageBounds.minY * fit.scale + fit.offsetY;

  const x = snap(rawX);
  const y = snap(rawY);
  const width = snap(rawWidth);
  const height = snap(rawHeight);

  // tiny bleed helps hide anti-aliased edge gaps
  const bleed = 1;

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    image,
    x - bleed,
    y - bleed,
    width + bleed * 2,
    height + bleed * 2
  );
  ctx.restore();
}