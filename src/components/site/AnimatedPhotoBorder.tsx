import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedPhotoBorderProps {
  children: ReactNode;
  className?: string;
}

const AnimatedPhotoBorder = ({ children, className }: AnimatedPhotoBorderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {/* Image layer */}
      <div className="relative w-full h-full overflow-hidden rounded-[4px]">
        {children}
      </div>

      {/* Animated border layer */}
      <svg
        className="pointer-events-none absolute"
        style={{
          top: "-6px",
          left: "-6px",
          width: "calc(100% + 12px)",
          height: "calc(100% + 12px)",
          overflow: "visible",
          zIndex: 2,
        }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <motion.rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="1.2"
          ry="1.2"
          fill="none"
          stroke="#C4291C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 1 }}
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
    </div>
  );
};

export default AnimatedPhotoBorder;
