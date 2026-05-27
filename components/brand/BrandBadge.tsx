import { cn } from "@/lib/utils";

interface BrandBadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "blue" | "ink";
  className?: string;
}

export function BrandBadge({
  children,
  variant = "yellow",
  className,
}: BrandBadgeProps) {
  const variants = {
    yellow: "bg-taxi-yellow text-taxi-yellow-ink",
    blue: "bg-trust-blue/10 text-trust-blue-dark",
    ink: "bg-ink-900/10 text-ink-900",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
