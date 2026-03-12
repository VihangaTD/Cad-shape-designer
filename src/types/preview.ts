import type { Bounds, Point } from "./geometry";
import type { DimensionData } from "./dimension";

export interface CircleGeometry {
  center: Point;
  radius: number;
}

export interface ShapeGeometry {
  shapeType: string;
  points: Point[];
  circle: CircleGeometry | null;
}

export interface PreviewResponse {
  svg: string;
  viewBox: string;
  bounds: Bounds;
  dimensions: DimensionData[];
  geometry: ShapeGeometry;
}