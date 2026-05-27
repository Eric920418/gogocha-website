"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center py-3",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-sand-200">
      <SliderPrimitive.Range className="absolute h-full bg-taxi-yellow-dark" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-7 w-7 rounded-full border-4 border-taxi-yellow-dark bg-white shadow-md transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-trust-blue/30"
      aria-label="拖動調整"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
