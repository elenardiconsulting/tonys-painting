import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpSectionProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "transition" | "viewport"> {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "ol" | "ul";
}

const FadeUpSection = ({ children, delay = 0, as = "div", className, ...rest }: FadeUpSectionProps) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return (
      <MotionTag className={className} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-80px" }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default FadeUpSection;
