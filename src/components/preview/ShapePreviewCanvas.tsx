import { useEffect, useMemo, useState, type RefObject } from "react";
import type { PreviewResponse } from "../../types/preview";
import { svgToImage } from "../../utils/svgToImage";
import {
  clearCanvas,
  getCanvasDisplaySize,
  resizeCanvasToDisplaySize,
} from "../../utils/canvas";
import { fitToViewport } from "./fitToViewport";
import { drawGrid } from "./drawGrid";
import { drawShapeImage } from "./drawShapeImage";
import { drawDimensions } from "./drawDimensions";

interface ShapePreviewCanvasProps {
  preview: PreviewResponse;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function ShapePreviewCanvas({
  preview,
  canvasRef,
}: ShapePreviewCanvasProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const redrawKey = useMemo(
    () =>
      JSON.stringify({
        svg: preview.svg,
        bounds: preview.bounds,
        dimensions: preview.dimensions,
      }),
    [preview]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadImage() {
      try {
        setImageError(null);
        const loadedImage = await svgToImage(preview.svg);

        if (!cancelled) {
          setImage(loadedImage);
        }
      } catch (error) {
        if (!cancelled) {
          setImage(null);
          setImageError(
            error instanceof Error
              ? error.message
              : "Failed to create preview image."
          );
        }
      }
    }

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [preview.svg]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const render = () => {
      resizeCanvasToDisplaySize(canvas);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const displaySize = getCanvasDisplaySize(canvas, dpr);

      clearCanvas(ctx, canvas, "#ffffff");

      ctx.save();
      ctx.scale(dpr, dpr);

      drawGrid(ctx, displaySize.width, displaySize.height, 28);

      const fit = fitToViewport(
        preview.bounds,
        displaySize.width,
        displaySize.height,
        60
      );

      drawShapeImage(ctx, {
        image,
        fit,
        imageBounds: preview.bounds,
      });

      drawDimensions({
        ctx,
        dimensions: preview.dimensions,
        fit,
      });

      ctx.restore();
    };

    render();

    const resizeObserver = new ResizeObserver(() => {
      render();
    });

    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [canvasRef, image, preview, redrawKey]);

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-xl border border-slate-200 bg-white">
      {imageError ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
          <p className="text-sm font-medium text-red-600">{imageError}</p>
        </div>
      ) : null}

      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}