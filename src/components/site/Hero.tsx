import { motion, useReducedMotion } from "framer-motion";
import { Shield, Star, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/project-01.jpg"; // Using the 20210824_111207_08-scaled.jpg image which was renamed during upload

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
        initial: { scale: 1.06 },
        animate: { scale: 1 },
        transition: { duration: 1.4, ease: "easeOut" as const },
      };

  const stats = [
    { icon: <Shield size={22} />, title: "20+ Years", desc: "Experience" },
    { icon: <Star size={22} />, title: "5-Star Rated", desc: "Local Company" },
    { icon: <CheckCircle2 size={22} />, title: "Quality Work", desc: "You Can Trust" },
  ];

  return (
    <section
      id="top"
      className="relative min-h-screen bg-[#1A1A1A] overflow-hidden flex flex-col justify-center"
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        {...imageMotion}
      >
        <img
          src={HERO_IMAGE}
          alt="Tony's Painting professional painting exterior"
          className="w-full h-full object-cover object-[center_30%]"
          loading="eager"
        />
      </motion.div>

      {/* Overlays */}
      {/* Overlay 1: Lateral gradient */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.10) 100%)"
        }}
      />
      {/* Mobile-specific overlay strength */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none md:hidden"
        style={{
          background: "rgba(0,0,0,0.4)"
        }}
      />
      
      {/* Overlay 2: Bottom vignette */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.0) 40%)"
        }}
      />
      
      {/* Overlay 3: Top vignette for navbar */}
      <div 
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 20%)"
        }}
      />

      {/* Content */}
      <div className="container relative z-[10] px-6 md:px-20 pt-20">
        <div className="max-w-[720px]">
          <motion.h1 
            {...fadeUp(0)}
            className="hero-headline"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(48px, 6.5vw, 88px)",
              lineHeight: "0.97",
              letterSpacing: "-0.03em",
              color: "#F5F1EB",
              maxWidth: "680px"
            }}
          >
            Transforming spaces across{" "}
            <br className="hidden md:block" />
            <span style={{ color: "#C4291C" }}>Martha's Vineyard</span>{" "}
            <br className="hidden md:block" />
            and{" "}
            <span style={{ color: "#C4291C" }}>New England.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mt-5 text-[17px] leading-[1.7] text-white/75 max-w-[520px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Since 2004, Tony's team has brought precision and care to every project in the region.
          </motion.p>

          <motion.div 
            {...fadeUp(0.5)} 
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8"
          >
            <Button asChild className="group relative h-auto py-3.5 px-7 rounded-lg bg-gradient-to-br from-[#C4291C] to-[#8B1A10] text-white font-semibold text-[15px] shadow-[0_4px_20px_rgba(196,41,28,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(196,41,28,0.45)]">
              <a href="/contact" className="flex items-center gap-2">
                Get Free Estimate
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </Button>

            <a 
              href="tel:+15089829675" 
              className="group flex items-center gap-3 text-white transition-opacity hover:opacity-80"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-[1.5px] border-white/40 transition-colors group-hover:border-white/60">
                <Phone size={16} fill="white" />
              </div>
              <span className="font-medium text-[15px]">508 982 9675</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Credibility Stats */}
      <div className="absolute bottom-12 md:bottom-12 left-6 md:left-20 z-[10]">
        <motion.div 
          {...fadeUp(0.7)}
          className="flex flex-wrap items-center gap-y-6 gap-x-7 md:gap-x-10"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="text-[#C4291C]">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-base leading-none mb-1">
                  {stat.title}
                </span>
                <span className="text-white/55 text-xs font-normal">
                  {stat.desc}
                </span>
              </div>
              {idx < stats.length - 1 && (
                <div className="hidden sm:block w-[1px] h-8 bg-white/15 ml-3" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;