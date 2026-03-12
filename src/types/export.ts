import type { ShapeConfig } from "./shape";

export type ExportType =
  | "png"
  | "detailed-png"
  | "dxf"
  | "detailed-dxf";

export interface SavePngPayload {
  fileName: string;
  bytes: number[];
}

export interface SaveDxfPayload {
  fileName: string;
  shapeConfig: ShapeConfig;
  detailed: boolean;
}