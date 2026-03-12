import type { PreviewResponse } from "../../types/preview";
import {
  clearCanvas,
  getCanvasDisplaySize,
  resizeCanvasToDisplaySize,
} from "../../utils/canvas";
import {
  drawDimensionBodies,
  drawDimensionExtensions,
} from "./drawDimensions";
import { drawGrid } from "./drawGrid";
import { drawShapeImage } from "./drawShapeImage";
import { fitToViewport, type FitPadding } from "./fitToViewport";

interface RenderPreviewToCanvasOptions {
  canvas: HTMLCanvasElement;
  image: CanvasImageSource;
  preview: PreviewResponse;
  showDimensions: boolean;
  showGrid?: boolean;
  padding?: number | FitPadding;
  backgroundColor?: string;
  zoom?: number;
  panX?: number;
  panY?: number;
}

export function renderPreviewToCanvas({
  canvas,
  image,
  preview,
  showDimensions,
  showGrid = true,
  padding = 40,
  backgroundColor = "#ffffff",
  zoom = 1,
  panX = 0,
  panY = 0,
}: RenderPreviewToCanvasOptions): void {
  const isOffscreenCanvas =
    canvas.clientWidth === 0 || canvas.clientHeight === 0;

  if (!isOffscreenCanvas) {
    resizeCanvasToDisplaySize(canvas);
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = isOffscreenCanvas ? 1 : window.devicePixelRatio || 1;

  const displaySize = isOffscreenCanvas
    ? {
        width: canvas.width,
        height: canvas.height,
      }
    : getCanvasDisplaySize(canvas, dpr);

  clearCanvas(ctx, canvas, backgroundColor);

  ctx.save();
  ctx.scale(dpr, dpr);

  if (showGrid) {
    drawGrid(ctx, displaySize.width, displaySize.height, 28);
  }

  const fit = fitToViewport(
    preview.bounds,
    displaySize.width,
    displaySize.height,
    padding,
    zoom,
    panX,
    panY
  );

  if (showDimensions) {
    drawDimensionExtensions({
      ctx,
      dimensions: preview.dimensions,
      fit,
    });
  }

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  drawShapeImage(ctx, {
    image,
    fit,
    imageBounds: preview.bounds,
  });
  ctx.restore();

  if (showDimensions) {
    drawDimensionBodies({
      ctx,
      dimensions: preview.dimensions,
      fit,
    });
  }

  ctx.restore();
}