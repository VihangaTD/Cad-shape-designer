import {
  useEffect,
  useMemo,
  useRef,
  type PointerEvent,
  type RefObject,
} from "react";
import type { PreviewResponse } from "../../types/preview";
import { renderPreviewToCanvas } from "./renderPreviewToCanvas";
import { useUiStore } from "../../store/uiStore";

interface ShapePreviewCanvasProps {
  preview: PreviewResponse;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export default function ShapePreviewCanvas({
  preview,
  canvasRef,
}: ShapePreviewCanvasProps) {
  const zoom = useUiStore((state) => state.zoom);
  const panX = useUiStore((state) => state.panX);
  const panY = useUiStore((state) => state.panY);
  const panBy = useUiStore((state) => state.panBy);
  const showGrid = useUiStore((state) => state.showGrid);
  const showDimensions = useUiStore((state) => state.showDimensions);

  const draggingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const redrawKey = useMemo(
    () =>
      JSON.stringify({
        bounds: preview.bounds,
        geometry: preview.geometry,
        dimensions: preview.dimensions,
        zoom,
        panX,
        panY,
        showGrid,
        showDimensions,
      }),
    [preview, zoom, panX, panY, showGrid, showDimensions]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const render = () => {
      renderPreviewToCanvas({
        canvas,
        preview,
        showDimensions,
        showGrid,
        padding: 60,
        backgroundColor: "#ffffff",
        zoom,
        panX,
        panY,
      });
    };

    render();

    const resizeObserver = new ResizeObserver(() => {
      render();
    });

    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    canvasRef,
    preview,
    redrawKey,
    showGrid,
    showDimensions,
    zoom,
    panX,
    panY,
  ]);

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = true;
    lastPointRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current || !lastPointRef.current) return;

    const dx = event.clientX - lastPointRef.current.x;
    const dy = event.clientY - lastPointRef.current.y;

    panBy(dx, dy);
    lastPointRef.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = false;
    lastPointRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-xl border border-slate-200 bg-white">
      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      />
    </div>
  );
}