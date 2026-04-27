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
  "deck-stairs": {
    slug: "deck-stairs",
    name: "Deck and Stairs",
    description: "Decks and stairs take a beating from New England weather. We prep every surface properly, use premium stains and sealers, and make sure every board and railing is solid before we finish the job. Whether you need a full refinish or targeted repairs, we treat your outdoor space with the same care we bring inside.",
    includes: [
      "Deck staining and sealing",
      "Deck board repair and replacement",
      "Stair repair and refinishing",
      "Railing inspection and repair",
      "Power washing and surface prep",
      "New deck finishing (post-construction)",
    ],
  },
  "construction-cleaning": {
    slug: "construction-cleaning",
    name: "Construction Cleaning",
    description: "Construction leaves behind dust, debris and mess that requires more than a regular cleaning. Our team specializes in post-construction cleanup for residential and commercial spaces, working carefully around new finishes and installations to leave every room spotless and ready to show.",
    includes: [
      "Dust and debris removal",
      "Window and glass cleaning",
      "Floor cleanup after construction",
      "Cabinet and surface wipe-down",
      "Paint splatter and adhesive removal",
      "Final walk-through inspection",
    ],
  },
  carpentry: {
    slug: "carpentry",
    name: "General Carpentry",
    description: "Good carpentry is what separates a renovation that looks rushed from one that looks intentional. Our team handles trim, moldings, built-ins, door frames and structural repairs with precision and care. If it involves wood and it needs to be right, we can handle it.",
    includes: [
      "Interior trim and moldings",
      "Door and window frame repair",
      "Built-in shelving and cabinetry",
      "Baseboards and crown molding",
      "Structural wood repair",
      "Deck framing and carpentry",
    ],
  },
  flooring: {
    slug: "flooring",
    name: "Flooring",
    description: "The right floor changes everything about a space. We install and refinish hardwood, vinyl and other flooring types with tight seams, smooth transitions and a finish that holds up over time. We have worked on everything from historic New England homes with original pine floors to modern renovations with engineered hardwood.",
    includes: [
      "Hardwood floor installation",
      "Hardwood floor refinishing and staining",
      "Vinyl and LVP installation",
      "Subfloor repair and leveling",
      "Floor transition and trim",
      "Historic floor restoration",
    ],
  },
  "ceramic-tile": {
    slug: "ceramic-tile",
    name: "Ceramic Tile",
    description: "Tile is one of those finishes where precision matters more than almost anything else. A line that is off by a fraction shows for years. Our team measures carefully, works methodically and groutes cleanly so every tile installation looks exactly as it should and stays that way.",
    includes: [
      "Bathroom floor and wall tile",
      "Kitchen backsplash",
      "Shower and tub surround",
      "Entryway and mudroom tile",
      "Outdoor tile installation",
      "Tile repair and re-grouting",
    ],
  },
  fence: {
    slug: "fence",
    name: "Fence",
    description: "A well-built fence does more than mark a boundary. It adds privacy, curb appeal and value to your property. We handle new fence installation and repairs for wood, vinyl and other materials, working with the same care and quality we bring to every other project.",
    includes: [
      "Wood fence installation",
      "Vinyl fence installation",
      "Fence repair and board replacement",
      "Post repair and reinforcement",
      "Gate installation and adjustment",
      "Fence staining and sealing",
    ],
  },
  plastering: {
    slug: "plastering",
    name: "Plastering",
    description: "Cracks, holes and uneven walls are more common than most homeowners expect, especially in older New England homes. We repair and skim-coat plaster surfaces so the finish is smooth and paint-ready, with no visible patches or texture differences. The result is a wall that looks like it was never touched.",
    includes: [
      "Crack and hole repair",
      "Skim coating over damaged plaster",
      "Drywall patching and finishing",
      "Texture matching on older homes",
      "Full wall re-plastering",
      "Paint-ready surface preparation",
    ],
  },
  countertop: {
    slug: "countertop",
    name: "Countertop",
    description: "A countertop installation is only as good as the prep behind it. We measure carefully, cut precisely and install with attention to every seam and edge so the finished surface looks clean and professional. Whether you are upgrading a kitchen or finishing a bathroom vanity, we make sure the result is something you will be happy with for years.",
    includes: [
      "Kitchen countertop installation",
      "Bathroom vanity countertop",
      "Laundry and utility surfaces",
      "Seam and edge finishing",
      "Backsplash preparation",
      "Old countertop removal and disposal",
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
            {(() => {
              const gallery: Record<string, string[]> = {
                "interior-painting": ["/images/project-05.jpg", "/images/project-15.jpg", "/images/project-04.jpg", "/images/project-16.jpg", "/images/project-02.jpg", "/images/project-01.jpg"],
                "exterior-painting": ["/images/project-02.jpg", "/images/project-12.jpg", "/images/project-14.jpg", "/images/project-13.jpg", "/images/project-03.jpg", "/images/project-01.jpg"],
                "remodeling": ["/images/project-04.jpg", "/images/project-16.jpg", "/images/project-15.jpg", "/images/project-08.jpg", "/images/project-07.jpg", "/images/project-09.jpg"],
                "handyman": ["/images/project-08.jpg", "/images/project-07.jpg", "/images/project-09.jpg", "/images/project-11.jpg"]
              };
              const images = service.slug ? (gallery[service.slug] || []) : [];
              return images.map((src, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] bg-background overflow-hidden"
                >
                  <img src={src} alt={`Tony's ${service.name} project detail`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ));
            })()}
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
