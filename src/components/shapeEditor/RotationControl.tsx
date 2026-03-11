import { RotateCw } from "lucide-react";
import type { Rotation } from "../../types/shape";

interface RotationControlProps {
  value: Rotation;
  onChange: (rotation: Rotation) => void;
}

const options: Rotation[] = [0, 90, 180, 270];

export default function RotationControl({
  value,
  onChange,
}: RotationControlProps) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <RotateCw size={14} />
        <span>Rotation</span>
      </label>

      <select
        value={value}
        onChange={(event) => onChange(Number(event.target.value) as Rotation)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}°
          </option>
        ))}
      </select>
    </div>
  );
}