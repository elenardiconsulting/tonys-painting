import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface AnimatedPhotoBorderProps {
  children: ReactNode;
  className?: string;
}

const AnimatedPhotoBorder = ({ children, className }: AnimatedPhotoBorderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <div className="relative overflow-hidden rounded-[4px] w-full h-full">
        {children}
      </div>

      <svg
        className="pointer-events-none absolute"
        style={{
          inset: "-4px",
          width: "calc(100% + 8px)",
          height: "calc(100% + 8px)",
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
          fill="none"
          stroke="#C4291C"
          strokeWidth="0.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={
            prefersReducedMotion
              ? { pathLength: 1 }
              : inView
              ? { pathLength: [0, 1, 0] }
              : { pathLength: 0 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }
          }
        />
      </svg>
    </div>
  );
};

export default AnimatedPhotoBorder;
