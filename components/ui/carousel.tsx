"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  autoplayIntervalMs?: number;
  pauseOnHover?: boolean;
};

const CarouselContext = React.createContext<UseEmblaCarouselType | null>(null);

export function useCarouselApi() {
  const embla = React.useContext(CarouselContext);
  if (!embla) throw new Error("Carousel context not found");
  return embla[1];
}

function Carousel({ className, opts, children, autoplayIntervalMs = 4000, pauseOnHover = true, ...props }: CarouselProps) {
  const embla = useEmblaCarousel({ loop: true, align: "start", ...opts });
  const [ref, api] = embla;
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => {
      if (!pauseOnHover || !isHovered) api.scrollNext();
    }, autoplayIntervalMs);
    return () => window.clearInterval(id);
  }, [api, autoplayIntervalMs, pauseOnHover, isHovered]);

  return (
    <CarouselContext.Provider value={embla}>
      <div
        className={cn("relative", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div className="overflow-hidden" ref={ref}>
          <div className="flex -ml-4">{children}</div>
        </div>
        <CarouselPrevious onClick={() => api?.scrollPrev()} />
        <CarouselNext onClick={() => api?.scrollNext()} />
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)} {...props} />;
}

function CarouselPrevious({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background shadow",
        className
      )}
      {...props}
      aria-label="Précédent"
    >
      <ChevronLeft className="h-4 w-4" />
    </button>
  );
}

function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background shadow",
        className
      )}
      {...props}
      aria-label="Suivant"
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  );
}

export { Carousel, CarouselItem };

function useCarouselState(api: ReturnType<typeof useCarouselApi>) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return { selectedIndex, snapCount };
}

export function CarouselDots({ className }: { className?: string }) {
  const api = useCarouselApi();
  const { selectedIndex, snapCount } = useCarouselState(api);
  if (!snapCount) return null;
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-2", className)}>
      {Array.from({ length: snapCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => api?.scrollTo(i)}
          disabled={!api}
          className={cn(
            "h-2 w-2 rounded-full border",
            i === selectedIndex ? "bg-zinc-900 border-zinc-900/80" : "bg-white/70 border-white/80",
            !api && "opacity-50"
          )}
          aria-label={`Aller à la diapositive ${i + 1}`}
          style={{ pointerEvents: "auto" }}
        />
      ))}
    </div>
  );
}


