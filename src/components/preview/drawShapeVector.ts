import type { PreviewResponse } from "../../types/preview";
import type { FitResult } from "./fitToViewport";
import { worldToCanvas } from "./worldToCanvas";

interface DrawShapeVectorOptions {
  ctx: CanvasRenderingContext2D;
  preview: PreviewResponse;
  fit: FitResult;
}

export function drawShapeVector({
  ctx,
  preview,
  fit,
}: DrawShapeVectorOptions): void {
  const geometry = preview.geometry;

  ctx.save();
  ctx.strokeStyle = "#334155";
  ctx.fillStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  if (geometry.circle) {
    const center = worldToCanvas(geometry.circle.center, fit);
    const radius = geometry.circle.radius * fit.scale;

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    return;
  }

  if (geometry.points.length > 0) {
    const first = worldToCanvas(geometry.points[0], fit);

    ctx.beginPath();
    ctx.moveTo(first.x, first.y);

    for (let index = 1; index < geometry.points.length; index++) {
      const point = worldToCanvas(geometry.points[index], fit);
      ctx.lineTo(point.x, point.y);
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}