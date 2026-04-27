import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FadeUpSection from "@/components/site/FadeUpSection";
import AnimatedPhotoBorder from "@/components/site/AnimatedPhotoBorder";
import otonielSantos from "@/assets/otoniel-santos-founder.png";

const people = [
  {
    image: otonielSantos,
    name: "Otoniel Santos",
    role: "Founder and CEO",
  },
  {
    image: "/images/co_ceo.png",
    name: "Marcela S.",
    role: "Co-CEO",
  },
];

const AboutSnippet = () => {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % people.length);
        setFading(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, active, shouldReduceMotion]);

  const handleManualNav = (index: number) => {
    if (index === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 600);
  };

  return (
    <section id="about" className="bg-stone overflow-hidden">
      <div className="container py-20 md:py-28 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* TOP PANEL ON MOBILE / LEFT PANEL ON DESKTOP */}
        <div className="w-full order-1 lg:order-none">
          {shouldReduceMotion ? (
            <FadeUpSection className="flex flex-row items-end justify-center lg:justify-start gap-4 md:gap-[28px] w-full">
              {people.map((person, i) => (
                <div key={i} className="flex flex-col items-center gap-[10px]">
                  <div className="w-[140px] h-[175px] md:w-[260px] md:h-[320px]">
                    <AnimatedPhotoBorder className="w-full h-full" delay={i * 0.5}>
                      <img
                        src={person.image}
                        alt={person.name}
                        className="block w-full h-full object-cover object-[top_center] rounded-[6px]"
                      />
                    </AnimatedPhotoBorder>
                  </div>
                  <div className="text-center">
                    <h4 className="font-sans font-semibold text-[14px] md:text-[17px] text-[#1A1A1A] leading-tight">
                      {person.name}
                    </h4>
                    <p className="font-sans font-medium text-[11px] md:text-[12px] text-[#C4291C] uppercase tracking-[0.08em] mt-1">
                      {person.role}
                    </p>
                  </div>
                </div>
              ))}
            </FadeUpSection>
          ) : (
            <FadeUpSection className="flex flex-col items-center lg:items-start">
              <div
                className="about-photo-panel flex flex-col items-center lg:items-start"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* Photo Container */}
                <div className="relative inline-block w-[160px] h-[200px] md:w-[260px] md:h-[320px]">
                  <AnimatedPhotoBorder className="w-full h-full">
                    <img
                      src={people[active].image}
                      alt={people[active].name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                        borderRadius: "6px",
                        opacity: fading ? 0 : 1,
                        transition: "opacity 0.6s ease",
                      }}
                    />
                  </AnimatedPhotoBorder>
                </div>

                {/* Progress Bar */}
                {!shouldReduceMotion && (
                  <div className="about-progress-bar w-[160px] md:w-[260px]">
                    <div
                      key={active}
                      className={`about-progress-fill ${paused ? "paused" : ""}`}
                    />
                  </div>
                )}

                {/* Name and Role */}
                <div
                  style={{
                    opacity: fading ? 0 : 1,
                    transition: "opacity 0.6s ease",
                    marginTop: "12px",
                    textAlign: "center",
                    width: "160px",
                  }}
                  className="md:w-[260px]"
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "17px",
                      color: "#1A1A1A",
                      margin: "0 0 4px",
                    }}
                  >
                    {people[active].name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#C4291C",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      margin: 0,
                    }}
                  >
                    {people[active].role}
                  </p>
                </div>

                {/* Navigation Dots */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "16px",
                    width: "160px",
                  }}
                  className="md:w-[260px]"
                >
                  {people.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleManualNav(i)}
                      style={{
                        width: active === i ? "20px" : "6px",
                        height: "6px",
                        borderRadius: active === i ? "3px" : "50%",
                        background: active === i ? "#C4291C" : "rgba(0,0,0,0.20)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        padding: 0,
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </FadeUpSection>
          )}
        </div>

        {/* BOTTOM PANEL ON MOBILE / RIGHT PANEL ON DESKTOP */}
        <FadeUpSection
          delay={0.1}
          className="w-full flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-none"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4 w-full">About Us</p>
          <h2 className="font-display text-[28px] md:text-5xl text-foreground leading-tight">
            Built on trust, proven by results.
          </h2>
          <p className="mt-6 text-sm md:text-lg text-muted-foreground leading-relaxed max-w-full md:max-w-xl">
            Tony started this company in 2004 with one goal: to do the work right. Two decades later,
            that standard still defines every brushstroke and every project we deliver.
          </p>

          <Button
            asChild
            variant="outline"
            className="mt-8 rounded-sm h-12 px-8 border-foreground text-foreground hover:bg-foreground hover:text-background w-full md:w-auto flex justify-center items-center"
          >
            <a href="/about">Read our story</a>
          </Button>
        </FadeUpSection>
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }

        .about-progress-bar {
          height: 2px;
          background: rgba(0,0,0,0.10);
          border-radius: 1px;
          margin-top: 10px;
          overflow: hidden;
        }

        .about-progress-fill {
          height: 100%;
          background: #C4291C;
          border-radius: 1px;
          animation: progressBar 5s linear forwards;
        }

        .about-progress-fill.paused {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default AboutSnippet;
