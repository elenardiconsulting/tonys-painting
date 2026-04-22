import { motion, useReducedMotion } from "framer-motion";
import RippleButton from "@/components/site/RippleButton";

const Hero = () => {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: "easeOut" as const },
        };

  return (
    <section id="top" className="relative pt-24 md:pt-28 bg-[#1A1A1A]">
      <div className="container min-h-[calc(100vh-5rem)] py-12 md:py-20 flex flex-col justify-center">
        <div className="max-w-5xl">
          <motion.h1 {...fadeUp(0)} className="hero-headline">
            Transforming spaces across Martha&apos;s Vineyard and New England.
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-8 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "#9CA3AF" }}
          >
            Since 2004, Tony&apos;s team has brought precision and care to every project in the region.
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="mt-10 flex flex-col sm:flex-row gap-3">
            <RippleButton
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-8"
            >
              <a href="/contact">Get Free Estimate</a>
            </RippleButton>
            <RippleButton
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm h-12 px-8 border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground"
            >
              <a href="/portfolio">See Our Work</a>
            </RippleButton>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(0.7)}
          className="mt-16 pt-6"
          style={{ borderTop: "1px solid #2C2C2A" }}
        >
          <p
            className="uppercase"
            style={{
              color: "#6B6560",
              letterSpacing: "0.1em",
              fontSize: "11px",
            }}
          >
            Martha&apos;s Vineyard · Boston · New England
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
