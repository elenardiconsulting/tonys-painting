import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedPhotoBorderProps {
  children: ReactNode;
  className?: string;
}

const AnimatedPhotoBorder = ({ children, className }: AnimatedPhotoBorderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const offset = 6; // px the border sits outside the photo
  const stroke = 2.5;
  const radius = 6;

  const w = size.w + offset * 2;
  const h = size.h + offset * 2;

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {/* Image layer */}
      <div className="relative w-full h-full overflow-hidden rounded-[4px]">
        {children}
      </div>

      {/* Animated border layer */}
      {w > 0 && h > 0 && (
        <svg
          className="pointer-events-none absolute"
          style={{
            top: -offset,
            left: -offset,
            width: w,
            height: h,
            zIndex: 2,
          }}
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          aria-hidden="true"
        >
          <motion.rect
            x={stroke / 2}
            y={stroke / 2}
            width={w - stroke}
            height={h - stroke}
            rx={radius}
            ry={radius}
            fill="none"
            stroke="#C4291C"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
            animate={
              prefersReducedMotion
                ? { pathLength: 1 }
                : inView
                ? { pathLength: 1 }
                : { pathLength: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }
            }
          />
        </svg>
      )}
    </div>
  );
};

export default AnimatedPhotoBorder;
