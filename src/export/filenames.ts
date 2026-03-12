import type { ShapeConfig } from "../types/shape";
import type { ExportType } from "../types/export";

export function buildExportFilename(
  config: ShapeConfig,
  exportType: ExportType
): string {
  const shape = config.type;

  if (exportType === "png") {
    return `${shape}-preview.png`;
  }

  if (exportType === "detailed-png") {
    return `${shape}-detailed-preview.png`;
  }

  if (exportType === "dxf") {
    return `${shape}-outline.dxf`;
  }

  return `${shape}-detailed-outline.dxf`;
}