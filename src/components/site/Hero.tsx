import { motion, useReducedMotion } from "framer-motion";
import RippleButton from "@/components/site/RippleButton";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80";

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
        initial: { opacity: 0, scale: 1.05 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.2, delay: 0.2, ease: "easeOut" as const },
      };

  return (
    <section
      id="top"
      className="relative pt-24 md:pt-28 bg-[#1A1A1A] overflow-hidden"
    >
      {/* Mobile-only subtle background texture */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
        aria-hidden="true"
      />

      <div className="container relative min-h-[calc(100vh-5rem)] py-12 md:py-0 md:grid md:grid-cols-[55fr_45fr] md:gap-0">
        {/* Left panel: existing content */}
        <div className="relative z-10 flex flex-col justify-center md:py-20 md:pr-12 lg:pr-16">

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

        {/* Right panel: image with overlays (desktop/tablet only) */}
        <div className="hidden md:block md:col-span-45 relative overflow-hidden">
          <motion.img
            {...imageMotion}
            src={HERO_IMAGE}
            alt="Interior space showcasing Tony's painting and remodeling craftsmanship"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />

          {/* Overlay 1: left-to-right fade into dark panel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #1A1A1A 0%, rgba(26,26,26,0.6) 25%, rgba(26,26,26,0.0) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Overlay 2: overall darkening */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "rgba(26, 26, 26, 0.45)",
              mixBlendMode: "multiply",
            }}
            aria-hidden="true"
          />

          {/* Overlay 3: brand color tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "rgba(196, 41, 28, 0.06)",
              mixBlendMode: "color",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
