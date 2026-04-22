import { Brush, Home, Hammer } from "lucide-react";
import FadeUpSection from "@/components/site/FadeUpSection";

const services = [
  {
    icon: Brush,
    name: "Interior Painting",
    desc: "Refined finishes that bring warmth and character to every room.",
  },
  {
    icon: Home,
    name: "Exterior Painting",
    desc: "Durable, weather ready coatings built for New England conditions.",
  },
  {
    icon: Hammer,
    name: "Remodeling",
    desc: "Thoughtful renovations from carpentry to full room transformations.",
  },
];

const ServicesPreview = () => {
  return (
    <section id="services" className="bg-background">
      <div className="container py-20 md:py-28">
        <FadeUpSection className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">What We Do</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            Craftsmanship for homes that deserve more.
          </h2>
        </FadeUpSection>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {services.map(({ icon: Icon, name, desc }, i) => (
            <FadeUpSection key={name} delay={i * 0.1} as="article" className="service-card bg-background p-8 md:p-10 hover:bg-stone">
              <Icon className="text-primary" size={32} strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl md:text-3xl text-foreground">{name}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
              <a
                href="/services"
                className="mt-6 inline-block text-sm font-medium text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors pb-0.5"
              >
                Learn more
              </a>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
