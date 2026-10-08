import RippleButton from "@/components/site/RippleButton";
import FadeUpSection from "@/components/site/FadeUpSection";

const FinalCTA = () => {
  return (
    <section id="contact" className="bg-dark">
      <div className="container py-20 md:py-32 text-center">
        <FadeUpSection>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-6">Free Estimate</p>
          <h2 className="font-display text-4xl md:text-6xl text-background leading-tight max-w-3xl mx-auto">
            Ready to get a painting or remodeling estimate?
          </h2>
          <p className="mt-6 text-background/70 max-w-xl mx-auto leading-relaxed">
            Describe your project and we'll get back to you within one business day. Interior, exterior, remodeling — no job is too large or too small.
          </p>
          <div className="mt-10">
            <RippleButton
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
            >
              <a href="/contact">Request a Free Estimate</a>
            </RippleButton>
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
};

export default FinalCTA;
