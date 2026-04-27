import { motion, useReducedMotion } from "framer-motion";
import { Shield, Star, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HERO_IMAGE = heroBg;

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

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-[10]">
        <div className="container px-6 md:px-20 pb-10 md:pb-20 max-w-[720px] flex flex-col gap-5 items-start">
          <motion.h1 
            {...fadeUp(0)}
            className="hero-headline"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 4.2vw, 62px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#F5F1EB",
            }}
          >
            Painting and remodeling<br />
            you can{" "}
            <span style={{ color: "#C4291C" }}>actually trust.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="text-[16px] leading-[1.7] text-white/72 max-w-[500px] m-0"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            Since 2004, Tony's team has brought precision and care to every project in the region.
          </motion.p>

          <motion.div 
            {...fadeUp(0.5)} 
            className="flex flex-row items-center gap-5 flex-wrap"
          >
            <Button asChild className="h-auto py-[13px] px-[26px] rounded-lg bg-[#C4291C] hover:bg-[#A82318] text-white font-semibold text-[14px] transition-all duration-200">
              <a href="/contact" className="flex items-center gap-2">
                Get Free Estimate
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </Button>

            <a 
              href="tel:+15089829675" 
              className="flex items-center gap-[10px] text-white transition-opacity hover:opacity-80"
            >
              <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full border-[1.5px] border-white/35">
                <Phone size={16} fill="white" />
              </div>
              <span className="font-medium text-[14px]" style={{ fontFamily: "'Inter', sans-serif" }}>508 982 9675</span>
            </a>
          </motion.div>

          {/* Credibility Stats */}
          <motion.div 
            {...fadeUp(0.7)}
            className="w-full pt-4 border-t border-white/12 mt-2"
          >
            <div className="grid grid-cols-2 md:flex md:flex-row items-center gap-y-5 gap-x-7 md:gap-x-[28px]">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="flex items-center gap-[10px]">
                    <div className="text-[#C4291C]">
                      {stat.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-[13px] md:text-[15px] leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {stat.title}
                      </span>
                      <span className="text-white/45 text-[10px] md:text-[11px] font-normal" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {stat.desc}
                      </span>
                    </div>
                  </div>
                  {idx < stats.length - 1 && (
                    <div className="hidden md:block w-[1px] h-[28px] bg-white/12 ml-[28px]" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;