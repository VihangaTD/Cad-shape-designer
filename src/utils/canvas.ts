export interface CanvasSize {
  width: number;
  height: number;
}

export function resizeCanvasToDisplaySize(
  canvas: HTMLCanvasElement,
  devicePixelRatio = window.devicePixelRatio || 1
): boolean {
  const displayWidth = Math.max(
    1,
    Math.floor(canvas.clientWidth * devicePixelRatio)
  );
  const displayHeight = Math.max(
    1,
    Math.floor(canvas.clientHeight * devicePixelRatio)
  );

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    return true;
  }

  return false;
}

export function getCanvasDisplaySize(
  canvas: HTMLCanvasElement,
  devicePixelRatio = window.devicePixelRatio || 1
): CanvasSize {
  return {
    width: canvas.width / devicePixelRatio,
    height: canvas.height / devicePixelRatio,
  };
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  backgroundColor = "#ffffff"
): void {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}