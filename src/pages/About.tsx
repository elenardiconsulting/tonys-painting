import { Check, Wrench, Handshake } from "lucide-react";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import FadeUpSection from "@/components/site/FadeUpSection";
import RippleButton from "@/components/site/RippleButton";
import AnimatedPhotoBorder from "@/components/site/AnimatedPhotoBorder";
import otonielSantos from "@/assets/otoniel-santos-founder.png";

const values = [
  {
    icon: Check,
    title: "Professionalism",
    description:
      "We treat every home and business as if it were our own. Clean, respectful and always on schedule.",
  },
  {
    icon: Wrench,
    title: "Hard Work",
    description:
      "No shortcuts. We prepare every surface properly and finish every job the way it deserves to be finished.",
  },
  {
    icon: Handshake,
    title: "Honesty",
    description:
      "You get a straight answer from us every time. Fair pricing, clear timelines and no surprises.",
  },
];

const timeline = [
  { year: "2004", text: "Otoniel Santos founds Tony's Painting in New England." },
  { year: "2008", text: "Expands into commercial projects across the region." },
  { year: "2012", text: "Team grows and project volume across New England doubles." },
  { year: "2018", text: "Over 300 projects completed across New England." },
  { year: "2024", text: "20 years, 500 projects and a reputation built one brushstroke at a time." },
];

const About = () => {
  return (
    <PageLayout>
      <SEO
        title="About Tony's Painting and Remodeling | Est. 2004"
        description="Founded in 2004 by Otoniel Santos in New England. 20 years serving New England with professionalism, hard work and honesty."
        canonical="/about"
        keywords="Tony's Painting history, painting company New England, Otoniel Santos painter, painting remodeling New England since 2004"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Tony's Painting and Remodeling",
          description:
            "Founded in 2004 by Otoniel Santos in New England, serving New England for over 20 years.",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "Tony's Painting and Remodeling",
            foundingDate: "2004",
            founder: { "@type": "Person", name: "Otoniel Santos" },
          },
        }}
      />
      <InnerHero
        title="20 years of doing the work right."
        subtitle="Tony started this company with a simple belief: that the quality of your work is the only thing that matters."
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      {/* Leadership */}
      <section className="bg-background">
        <div className="container py-20 md:py-28">
          <FadeUpSection className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              The people behind the work.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Tony's Painting was built on a simple belief: show up, do the work right, and treat every client the way you would want to be treated.
            </p>
          </FadeUpSection>

          <div className="relative max-w-[720px] mx-auto grid md:grid-cols-2 gap-12">
            {/* Vertical divider, desktop only */}
            <div
              className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-stone"
              aria-hidden
            />

            {/* Tony */}
            <FadeUpSection className="flex flex-col items-center text-center gap-4">
              <div className="w-[160px] h-[200px] md:w-[260px] md:h-[320px]">
                <AnimatedPhotoBorder className="w-full h-full">
                  <img
                    src={otonielSantos}
                    alt="Otoniel Santos, Founder and CEO of Tony's Painting"
                    className="block w-full h-full object-cover object-[top_center] rounded-[6px]"
                  />
                </AnimatedPhotoBorder>
              </div>
              <h3 className="font-sans font-semibold text-[15px] md:text-[18px] text-foreground leading-tight mt-2">
                Otoniel Santos
              </h3>
              <p className="text-[10px] md:text-[12px] font-medium uppercase tracking-[0.08em] text-primary">
                Founder and CEO
              </p>
              <p className="text-sm text-muted-foreground leading-[1.7] max-w-[280px]">
                Tony started this company in 2004 with one goal: to do the work right. Two decades later, that standard still defines every project we deliver.
              </p>
            </FadeUpSection>

            {/* Marcela */}
            <FadeUpSection delay={0.1} className="flex flex-col items-center text-center gap-4">
              <div className="w-[160px] h-[200px] md:w-[260px] md:h-[320px]">
                <AnimatedPhotoBorder className="w-full h-full" delay={1.2}>
                  <img
                    src="/images/co_ceo.png"
                    alt="Marcela S., Co-CEO of Tony's Painting"
                    className="block w-full h-full object-cover object-[top_center] rounded-[6px]"
                  />
                </AnimatedPhotoBorder>
              </div>
              <h3 className="font-sans font-semibold text-[15px] md:text-[18px] text-foreground leading-tight mt-2">
                Marcela S.
              </h3>
              <p className="text-[10px] md:text-[12px] font-medium uppercase tracking-[0.08em] text-primary">
                Co-CEO
              </p>
              <p className="text-sm text-muted-foreground leading-[1.7] max-w-[280px]">
                Marcela leads operations and client relationships at Tony's, making sure every project runs smoothly from the first call to the final walkthrough.
              </p>
            </FadeUpSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone">
        <div className="container py-20 md:py-28">
          <FadeUpSection className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Our Values</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              What we stand for.
            </h2>
          </FadeUpSection>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <FadeUpSection
                key={v.title}
                delay={i * 0.1}
                className="bg-surface p-8 md:p-10 border border-border"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-stone text-primary mb-6">
                  <v.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.description}</p>
              </FadeUpSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background">
        <div className="container py-20 md:py-28">
          <FadeUpSection className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Timeline</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              Our story.
            </h2>
          </FadeUpSection>

          <ol className="relative max-w-3xl">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px bg-primary"
              aria-hidden
            />
            {timeline.map((item, i) => (
              <FadeUpSection key={item.year} delay={i * 0.1} as="li" className="relative pl-10 pb-10 last:pb-0 block">
                <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                <div className="font-display text-2xl md:text-3xl text-primary leading-none">
                  {item.year}
                </div>
                <p className="mt-2 text-base md:text-lg text-foreground leading-relaxed">
                  {item.text}
                </p>
              </FadeUpSection>
            ))}
          </ol>
        </div>
      </section>

      {/* Service areas */}
      <section className="bg-background border-t border-border">
        <div className="container py-20 md:py-28">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Coverage</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              Where we work.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              We serve clients across New England, taking on residential and commercial projects throughout the region.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark">
        <div className="container py-20 md:py-28 text-center">
          <FadeUpSection>
            <h2 className="font-display text-3xl md:text-5xl text-background leading-tight max-w-2xl mx-auto">
              We would love to work on your next project.
            </h2>
            <div className="mt-10">
              <RippleButton
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
              >
                <a href="/contact">Request a Consultation</a>
              </RippleButton>
            </div>
          </FadeUpSection>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
