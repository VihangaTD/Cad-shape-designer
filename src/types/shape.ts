export type ShapeType =
  | "rectangle"
  | "circle"
  | "triangle"
  | "lshape"
  | "trapezoid";

export type Rotation = 0 | 90 | 180 | 270;

export interface ShapeConfig {
  type: ShapeType;
  parameters: Record<string, number>;
  rotation: Rotation;
  flipX: boolean;
  flipY: boolean;
}

export interface ShapeParameterMeta {
  key: string;
  label: string;
  min?: number;
  step?: number;
}

export interface ShapeMeta {
  type: ShapeType;
  label: string;
  parameterMeta: ShapeParameterMeta[];
  defaultParameters: Record<string, number>;
}