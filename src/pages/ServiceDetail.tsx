import { Link, useParams, Navigate } from "react-router-dom";
import { Check } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import { Button } from "@/components/ui/button";

interface ServiceData {
  slug: string;
  name: string;
  description: string;
  includes: string[];
}

const SERVICES: Record<string, ServiceData> = {
  "interior-painting": {
    slug: "interior-painting",
    name: "Interior Painting",
    description:
      "Whether you are refreshing a single room or repainting your entire home, our team brings attention to detail that shows in every wall, ceiling and trim. We work cleanly, finish on schedule, and leave your space better than we found it.",
    includes: [
      "Living rooms and bedrooms",
      "Kitchens and bathrooms",
      "Ceilings and trim",
      "Accent walls",
      "Commercial offices and retail spaces",
      "New construction interiors",
      "Color consultation",
    ],
  },
  "exterior-painting": {
    slug: "exterior-painting",
    name: "Exterior Painting",
    description:
      "The outside of your home tells a story before anyone walks through the door. We prep every surface properly, use only premium paints built for New England weather, and deliver results that hold up season after season.",
    includes: [
      "Full exterior walls and siding",
      "Porches and decks",
      "Fences and gates",
      "Trim and shutters",
      "Commercial buildings",
      "Power washing and surface prep",
      "Benjamin Moore premium paints",
    ],
  },
  remodeling: {
    slug: "remodeling",
    name: "Remodeling",
    description:
      "Sometimes a fresh coat of paint is just the beginning. Our team handles flooring, tile, plastering and carpentry so you do not need to coordinate multiple contractors for your project.",
    includes: [
      "Hardwood and vinyl flooring",
      "Ceramic and porcelain tile",
      "Plastering and drywall",
      "General carpentry",
      "Countertop installation",
      "Finish work and moldings",
    ],
  },
  handyman: {
    slug: "handyman",
    name: "Handyman Services",
    description:
      "Small jobs matter just as much as big ones. From fixing a deck to cleaning up after a construction project, we take care of the details that keep your property in great shape.",
    includes: [
      "Deck and stair repair",
      "Fence installation and repair",
      "Construction cleaning",
      "General repairs",
      "Door and window trim",
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICES[slug] : undefined;

  if (!service) return <Navigate to="/services" replace />;

  return (
    <PageLayout>
      <InnerHero
        variant="image"
        title={service.name}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.name },
        ]}
      />

      <section className="bg-background">
        <div className="container py-16 md:py-24 grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Overview</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-6">
              Done with care, finished to last.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>

          <aside className="bg-stone p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">What is included</p>
            <ul className="space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground">
                  <Check size={16} className="text-primary mt-1 shrink-0" strokeWidth={2.5} />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-stone">
        <div className="container py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Recent Work</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">Selected projects.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-background flex items-center justify-center text-muted-foreground/50 font-display text-base"
              >
                Project {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark">
        <div className="container py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-background leading-tight max-w-2xl mx-auto">
            Ready to get started?
          </h2>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
          >
            <Link to="/#contact">Get Free Estimate</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
