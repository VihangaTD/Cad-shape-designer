import type { Point } from "./geometry";

export interface DimensionData {
  key: string;
  label: string;
  lineStart: Point;
  lineEnd: Point;
  ext1Start: Point;
  ext1End: Point;
  ext2Start: Point;
  ext2End: Point;
  textPosition: Point;
}