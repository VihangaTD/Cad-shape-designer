import { Minus, Plus } from "lucide-react";

interface ParameterInputProps {
  label: string;
  value: number;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
}

export default function ParameterInput({
  label,
  value,
  min = 0,
  step = 1,
  onChange,
}: ParameterInputProps) {
  const decrease = () => onChange(Math.max(min, value - step));
  const increase = () => onChange(value + step);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <label className="mb-2 block text-xs font-medium text-slate-600">
        {label}
      </label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrease}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
        >
          <Minus size={16} />
        </button>

        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(event) => {
            const next = Number(event.target.value);
            onChange(Number.isNaN(next) ? min : Math.max(min, next));
          }}
          className="h-10 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
        />

        <button
          type="button"
          onClick={increase}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}