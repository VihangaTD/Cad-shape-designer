import type { ReactNode } from "react";
import clsx from "clsx";

interface PanelProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Panel({
  title,
  description,
  children,
  className,
}: PanelProps) {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        ) : null}
      </div>

      <div className="p-4">{children}</div>
    </section>
  );
}