export async function canvasToPngBytes(
  canvas: HTMLCanvasElement
): Promise<Uint8Array> {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((result) => resolve(result), "image/png")
  );

  if (!blob) {
    throw new Error("Failed to create PNG blob from canvas.");
  }

  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
}