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
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        step={step}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange(Number.isNaN(next) ? min : next);
        }}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-400"
      />
    </div>
  );
}