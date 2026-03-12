import { create } from "zustand";

interface UiStore {
  zoom: number;
  panX: number;
  panY: number;
  showGrid: boolean;
  showDimensions: boolean;
  snapEnabled: boolean;
  snapSize: number;

  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  setPan: (x: number, y: number) => void;
  panBy: (dx: number, dy: number) => void;

  setShowGrid: (value: boolean) => void;
  setShowDimensions: (value: boolean) => void;
  setSnapEnabled: (value: boolean) => void;
  setSnapSize: (value: number) => void;
}

const clampZoom = (value: number) => Math.min(4, Math.max(0.2, value));

export const useUiStore = create<UiStore>((set) => ({
  zoom: 1,
  panX: 0,
  panY: 0,
  showGrid: true,
  showDimensions: true,
  snapEnabled: false,
  snapSize: 10,

  setZoom: (zoom) => set({ zoom: clampZoom(zoom) }),

  zoomIn: () =>
    set((state) => ({
      zoom: clampZoom(Number((state.zoom + 0.1).toFixed(2))),
    })),

  zoomOut: () =>
    set((state) => ({
      zoom: clampZoom(Number((state.zoom - 0.1).toFixed(2))),
    })),

  resetView: () =>
    set({
      zoom: 1,
      panX: 0,
      panY: 0,
    }),

  setPan: (x, y) => set({ panX: x, panY: y }),

  panBy: (dx, dy) =>
    set((state) => ({
      panX: state.panX + dx,
      panY: state.panY + dy,
    })),

  setShowGrid: (value) => set({ showGrid: value }),
  setShowDimensions: (value) => set({ showDimensions: value }),
  setSnapEnabled: (value) => set({ snapEnabled: value }),
  setSnapSize: (value) => set({ snapSize: Math.max(1, value) }),
}));