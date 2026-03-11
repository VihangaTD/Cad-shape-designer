import { FileCode2, FileImage, FileOutput, Layers3 } from "lucide-react";

const actions = [
  { label: "Export PNG", icon: FileImage },
  { label: "Export Detailed PNG", icon: Layers3 },
  { label: "Export DXF", icon: FileCode2 },
  { label: "Export Detailed DXF", icon: FileOutput },
];

export default function ExportPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap gap-3 p-4">
        {actions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}