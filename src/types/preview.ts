import type { Bounds } from "./geometry";
import type { DimensionData } from "./dimension";

export interface PreviewResponse {
  svg: string;
  viewBox: string;
  bounds: Bounds;
  dimensions: DimensionData[];
}