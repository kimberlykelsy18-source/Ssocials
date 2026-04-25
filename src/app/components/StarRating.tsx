import { Star } from "lucide-react";

// Renders a static row of filled/empty stars. Used in reviews and admin.
export function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{ width: size, height: size }}
          className={s <= rating ? "fill-current" : "opacity-15 fill-current"}
        />
      ))}
    </div>
  );
}
