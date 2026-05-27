import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  className?: string;
}

export function Testimonial({
  name,
  role,
  content,
  rating,
  className,
}: TestimonialProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="pt-6 md:pt-8 flex flex-col h-full gap-4">
        <div className="flex gap-0.5" aria-label={`${rating} 星評價`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-5",
                i < rating
                  ? "fill-taxi-yellow-dark text-taxi-yellow-dark"
                  : "fill-sand-200 text-sand-200",
              )}
              aria-hidden
            />
          ))}
        </div>
        <p className="text-base leading-relaxed text-ink-700 flex-1">
          「{content}」
        </p>
        <div className="border-t border-sand-200 pt-4">
          <p className="font-bold text-ink-900">{name}</p>
          <p className="text-sm text-ink-500">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
