import { Button } from "@/components/ui/button";
import FadeUpSection from "@/components/site/FadeUpSection";
import AnimatedPhotoBorder from "@/components/site/AnimatedPhotoBorder";
import otonielSantos from "@/assets/otoniel-santos-founder.png";

const AboutSnippet = () => {
  return (
    <section id="about" className="bg-stone">
      <div className="container py-20 md:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <FadeUpSection className="relative aspect-[4/5] overflow-visible order-1 lg:order-none">
          <AnimatedPhotoBorder className="absolute inset-0">
            <img
              src={otonielSantos}
              alt="Otoniel Santos, Founder of Tony's Painting"
              className="block w-full h-full object-cover rounded-[4px]"
            />
          </AnimatedPhotoBorder>
        </FadeUpSection>

        <FadeUpSection delay={0.1}>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">About Us</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            Built on trust, proven by results.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            Tony started this company in 2004 with one goal: to do the work right. Two decades
            later, that standard still defines every brushstroke and every project we deliver.
          </p>

          <Button
            asChild
            variant="outline"
            className="mt-8 rounded-sm h-12 px-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            <a href="/about">Read our story</a>
          </Button>
        </FadeUpSection>
      </div>
    </section>
  );
};

export default AboutSnippet;
