import { Phone } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface PhoneCTAProps extends Omit<ButtonProps, "asChild" | "children"> {
  label?: string;
  hideNumberOnSmall?: boolean;
}

export function PhoneCTA({
  label = "立即撥打",
  className,
  variant = "primary",
  size = "default",
  hideNumberOnSmall = false,
  ...props
}: PhoneCTAProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn("tabular-nums", className)}
      {...props}
    >
      <a href={`tel:${site.phone}`} aria-label={`撥打 ${site.phoneDisplay}`}>
        <Phone className="size-5" aria-hidden />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-xs font-medium opacity-80">{label}</span>
          <span
            className={cn(
              "font-black",
              hideNumberOnSmall && "hidden sm:inline",
            )}
          >
            {site.phoneDisplay}
          </span>
        </span>
      </a>
    </Button>
  );
}
