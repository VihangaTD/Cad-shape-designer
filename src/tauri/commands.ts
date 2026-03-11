import { invoke } from "@tauri-apps/api/core";
import type { ShapeConfig } from "../types/shape";
import type { PreviewResponse } from "../types/preview";

export async function generatePreview(
  shapeConfig: ShapeConfig
): Promise<PreviewResponse> {
  return invoke<PreviewResponse>("generate_preview", {
    shapeConfig,
  });
}