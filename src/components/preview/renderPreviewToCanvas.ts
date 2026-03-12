import type { PreviewResponse } from "../../types/preview";
import {
  clearCanvas,
  getCanvasDisplaySize,
  resizeCanvasToDisplaySize,
} from "../../utils/canvas";
import { drawDimensions } from "./drawDimensions";
import { drawGrid } from "./drawGrid";
import { drawShapeVector } from "./drawShapeVector";
import { fitToViewport, type FitPadding } from "./fitToViewport";

interface RenderPreviewToCanvasOptions {
  canvas: HTMLCanvasElement;
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

  drawShapeVector({
    ctx,
    preview,
    fit,
  });

  if (showDimensions) {
    drawDimensions({
      ctx,
      dimensions: preview.dimensions,
      fit,
    });
  }

  ctx.restore();
}