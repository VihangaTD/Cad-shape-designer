import type { DimensionData } from "../../types/dimension";
import type { FitResult } from "./fitToViewport";
import { worldToCanvas } from "./worldToCanvas";

interface DrawDimensionsOptions {
  ctx: CanvasRenderingContext2D;
  dimensions: DimensionData[];
  fit: FitResult;
}

export function drawDimensions({
  ctx,
  dimensions,
  fit,
}: DrawDimensionsOptions): void {
  ctx.save();

  ctx.strokeStyle = "#334155";
  ctx.fillStyle = "#0f172a";
  ctx.lineWidth = 1.5;
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

    drawLine(ctx, ext1Start.x, ext1Start.y, ext1End.x, ext1End.y);
    drawLine(ctx, ext2Start.x, ext2Start.y, ext2End.x, ext2End.y);
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

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  refX: number,
  refY: number
) {
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