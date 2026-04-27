import { Button } from "@/components/ui/button";
import FadeUpSection from "@/components/site/FadeUpSection";
import AnimatedPhotoBorder from "@/components/site/AnimatedPhotoBorder";
import otonielSantos from "@/assets/otoniel-santos-founder.png";

const AboutSnippet = () => {
  return (
    <section id="about" className="bg-stone">
      <div className="container py-20 md:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT PANEL: TWO PORTRAITS */}
        <FadeUpSection className="flex flex-row items-end justify-center lg:justify-start gap-[28px] order-1 lg:order-none">
          {/* Portrait 1: Tony */}
          <div className="flex flex-col items-center gap-[10px]">
            <div className="w-[160px] h-[200px] md:w-[260px] md:h-[320px]">
              <AnimatedPhotoBorder className="w-full h-full">
                <img
                  src={otonielSantos}
                  alt="Otoniel Santos, Founder and CEO of Tony's Painting"
                  className="block w-full h-full object-cover object-[top_center] rounded-[6px]"
                />
              </AnimatedPhotoBorder>
            </div>
            <div className="text-center">
              <h4 className="font-sans font-semibold text-[13px] md:text-[17px] text-[#1A1A1A] leading-tight">
                Otoniel Santos
              </h4>
              <p className="font-sans font-medium text-[10px] md:text-[12px] text-[#C4291C] uppercase tracking-[0.08em] mt-1">
                Founder and CEO
              </p>
            </div>
          </div>

          {/* Portrait 2: Marcela */}
          <div className="flex flex-col items-center gap-[10px]">
            <div className="w-[160px] h-[200px] md:w-[260px] md:h-[320px]">
              <AnimatedPhotoBorder className="w-full h-full" delay={1.2}>
                <img
                  src="/images/co_ceo.png"
                  alt="Marcela S., Co-CEO at Tony's Painting"
                  className="block w-full h-full object-cover object-[top_center] rounded-[6px]"
                />
              </AnimatedPhotoBorder>
            </div>
            <div className="text-center">
              <h4 className="font-sans font-semibold text-[13px] md:text-[17px] text-[#1A1A1A] leading-tight">
                Marcela S.
              </h4>
              <p className="font-sans font-medium text-[10px] md:text-[12px] text-[#C4291C] uppercase tracking-[0.08em] mt-1">
                Co-CEO
              </p>
            </div>
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
