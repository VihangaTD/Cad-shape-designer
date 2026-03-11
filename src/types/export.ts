export type ExportType =
  | "png"
  | "detailed-png"
  | "dxf"
  | "detailed-dxf";

export interface SavePngPayload {
  fileName: string;
  bytes: number[];
}