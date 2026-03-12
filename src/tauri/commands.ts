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

export async function savePngFile(
  fileName: string,
  bytes: Uint8Array
): Promise<string> {
  return invoke<string>("save_png_file", {
    request: {
      fileName,
      bytes: Array.from(bytes),
    },
  });
}

export async function saveDxfFile(
  fileName: string,
  shapeConfig: ShapeConfig,
  detailed: boolean
): Promise<string> {
  return invoke<string>("save_dxf_file", {
    request: {
      fileName,
      shapeConfig,
      detailed,
    },
  });
}