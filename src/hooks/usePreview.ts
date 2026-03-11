import { useEffect } from "react";
import { useShapeStore } from "../store/shapeStore";
import { usePreviewStore } from "../store/previewStore";
import { generatePreview } from "../tauri/commands";
import { mapPreviewResponse } from "../tauri/mappers";

export function usePreview() {
  const config = useShapeStore((state) => state.config);

  const setPreview = usePreviewStore((state) => state.setPreview);
  const setLoading = usePreviewStore((state) => state.setLoading);
  const setError = usePreviewStore((state) => state.setError);

  useEffect(() => {
    let isCancelled = false;

    async function loadPreview() {
      try {
        setLoading(true);
        setError(null);

        const response = await generatePreview(config);

        if (isCancelled) return;

        setPreview(mapPreviewResponse(response));
      } catch (error) {
        if (isCancelled) return;

        const message =
          error instanceof Error ? error.message : "Failed to generate preview";

        setError(message);
        setPreview(null);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadPreview();

    return () => {
      isCancelled = true;
    };
  }, [config, setError, setLoading, setPreview]);
}