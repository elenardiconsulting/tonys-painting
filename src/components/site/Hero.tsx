import { motion, useReducedMotion } from "framer-motion";
import RippleButton from "@/components/site/RippleButton";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=85";

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

  const imageMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, scale: 1.06 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.4, ease: "easeOut" as const },
      };

  return (
    <section
      id="top"
      className="relative pt-24 md:pt-28 bg-[#1A1A1A] overflow-hidden"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage: `
            linear-gradient(to right, rgba(232,25,106,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(232,25,106,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer 1: background image */}
      <motion.img
        {...imageMotion}
        src={HERO_IMAGE}
        alt="Interior space showcasing Tony's painting and remodeling craftsmanship"
        className="absolute inset-0 w-full h-full object-cover object-center md:[object-position:center_30%]"
        style={{ zIndex: 0 }}
        loading="eager"
      />

      {/* Layer 2: darkening overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "rgba(26, 26, 26, 0.58)",
        }}
        aria-hidden="true"
      />

      {/* Layer 3: top/bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to bottom, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0.0) 40%, rgba(26,26,26,0.0) 60%, rgba(26,26,26,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 4: brand color tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: "rgba(196, 41, 28, 0.07)",
          mixBlendMode: "color",
        }}
        aria-hidden="true"
      />

      {/* Layer 5: content */}
      <div
        className="container relative min-h-[calc(100vh-5rem)] py-12 md:py-20 flex flex-col justify-center"
        style={{ zIndex: 4 }}
      >
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
