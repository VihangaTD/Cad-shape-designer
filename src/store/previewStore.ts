import { create } from "zustand";
import type { PreviewResponse } from "../types/preview";

interface PreviewStore {
  preview: PreviewResponse | null;
  isLoading: boolean;
  error: string | null;
  setPreview: (preview: PreviewResponse | null) => void;
  setLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
  reset: () => void;
}

export const usePreviewStore = create<PreviewStore>((set) => ({
  preview: null,
  isLoading: false,
  error: null,

  setPreview: (preview) => set({ preview }),
  setLoading: (value) => set({ isLoading: value }),
  setError: (message) => set({ error: message }),

  reset: () =>
    set({
      preview: null,
      isLoading: false,
      error: null,
    }),
}));