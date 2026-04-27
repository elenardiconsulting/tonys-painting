import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FadeUpSection from "@/components/site/FadeUpSection";
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

const AboutPhotoSlideshow = () => {
  const shouldReduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const goTo = (index: number) => {
    if (transitioning || shouldReduceMotion) return;
    const nextIndex = index % people.length;
    if (nextIndex === current) return;
    
    setNext(nextIndex);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(nextIndex);
      setNext((nextIndex + 1) % people.length);
      setTransitioning(false);
      setProgressKey((k) => k + 1);
    }, 700);
  };

  useEffect(() => {
    if (paused || transitioning || shouldReduceMotion) return;
    const interval = setInterval(() => {
      goTo(current + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [current, paused, transitioning, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-col items-center gap-[14px]">
        <div className="relative w-[200px] h-[250px] md:w-[300px] md:h-[370px] rounded-[8px] overflow-hidden">
          <img
            src={people[current].image}
            alt={people[current].name}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
        <div className="text-center">
          <p className="font-sans font-semibold text-[18px] text-[#1A1A1A] m-0 mb-[5px]">
            {people[current].name}
          </p>
          <p className="font-sans font-medium text-[12px] text-[#C4291C] uppercase tracking-[0.08em] m-0">
            {people[current].role}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex flex-col items-center gap-[14px]"
    >
      {/* Container das fotos sobrepostas */}
      <div className="relative w-[200px] h-[250px] md:w-[300px] md:h-[370px] rounded-[8px] overflow-hidden">
        {/* Foto atual (embaixo) */}
        <img
          src={people[current].image}
          alt={people[current].name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            opacity: transitioning ? 0 : 1,
            transition: "opacity 0.7s ease",
            zIndex: 1,
          }}
        />

        {/* Proxima foto (em cima, aparece durante transicao) */}
        <img
          src={people[next].image}
          alt={people[next].name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            opacity: transitioning ? 1 : 0,
            transition: "opacity 0.7s ease",
            zIndex: 2,
          }}
        />

        {/* Borda vermelha SVG animada por cima de tudo */}
        <svg
          className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] z-[3] pointer-events-none"
          viewBox="0 0 308 378"
        >
          <rect
            x="2"
            y="2"
            width="304"
            height="374"
            rx="8"
            fill="none"
            stroke="#C4291C"
            strokeWidth="2.5"
            strokeDasharray="1356"
            strokeDashoffset="1356"
            style={{
              animation: "drawBorder 2.5s ease-in-out infinite alternate",
            }}
          />
        </svg>
      </div>

      {/* Nome e cargo com fade */}
      <div
        className="text-center"
        style={{
          opacity: transitioning ? 0 : 1,
          transition: "opacity 0.7s ease",
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            color: "#1A1A1A",
            margin: "0 0 5px",
          }}
        >
          {transitioning ? people[next].name : people[current].name}
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
          {transitioning ? people[next].role : people[current].role}
        </p>
      </div>

      {/* Barra de progresso */}
      <div className="w-[200px] md:w-[300px] h-[2px] bg-black/10 rounded-[1px] overflow-hidden">
        <div
          key={progressKey}
          style={{
            height: "100%",
            background: "#C4291C",
            borderRadius: "1px",
            animation: paused ? "none" : "progressBar 5s linear forwards",
          }}
        />
      </div>

      {/* Dots */}
      <div className="flex gap-[8px] justify-center">
        {people.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: current === i ? "20px" : "6px",
              height: "6px",
              borderRadius: current === i ? "3px" : "50%",
              background: current === i ? "#C4291C" : "rgba(0,0,0,0.20)",
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
  );
};

const AboutSnippet = () => {
  return (
    <section id="about" className="bg-stone overflow-hidden">
      <div className="container py-20 md:py-28 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* TOP PANEL ON MOBILE / LEFT PANEL ON DESKTOP */}
        <div className="w-full order-1 lg:order-none flex justify-center lg:justify-start">
          <FadeUpSection className="w-full">
            <AboutPhotoSlideshow />
          </FadeUpSection>
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
    </section>
  );
};

export default AboutSnippet;
