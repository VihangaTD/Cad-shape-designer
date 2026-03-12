import { useState, type RefObject } from "react";
import {
  FileCode2,
  FileImage,
  FileOutput,
  Layers3,
  Loader2,
} from "lucide-react";
import { useShapeStore } from "../../store/shapeStore";
import { usePreviewStore } from "../../store/previewStore";
import { canvasToPngBytes } from "../../export/png";
import { saveDxfFile, savePngFile } from "../../tauri/commands";
import { svgToImage } from "../../utils/svgToImage";
import { renderPreviewToCanvas } from "../preview/renderPreviewToCanvas";
import { buildExportFilename } from "../../export/filenames";

interface ExportPanelProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

const actions = [
  { label: "Export PNG", icon: FileImage, type: "png" as const },
  {
    label: "Export Detailed PNG",
    icon: Layers3,
    type: "detailed-png" as const,
  },
  { label: "Export DXF", icon: FileCode2, type: "dxf" as const },
  {
    label: "Export Detailed DXF",
    icon: FileOutput,
    type: "detailed-dxf" as const,
  },
];

export default function ExportPanel({ canvasRef }: ExportPanelProps) {
  const config = useShapeStore((state) => state.config);
  const preview = usePreviewStore((state) => state.preview);

  const [busyType, setBusyType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const exportPng = async (
    showDimensions: boolean,
    type: "png" | "detailed-png"
  ) => {
    if (!preview) {
      throw new Error("Preview data is not ready.");
    }

    const image = await svgToImage(preview.svg);

    const exportCanvas = document.createElement("canvas");

    const exportWidth = 1600;
    const exportHeight = 1200;

    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    exportCanvas.style.width = `${exportWidth}px`;
    exportCanvas.style.height = `${exportHeight}px`;

    renderPreviewToCanvas({
      canvas: exportCanvas,
      image,
      preview,
      showDimensions,
      showGrid: false,
      padding: showDimensions
        ? { top: 80, right: 140, bottom: 140, left: 80 }
        : 20,
      backgroundColor: "#ffffff",
    });

    const bytes = await canvasToPngBytes(exportCanvas);
    const fileName = buildExportFilename(config, type);
    const savedPath = await savePngFile(fileName, bytes);

    setMessage(`PNG saved successfully: ${savedPath}`);
  };

  const exportDxf = async (detailed: boolean, type: "dxf" | "detailed-dxf") => {
    const fileName = buildExportFilename(config, type);
    const savedPath = await saveDxfFile(fileName, config, detailed);
    setMessage(`DXF saved successfully: ${savedPath}`);
  };

  const handleExport = async (type: (typeof actions)[number]["type"]) => {
    setMessage(null);
    setError(null);

    try {
      setBusyType(type);

      if (type === "png") {
        await exportPng(false, "png");
        return;
      }

      if (type === "detailed-png") {
        await exportPng(true, "detailed-png");
        return;
      }

      if (type === "dxf") {
        await exportDxf(false, "dxf");
        return;
      }

      if (type === "detailed-dxf") {
        await exportDxf(true, "detailed-dxf");
      }
    } catch (exportError) {
      const nextMessage =
        exportError instanceof Error
          ? exportError.message
          : "Failed to export file.";

      setError(nextMessage);
    } finally {
      setBusyType(null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-3">
          {actions.map(({ label, icon: Icon, type }) => {
            const isBusy = busyType === type;

            return (
              <button
                key={label}
                type="button"
                disabled={busyType !== null}
                onClick={() => handleExport(type)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isBusy ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Icon size={16} />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {message ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>
    </section>
  );
}