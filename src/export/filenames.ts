import type { ShapeConfig } from "../types/shape";
import type { ExportType } from "../types/export";

export function buildExportFilename(
  config: ShapeConfig,
  exportType: ExportType
): string {
  const shape = config.type;

  const suffix =
    exportType === "png"
      ? "preview"
      : exportType === "detailed-png"
      ? "detailed-preview"
      : exportType === "dxf"
      ? "outline"
      : "detailed-outline";

  return `${shape}-${suffix}.png`;
}