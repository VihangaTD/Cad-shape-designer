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
    drawCornerLabels(ctx, geometry.cornerLabels, fit);
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

    for (const hole of geometry.holes) {
      const center = worldToCanvas(hole.center, fit);
      const radius = hole.radius * fit.scale;
      ctx.moveTo(center.x + radius, center.y);
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, false);
      ctx.closePath();
    }

    ctx.fill("evenodd");
    ctx.stroke();

    for (const hole of geometry.holes) {
      const center = worldToCanvas(hole.center, fit);
      const radius = hole.radius * fit.scale;

      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  drawCornerLabels(ctx, geometry.cornerLabels, fit);
  ctx.restore();
}

function drawCornerLabels(
  ctx: CanvasRenderingContext2D,
  cornerLabels: PreviewResponse["geometry"]["cornerLabels"],
  fit: FitResult
): void {
  ctx.save();

  for (const corner of cornerLabels) {
    const p = worldToCanvas(corner.point, fit);
    const text = corner.id.toUpperCase();

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = "600 12px Inter, sans-serif";
    const textWidth = ctx.measureText(text).width;
    const boxWidth = textWidth + 12;
    const boxHeight = 22;
    const boxX = p.x + 8;
    const boxY = p.y - 28;

    ctx.fillStyle = "rgba(255,255,255,0.96)";
    ctx.strokeStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.textBaseline = "middle";
    ctx.fillText(text, boxX + 6, boxY + boxHeight / 2);
  }

  ctx.restore();
}