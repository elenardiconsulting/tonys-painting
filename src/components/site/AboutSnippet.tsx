import { Button } from "@/components/ui/button";
import FadeUpSection from "@/components/site/FadeUpSection";

const AboutSnippet = () => {
  return (
    <section id="about" className="bg-stone">
      <div className="container py-20 md:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <FadeUpSection className="relative aspect-[4/5] bg-background overflow-hidden order-1 lg:order-none">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-display text-lg">
            Otoniel Santos, Founder
          </div>
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
