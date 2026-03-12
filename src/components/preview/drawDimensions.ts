import type { DimensionData } from "../../types/dimension";
import type { FitResult } from "./fitToViewport";
import { worldToCanvas } from "./worldToCanvas";

interface DrawDimensionsOptions {
  ctx: CanvasRenderingContext2D;
  dimensions: DimensionData[];
  fit: FitResult;
}

export function drawDimensionExtensions({
  ctx,
  dimensions,
  fit,
}: DrawDimensionsOptions): void {
  ctx.save();

  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (const dimension of dimensions) {
    const ext1Start = worldToCanvas(dimension.ext1Start, fit);
    const ext1End = worldToCanvas(dimension.ext1End, fit);
    const ext2Start = worldToCanvas(dimension.ext2Start, fit);
    const ext2End = worldToCanvas(dimension.ext2End, fit);

    drawExtensionLine(ctx, ext1Start, ext1End, 6, 3);
    drawExtensionLine(ctx, ext2Start, ext2End, 6, 3);
  }

  ctx.restore();
}

export function drawDimensionBodies({
  ctx,
  dimensions,
  fit,
}: DrawDimensionsOptions): void {
  ctx.save();

  ctx.strokeStyle = "#334155";
  ctx.fillStyle = "#0f172a";
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.font = "12px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const dimension of dimensions) {
    const lineStart = worldToCanvas(dimension.lineStart, fit);
    const lineEnd = worldToCanvas(dimension.lineEnd, fit);
    const ext1Start = worldToCanvas(dimension.ext1Start, fit);
    const ext1End = worldToCanvas(dimension.ext1End, fit);
    const ext2Start = worldToCanvas(dimension.ext2Start, fit);
    const ext2End = worldToCanvas(dimension.ext2End, fit);
    const textPosition = worldToCanvas(dimension.textPosition, fit);

    // tiny bridge strokes drawn on top of the image edge
    drawAnchorBridge(ctx, ext1Start, ext1End, 3);
    drawAnchorBridge(ctx, ext2Start, ext2End, 3);

    drawLine(ctx, lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);

    drawArrow(ctx, lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
    drawArrow(ctx, lineEnd.x, lineEnd.y, lineStart.x, lineStart.y);

    const metrics = ctx.measureText(dimension.label);
    const boxWidth = metrics.width + 16;
    const boxHeight = 24;

    ctx.fillStyle = "rgba(255,255,255,0.96)";
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(
      textPosition.x - boxWidth / 2,
      textPosition.y - boxHeight / 2,
      boxWidth,
      boxHeight,
      8
    );
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.font = "600 12px Inter, sans-serif";
    ctx.fillText(dimension.label, textPosition.x, textPosition.y);

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1.5;
  }

  ctx.restore();
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawExtensionLine(
  ctx: CanvasRenderingContext2D,
  start: { x: number; y: number },
  end: { x: number; y: number },
  inwardPx = 6,
  outwardPx = 3
): void {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;

  const ux = dx / length;
  const uy = dy / length;

  const x1 = start.x - ux * inwardPx;
  const y1 = start.y - uy * inwardPx;
  const x2 = end.x + ux * outwardPx;
  const y2 = end.y + uy * outwardPx;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawAnchorBridge(
  ctx: CanvasRenderingContext2D,
  anchor: { x: number; y: number },
  toward: { x: number; y: number },
  lengthPx = 3
): void {
  const dx = toward.x - anchor.x;
  const dy = toward.y - anchor.y;
  const length = Math.hypot(dx, dy) || 1;

  const ux = dx / length;
  const uy = dy / length;

  ctx.beginPath();
  ctx.moveTo(anchor.x, anchor.y);
  ctx.lineTo(anchor.x + ux * lengthPx, anchor.y + uy * lengthPx);
  ctx.stroke();
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  refX: number,
  refY: number
): void {
  const dx = refX - x;
  const dy = refY - y;
  const length = Math.hypot(dx, dy) || 1;

  const ux = dx / length;
  const uy = dy / length;

  const px = -uy;
  const py = ux;

  const arrowLength = 10;
  const arrowWidth = 4;

  const baseX = x + ux * arrowLength;
  const baseY = y + uy * arrowLength;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(baseX + px * arrowWidth, baseY + py * arrowWidth);
  ctx.moveTo(x, y);
  ctx.lineTo(baseX - px * arrowWidth, baseY - py * arrowWidth);
  ctx.stroke();
}