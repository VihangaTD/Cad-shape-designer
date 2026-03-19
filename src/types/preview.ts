import type { Bounds, Point } from "./geometry";
import type { DimensionData } from "./dimension";

export interface CircleGeometry {
  center: Point;
  radius: number;
}

export interface CornerLabel {
  id: string;
  point: Point;
}

export interface ShapeGeometry {
  shapeType: string;
  points: Point[];
  circle: CircleGeometry | null;
  holes: CircleGeometry[];
  cornerLabels: CornerLabel[];
}

export interface PreviewResponse {
  svg: string;
  viewBox: string;
  bounds: Bounds;
  dimensions: DimensionData[];
  geometry: ShapeGeometry;
}