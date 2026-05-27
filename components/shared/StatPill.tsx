import { cn } from "@/lib/utils";

interface StatPillProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatPill({ value, label, icon, className }: StatPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full bg-white/95 backdrop-blur px-5 py-3 shadow-sm border border-sand-200",
        className,
      )}
    >
      {icon ? (
        <span className="shrink-0 text-taxi-yellow-dark" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="text-xl font-black text-ink-900 tabular-nums">
        {value}
      </span>
      <span className="text-sm text-ink-700">{label}</span>
    </div>
  );
}
