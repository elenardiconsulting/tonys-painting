import { Link } from "react-router-dom";
import { Brush, Home, Hammer, Wrench, ArrowRight, Layers, Layout, HardHat, Ruler, Grid, Fence, Paintbrush, Square } from "lucide-react";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import FadeUpSection from "@/components/site/FadeUpSection";
import RippleButton from "@/components/site/RippleButton";

const services = [
  {
    icon: Brush,
    name: "Interior Painting",
    desc: "Refined interior finishes for every room, from a single accent wall to your entire home.",
    to: "/services/interior-painting",
  },
  {
    icon: Paintbrush,
    name: "Exterior Painting",
    desc: "Premium coatings built to handle New England weather, applied with proper prep and care.",
    to: "/services/exterior-painting",
  },
  {
    icon: Hammer,
    name: "Remodeling",
    desc: "Flooring, tile, plastering and carpentry handled by one trusted team from start to finish.",
    to: "/services/remodeling",
  },
  {
    icon: Wrench,
    name: "Handyman Services",
    desc: "The smaller jobs that keep your property looking sharp and working the way it should.",
    to: "/services/handyman",
  },
  {
    icon: Layers,
    name: "Deck and Stairs",
    desc: "Staining, sealing and repairs for decks and outdoor stairs.",
    to: "/services/deck-stairs",
  },
  {
    icon: HardHat,
    name: "Construction Cleaning",
    desc: "Post-construction cleanup for residential and commercial spaces.",
    to: "/services/construction-cleaning",
  },
  {
    icon: Ruler,
    name: "General Carpentry",
    desc: "Trim, moldings, built-ins and structural wood repairs.",
    to: "/services/carpentry",
  },
  {
    icon: Layout,
    name: "Flooring",
    desc: "Hardwood, vinyl and LVP installation and refinishing.",
    to: "/services/flooring",
  },
  {
    icon: Grid,
    name: "Ceramic Tile",
    desc: "Precision tile work for bathrooms, kitchens and floors.",
    to: "/services/ceramic-tile",
  },
  {
    icon: Fence,
    name: "Fence",
    desc: "Wood and vinyl fence installation, repair and staining.",
    to: "/services/fence",
  },
  {
    icon: Square,
    name: "Plastering",
    desc: "Crack repair, skim coating and paint-ready surface prep.",
    to: "/services/plastering",
  },
  {
    icon: Home,
    name: "Countertop",
    desc: "Kitchen and bathroom countertop installation and finishing.",
    to: "/services/countertop",
  },
];

const Services = () => {
  return (
    <PageLayout>
      <SEO
        title="Painting and Remodeling Services in New England"
        description="From interior and exterior painting to flooring, tile, carpentry and remodeling. Tony's serves Martha's Vineyard, Boston and all of New England. Free estimates."
        canonical="/services"
        keywords="painting services New England, remodeling contractor Martha's Vineyard, interior exterior painters Boston, flooring tile carpentry New England"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Painting and Remodeling Services",
          provider: {
            "@type": "LocalBusiness",
            name: "Tony's Painting and Remodeling",
            telephone: "+15089829675",
          },
          areaServed: "New England, USA",
          description:
            "Professional painting and remodeling services including interior painting, exterior painting, flooring, tile, carpentry and more.",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
          },
        }}
      />
      <FadeUpSection>
        <InnerHero
          title="Everything your space needs."
          subtitle="From a fresh coat of paint to a full remodel, we handle it all."
          crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
        />
      </FadeUpSection>

      <section className="bg-background">
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map(({ icon: Icon, name, desc, to }, i) => (
              <FadeUpSection key={to} delay={i * 0.1}>
                <Link
                  to={to}
                  className="service-card group relative bg-surface border border-stone p-8 md:p-10 block hover:shadow-sm"
                >
                  <Icon className="text-primary" size={32} strokeWidth={1.5} />
                  <h2 className="mt-6 font-display text-2xl md:text-3xl text-foreground">{name}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">{desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeUpSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark">
        <div className="container py-16 md:py-24 text-center">
          <FadeUpSection>
            <h2 className="font-display text-3xl md:text-5xl text-background leading-tight max-w-2xl mx-auto">
              Not sure which service you need? We can help.
            </h2>
            <RippleButton
              asChild
              size="lg"
              className="mt-8 bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
            >
              <Link to="/contact">Get Free Estimate</Link>
            </RippleButton>
          </FadeUpSection>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
