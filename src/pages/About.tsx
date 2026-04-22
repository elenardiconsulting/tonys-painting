import { Check, Wrench, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";

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
  { year: "2004", text: "Otoniel Santos founds Tony's Painting on Martha's Vineyard." },
  { year: "2008", text: "Expands into commercial projects across the island." },
  { year: "2012", text: "Team grows and first projects begin in the Boston area." },
  { year: "2018", text: "Over 300 projects completed across Martha's Vineyard and New England." },
  { year: "2024", text: "20 years, 500 projects and a reputation built one brushstroke at a time." },
];

const vineyard = [
  "Edgartown",
  "Chilmark",
  "West Chop",
  "Oak Bluffs",
  "Vineyard Haven",
  "Aquinnah",
  "Hamptons",
];

const boston = ["Boston", "Cambridge", "Brookline", "Newton", "Needham", "Wellesley"];

const About = () => {
  return (
    <PageLayout>
      <InnerHero
        title="20 years of doing the work right."
        subtitle="Tony started this company with a simple belief: that the quality of your work is the only thing that matters."
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      {/* Company history */}
      <section className="bg-background">
        <div className="container py-20 md:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] bg-stone overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/60 font-display text-lg">
              Photo of Tony
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Our Story</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              Built on trust, proven by results.
            </h2>
            <div className="mt-6 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Otoniel Santos founded Tony's Painting in 2004 on Martha's Vineyard with a small
                team and a big commitment to quality work. What started as a local residential
                painting service grew steadily into a full remodeling company trusted by homeowners
                and businesses across the island and throughout New England.
              </p>
              <p>
                Over the past 20 years, we have completed more than 500 projects from Edgartown to
                Boston, always with the same values we started with: show up on time, communicate
                clearly, and never cut corners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone">
        <div className="container py-20 md:py-28">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Our Values</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              What we stand for.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-surface p-8 md:p-10 border border-border"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-stone text-primary mb-6">
                  <v.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background">
        <div className="container py-20 md:py-28">
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Timeline</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              Our story.
            </h2>
          </div>

          <ol className="relative max-w-3xl">
            <div
              className="absolute left-[7px] top-2 bottom-2 w-px bg-primary"
              aria-hidden
            />
            {timeline.map((item) => (
              <li key={item.year} className="relative pl-10 pb-10 last:pb-0">
                <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                <div className="font-display text-2xl md:text-3xl text-primary leading-none">
                  {item.year}
                </div>
                <p className="mt-2 text-base md:text-lg text-foreground leading-relaxed">
                  {item.text}
                </p>
              </li>
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

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h3 className="font-display text-2xl text-foreground mb-6">Martha's Vineyard</h3>
              <ul className="space-y-3">
                {vineyard.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl text-foreground mb-6">Boston Area</h3>
              <ul className="space-y-3">
                {boston.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark">
        <div className="container py-20 md:py-28 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-background leading-tight max-w-2xl mx-auto">
            We would love to work on your next project.
          </h2>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
            >
              <a href="/#contact">Get Free Estimate</a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
