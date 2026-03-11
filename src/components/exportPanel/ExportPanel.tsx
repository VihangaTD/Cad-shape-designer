import { useState, type RefObject } from "react";
import {
  FileCode2,
  FileImage,
  FileOutput,
  Layers3,
  Loader2,
} from "lucide-react";
import { useShapeStore } from "../../store/shapeStore";
import { canvasToPngBytes } from "../../export/png";
import { buildExportFilename } from "../../export/filenames";
import { savePngFile } from "../../tauri/commands";

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

  const [busyType, setBusyType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (type: (typeof actions)[number]["type"]) => {
    setMessage(null);
    setError(null);

    if (type === "dxf" || type === "detailed-dxf") {
      setError("DXF export will be implemented in the next phase.");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      setError("Preview canvas is not ready.");
      return;
    }

    try {
      setBusyType(type);

      const bytes = await canvasToPngBytes(canvas);
      const fileName = buildExportFilename(config, type);
      const savedPath = await savePngFile(fileName, bytes);

      setMessage(`PNG saved successfully: ${savedPath}`);
    } catch (exportError) {
      const message =
        exportError instanceof Error
          ? exportError.message
          : "Failed to export PNG.";

      setError(message);
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