import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";

const TrustBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const years = useCountUp(20, 2000, visible);
  const projects = useCountUp(500, 2000, visible);

  return (
    <section className="bg-stone border-y border-border">
      <div
        ref={ref}
        className="container grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border"
      >
        <div className="py-10 md:py-12 text-center">
          <div className="font-display text-4xl md:text-5xl text-foreground tabular-nums">
            {years}+
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Years Experience
          </div>
        </div>
        <div className="py-10 md:py-12 text-center">
          <div className="font-display text-4xl md:text-5xl text-foreground tabular-nums">
            {projects}+
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Projects Completed
          </div>
        </div>
        <div
          className={`py-10 md:py-12 text-center transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="font-display text-4xl md:text-5xl text-foreground">5★</div>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            5-Star Rated
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
