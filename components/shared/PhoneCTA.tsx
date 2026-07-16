import { Phone } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface PhoneCTAProps extends Omit<ButtonProps, "asChild" | "children"> {
  label?: string;
  /** Tailwind classes控制電話號碼的顯示時機，例如 "hidden xl:inline"。預設一律顯示。 */
  numberClassName?: string;
}

export function PhoneCTA({
  label = "立即撥打",
  className,
  variant = "primary",
  size = "default",
  numberClassName,
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
      <a href={`tel:${site.phoneDial}`} aria-label={`撥打 ${site.phoneDisplay}`}>
        <Phone className="size-5" aria-hidden />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-xs font-medium opacity-80">{label}</span>
          <span className={cn("font-black", numberClassName)}>
            {site.phoneDisplay}
          </span>
        </span>
      </a>
    </Button>
  );
}
