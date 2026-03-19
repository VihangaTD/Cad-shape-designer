import { create } from "zustand";
import { shapeMetaRegistry } from "../shape-meta";
import type {
  CircleCutConfig,
  Rotation,
  ShapeConfig,
  ShapeType,
} from "../types/shape";

interface ShapeStore {
  config: ShapeConfig;
  selectShape: (shapeType: ShapeType) => void;
  setParameter: (key: string, value: number) => void;
  setRotation: (rotation: Rotation) => void;
  toggleFlipX: () => void;
  toggleFlipY: () => void;
  setCircleCut: (circleCut: CircleCutConfig) => void;
  updateCircleCut: (patch: Partial<CircleCutConfig>) => void;
  resetCurrentShape: () => void;
}

const defaultType: ShapeType = "rectangle";

const defaultCircleCut: CircleCutConfig = {
  enabled: false,
  cornerId: "c1",
  offsetX: 100,
  offsetY: -100,
  radius: 50,
};

export const useShapeStore = create<ShapeStore>((set, get) => ({
  config: {
    type: defaultType,
    parameters: { ...shapeMetaRegistry[defaultType].defaultParameters },
    rotation: 0,
    flipX: false,
    flipY: false,
    circleCut: { ...defaultCircleCut },
  },

  selectShape: (shapeType) => {
    const meta = shapeMetaRegistry[shapeType];

    set({
      config: {
        type: shapeType,
        parameters: { ...meta.defaultParameters },
        rotation: 0,
        flipX: false,
        flipY: false,
        circleCut: { ...defaultCircleCut },
      },
    });
  },

  setParameter: (key, value) => {
    set((state) => ({
      config: {
        ...state.config,
        parameters: {
          ...state.config.parameters,
          [key]: value,
        },
      },
    }));
  },

  setRotation: (rotation) => {
    set((state) => ({
      config: {
        ...state.config,
        rotation,
      },
    }));
  },

  toggleFlipX: () => {
    const { config } = get();
    set({
      config: {
        ...config,
        flipX: !config.flipX,
      },
    });
  },

  toggleFlipY: () => {
    const { config } = get();
    set({
      config: {
        ...config,
        flipY: !config.flipY,
      },
    });
  },

  setCircleCut: (circleCut) => {
    set((state) => ({
      config: {
        ...state.config,
        circleCut,
      },
    }));
  },

  updateCircleCut: (patch) => {
    set((state) => ({
      config: {
        ...state.config,
        circleCut: {
          enabled: state.config.circleCut?.enabled ?? false,
          cornerId: state.config.circleCut?.cornerId ?? "c1",
          offsetX: state.config.circleCut?.offsetX ?? 100,
          offsetY: state.config.circleCut?.offsetY ?? -100,
          radius: state.config.circleCut?.radius ?? 50,
          ...patch,
        },
      },
    }));
  },

  resetCurrentShape: () => {
    const { config } = get();
    const meta = shapeMetaRegistry[config.type];

    set({
      config: {
        type: config.type,
        parameters: { ...meta.defaultParameters },
        rotation: 0,
        flipX: false,
        flipY: false,
        circleCut: { ...defaultCircleCut },
      },
    });
  },
}));