import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bleed?: boolean;
  tone?: "default" | "sand" | "dark" | "yellow";
}

export function Section({
  className,
  bleed = false,
  tone = "default",
  children,
  ...props
}: SectionProps) {
  const toneClass = {
    default: "bg-transparent",
    sand: "bg-sand-100",
    dark: "bg-ink-900 text-sand-50",
    yellow: "bg-taxi-yellow",
  }[tone];

  return (
    <section
      className={cn("py-16 md:py-24", toneClass, className)}
      {...props}
    >
      {bleed ? (
        children
      ) : (
        <div className="mx-auto max-w-6xl px-4 md:px-6">{children}</div>
      )}
    </section>
  );
}
