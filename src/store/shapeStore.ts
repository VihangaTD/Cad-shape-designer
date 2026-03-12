import { create } from "zustand";
import { shapeMetaRegistry } from "../shape-meta";
import type { Rotation, ShapeConfig, ShapeType } from "../types/shape";

interface ShapeStore {
  config: ShapeConfig;
  selectShape: (shapeType: ShapeType) => void;
  setParameter: (key: string, value: number) => void;
  setRotation: (rotation: Rotation) => void;
  toggleFlipX: () => void;
  toggleFlipY: () => void;
  resetCurrentShape: () => void;
}

const defaultType: ShapeType = "rectangle";

export const useShapeStore = create<ShapeStore>((set, get) => ({
  config: {
    type: defaultType,
    parameters: { ...shapeMetaRegistry[defaultType].defaultParameters },
    rotation: 0,
    flipX: false,
    flipY: false,
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
      },
    });
  },
}));