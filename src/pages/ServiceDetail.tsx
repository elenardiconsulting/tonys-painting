import { Link, useParams, Navigate } from "react-router-dom";
import { Check } from "lucide-react";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import { Button } from "@/components/ui/button";
import BeforeAfter from "@/components/site/BeforeAfter";
import deck01 from "@/assets/deck-IMG_2914.jpg.asset.json";
import deck02 from "@/assets/deck-IMG_2900.jpg.asset.json";
import deck03 from "@/assets/deck-IMG_2916.jpg.asset.json";
import deck04 from "@/assets/deck-IMG_2905.jpg.asset.json";
import deck05 from "@/assets/deck-IMG_2913.jpg.asset.json";
import deck06 from "@/assets/deck-IMG_2904.jpg.asset.json";
import deck07 from "@/assets/deck-IMG_2896.jpg.asset.json";
import deck08 from "@/assets/deck-project-07.jpg.asset.json";

const SEO_BY_SLUG: Record<string, { title: string; description: string; keywords: string; schema?: object; breadcrumbs?: { name: string; url: string }[]; faqs?: { question: string; answer: string }[] }> = {
  "interior-painting": {
    title: "Interior Painting in Martha's Vineyard | Tony's Painting",
    description:
      "Professional interior painters serving Martha's Vineyard and Cape Cod. Clean work, on time, 20+ years experience. Free estimate. Call 508-982-9675.",
    keywords:
      "interior painting Martha's Vineyard MA, interior painters Cape Cod, house painters Martha's Vineyard, interior painting Edgartown, interior painting Falmouth MA",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Interior Painting",
      provider: { "@type": "LocalBusiness", name: "Tony's Painting and Remodeling", telephone: "+15089829675" },
      areaServed: "New England, USA",
      description: "Interior painting for residential and commercial spaces across New England. Walls, ceilings, trim, accent walls and more.",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Interior Painting", url: "https://tonyspaintingmv.com/services/interior-painting" },
    ],
    faqs: [
      { question: "How much does interior painting cost in New England?", answer: "Interior painting costs vary based on room size, ceiling height and number of coats. Most rooms range from $300 to $800. We provide free estimates with no obligation." },
      { question: "How long does an interior painting project take?", answer: "A single room typically takes one day. A full home interior takes 3 to 7 days depending on size and complexity. We provide a timeline before starting." },
      { question: "Do you move furniture before painting?", answer: "Yes. Our team moves and protects all furniture before starting. We cover floors and surfaces and move everything back when the job is done." },
      { question: "What paint brands do you use for interior projects?", answer: "We use Benjamin Moore and Sherwin-Williams premium interior paints. We also accept customer-supplied paint if you have a specific product in mind." },
    ],
  },
  "exterior-painting": {
    title: "Exterior Painting in Martha's Vineyard | Tony's Painting",
    description:
      "Premium exterior painting built for New England weather. Serving Martha's Vineyard and Cape Cod since 2004. Free estimate. Call 508-982-9675.",
    keywords:
      "exterior painting Martha's Vineyard MA, exterior painters Cape Cod, house painting Martha's Vineyard, exterior painting Edgartown, exterior painting Falmouth MA",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Exterior Painting",
      provider: { "@type": "LocalBusiness", name: "Tony's Painting and Remodeling", telephone: "+15089829675" },
      areaServed: "New England, USA",
      description: "Exterior painting with premium paints built for New England weather. Siding, trim, decks, fences and more.",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Exterior Painting", url: "https://tonyspaintingmv.com/services/exterior-painting" },
    ],
    faqs: [
      { question: "How much does exterior painting cost in New England?", answer: "Exterior painting costs depend on the size of the home, siding material and condition. Most homes range from $2,500 to $8,000. We provide free on-site estimates." },
      { question: "What is the best time of year to paint exterior in New England?", answer: "Late spring through early fall is ideal. We paint when temperatures are consistently above 50 degrees Fahrenheit and conditions are dry. We work within safe weather windows year-round." },
      { question: "How long does exterior paint last in New England?", answer: "With proper preparation and premium paint, exterior paint lasts 7 to 10 years in New England. Proper surface prep is the most important factor in paint longevity." },
      { question: "Do you pressure wash before exterior painting?", answer: "Yes. Power washing and surface preparation are included in every exterior project. Clean, properly prepped surfaces are essential for paint to bond and last." },
    ],
  },
  remodeling: {
    title: "Home Remodeling in Martha's Vineyard | Tony's Painting",
    description:
      "Full remodeling services in Martha's Vineyard and Cape Cod. Flooring, tile, carpentry and more. One team, one estimate. Free quote. Call 508-982-9675.",
    keywords:
      "home remodeling Martha's Vineyard MA, remodeling contractor Cape Cod, kitchen bathroom remodel Martha's Vineyard, flooring tile Martha's Vineyard MA",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Home Remodeling",
      provider: { "@type": "LocalBusiness", name: "Tony's Painting and Remodeling", telephone: "+15089829675" },
      areaServed: "New England, USA",
      description: "Full remodeling services including flooring, tile, plastering, carpentry and countertop installation.",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Remodeling", url: "https://tonyspaintingmv.com/services/remodeling" },
    ],
    faqs: [
      { question: "Do you handle full home remodels or only specific rooms?", answer: "We handle both. From a single bathroom to a full home renovation, our team manages flooring, tile, carpentry, plastering and more without requiring multiple contractors." },
      { question: "How long does a remodeling project take?", answer: "A bathroom remodel typically takes 1 to 2 weeks. A kitchen can take 2 to 4 weeks. We provide a detailed timeline and milestone schedule before starting." },
      { question: "Do you offer free estimates for remodeling projects?", answer: "Yes. We visit the site, assess the scope and provide a written estimate at no cost. There is no obligation to proceed after the estimate." },
    ],
  },
  "deck-stairs": {
    title: "Deck Staining and Repair in New England",
    description:
      "Professional deck staining, sealing and repair across New England. Built to withstand harsh winters. Free estimate.",
    keywords: "deck staining New England, deck repair New England, deck sealing New England, outdoor deck refinishing MA",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Deck and Stairs", url: "https://tonyspaintingmv.com/services/deck-stairs" },
    ],
    faqs: [
      { question: "How much does deck staining cost in New England?", answer: "Deck staining costs vary based on the size and condition of the deck. Most residential decks range from $800 to $3,000. We provide free on-site estimates before any work begins." },
      { question: "How long does deck stain last in New England?", answer: "With proper preparation and a quality stain, deck finish typically lasts 2 to 4 years in New England's climate. Power washing and light sanding before each coat extends the life significantly." },
      { question: "Do you repair deck boards before staining?", answer: "Yes. We inspect every board before staining and replace any that are cracked, warped or unsafe. Repairs are quoted separately and can be included in the same project." },
    ],
  },
  flooring: {
    title: "Flooring Installation in New England",
    description:
      "Hardwood, vinyl and LVP flooring installation across New England. Historic and modern homes. Free estimate.",
    keywords: "flooring installation New England, hardwood floors New England, vinyl flooring New England, floor refinishing MA",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Flooring", url: "https://tonyspaintingmv.com/services/flooring" },
    ],
    faqs: [
      { question: "What types of flooring do you install in Martha's Vineyard?", answer: "We install hardwood, engineered hardwood and luxury vinyl plank. We also refinish and stain existing hardwood floors. We work on both new construction and renovation projects." },
      { question: "How long does hardwood floor installation take?", answer: "A typical room takes one to two days. A full home floor installation usually takes three to five days depending on square footage and subfloor condition." },
      { question: "Do you refinish existing hardwood floors?", answer: "Yes. We sand, stain and apply multiple finish coats. Most refinishing projects are completed in two to three days and can transform worn floors without full replacement." },
    ],
  },
  "ceramic-tile": {
    title: "Ceramic Tile Installation in New England",
    description:
      "Precision tile work for bathrooms, kitchens and floors across New England. Clean lines, lasting results. Free estimate.",
    keywords: "tile installation New England, ceramic tile New England, bathroom tile New England, kitchen backsplash MA",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Ceramic Tile", url: "https://tonyspaintingmv.com/services/ceramic-tile" },
    ],
    faqs: [
      { question: "Do you install tile in bathrooms and kitchens in Martha's Vineyard?", answer: "Yes. We handle floor tile, wall tile, shower surrounds, kitchen backsplashes and entryway installations throughout Martha's Vineyard and Cape Cod." },
      { question: "How long does a tile installation project take?", answer: "A bathroom floor typically takes one day. A full bathroom tile with walls and shower takes two to four days. Kitchen backsplash projects are usually done in one day." },
    ],
  },
  plastering: {
    title: "Plastering and Skim Coating in New England",
    description:
      "Crack repair, skim coating and plaster restoration across New England. Smooth walls, done properly. Free estimate.",
    keywords: "plastering New England, skim coating New England, plaster repair New England, drywall patching MA",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Plastering", url: "https://tonyspaintingmv.com/services/plastering" },
    ],
    faqs: [
      { question: "Do you repair plaster walls in historic homes?", answer: "Yes. We have extensive experience with older New England homes that have original plaster walls. We match textures and finish surfaces ready for paint without visible patches." },
      { question: "What is skim coating and when do I need it?", answer: "Skim coating is a thin layer of plaster applied over damaged or uneven walls to create a smooth, paint-ready surface. It is ideal when walls have extensive cracking, previous texture removal or multiple layers of old paint." },
    ],
  },
  carpentry: {
    title: "Carpentry Services in New England",
    description:
      "Trim, moldings, built-ins and structural wood repairs across New England. Free estimate.",
    keywords: "carpentry New England, trim moldings New England, general carpentry New England, built-in shelving MA",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Carpentry", url: "https://tonyspaintingmv.com/services/carpentry" },
    ],
    faqs: [
      { question: "Do you install crown molding and trim in Martha's Vineyard?", answer: "Yes. We install interior trim, baseboards, crown molding, door casings and custom built-ins throughout Martha's Vineyard and Cape Cod." },
      { question: "Can you match existing trim on historic homes?", answer: "Yes. We source matching profiles and work carefully to blend new trim with existing millwork on historic homes. We have worked on a number of period properties on Martha's Vineyard." },
    ],
  },
  fence: {
    title: "Fence Installation and Repair in New England",
    description:
      "Wood and vinyl fence installation and repair across New England. Built to last through harsh winters. Free estimate.",
    keywords: "fence installation New England, fence repair New England, wood vinyl fence New England, fence contractor MA",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Fence", url: "https://tonyspaintingmv.com/services/fence" },
    ],
    faqs: [
      { question: "What types of fence do you install in New England?", answer: "We install wood, vinyl and cedar fences. We also repair existing fences including post replacement, board repair and gate adjustment." },
      { question: "How long does fence installation take?", answer: "A standard residential fence installation takes one to two days. Larger projects or those requiring post-hole digging in rocky soil may take longer. We provide a timeline with your estimate." },
    ],
  },
  countertop: {
    title: "Countertop Installation in New England",
    description:
      "Kitchen and bathroom countertop installation across New England. Precise measurement, clean finish. Free estimate.",
    keywords: "countertop installation New England, kitchen countertop New England, bathroom vanity countertop New England",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Countertop", url: "https://tonyspaintingmv.com/services/countertop" },
    ],
    faqs: [
      { question: "Do you remove and dispose of old countertops?", answer: "Yes. Old countertop removal and disposal is included in our countertop installation service. We handle the entire process from removal to final installation and cleanup." },
      { question: "What countertop materials do you install?", answer: "We install laminate, solid surface, butcher block and prefabricated stone countertops. For custom stone such as granite or quartz, we coordinate with local fabricators." },
    ],
  },
  "construction-cleaning": {
    title: "Construction Cleaning Services in New England",
    description:
      "Post-construction cleanup for residential and commercial spaces across New England. Ready to use from day one. Free estimate.",
    keywords: "construction cleaning New England, post construction cleanup New England, construction cleaning New England",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Construction Cleaning", url: "https://tonyspaintingmv.com/services/construction-cleaning" },
    ],
    faqs: [
      { question: "What is included in post-construction cleaning?", answer: "We remove dust, debris, paint splatter and adhesive residue from all surfaces. We clean windows, wipe down cabinets, clean floors and do a final walk-through to ensure the space is move-in ready." },
      { question: "How soon after construction can you clean?", answer: "We can schedule within one to two days after construction is complete. For large projects, we can stage the cleaning as work is finished in each area." },
    ],
  },
  handyman: {
    title: "Handyman Services in New England",
    description:
      "Deck repair, fence, stairs and general repairs across New England. Small jobs done right. Free estimate.",
    keywords: "handyman New England, handyman services New England, property repairs New England, general repairs MA",
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Handyman Services", url: "https://tonyspaintingmv.com/services/handyman" },
    ],
    faqs: [
      { question: "What types of handyman services do you offer?", answer: "We handle deck repair, fence repair, stair repair, door and window trim, construction cleaning and general property repairs throughout Martha's Vineyard and Cape Cod." },
      { question: "Do you take on small jobs or only large projects?", answer: "We take both. No job is too small. Many of our clients start with a small repair and return for larger painting or remodeling projects." },
    ],
  },
};


interface ServiceData {
  slug: string;
  name: string;
  heroTitle?: string;
  description: string;
  includes: string[];
}

export const SERVICE_SLUGS = () => Object.keys(SERVICES);

const SERVICES: Record<string, ServiceData> = {
  "interior-painting": {
    slug: "interior-painting",
    name: "Interior Painting",
    heroTitle: "Interior Painting in Martha's Vineyard",
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
    heroTitle: "Exterior Painting in Martha's Vineyard",
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
    heroTitle: "Remodeling in Martha's Vineyard",
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

  const seo = slug ? SEO_BY_SLUG[slug] : undefined;

  return (
    <PageLayout>
      {seo && (
        <SEO
          title={seo.title}
          description={seo.description}
          canonical={`/services/${slug}`}
          keywords={seo.keywords}
          schema={seo.schema}
          breadcrumbs={seo.breadcrumbs}
          faqs={seo.faqs}
        />
      )}
      <InnerHero
        variant="image"
        title={service.heroTitle || service.name}
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
          {(() => {
            const gallery: Record<string, string[]> = {
              "interior-painting": ["/images/interior-04.jpg", "/images/interior-03.jpg", "/images/interior-05.jpg", "/images/interior-01.jpg", "/images/interior-02.jpg", "/images/project-05.jpg"],
              "exterior-painting": ["/images/project-02.jpg", "/images/project-12.jpg", "/images/project-14.jpg", "/images/project-13.jpg", "/images/project-03.jpg", "/images/project-01.jpg"],
              "remodeling": ["/images/remodeling-02.jpg", "/images/flooring-01.jpg", "/images/project-04.jpg", "/images/project-16.jpg", "/images/project-15.jpg"],
              "flooring": ["/images/flooring-01.jpg", "/images/flooring-03.jpg", "/images/flooring-02.jpg"],
              "countertop": ["/images/interior-02.jpg", "/images/interior-01.jpg", "/images/interior-04.jpg", "/images/project-16.jpg"],
              "handyman": ["/images/project-08.jpg", "/images/project-07.jpg", "/images/project-09.jpg", "/images/project-11.jpg"],
              "deck-stairs": [deck01.url, deck02.url, deck03.url, deck04.url, deck05.url, deck06.url, deck07.url, deck08.url]
            };
            const images = service.slug ? (gallery[service.slug] || []) : [];
            return (
              <>
                {/* Mobile: one-photo slide carousel */}
                <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="aspect-[4/5] w-[82%] sm:w-[70%] shrink-0 snap-center bg-background overflow-hidden rounded-sm"
                    >
                      <img src={src} alt={`Tony's ${service.name} project detail`} className="w-full h-full object-cover" loading="lazy" decoding="async" style={{ objectPosition: "center" }} />
                    </div>
                  ))}
                </div>
                {/* Desktop: 3-column grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-4 md:gap-6">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="aspect-[4/5] bg-background overflow-hidden"
                    >
                      <img src={src} alt={`Tony's ${service.name} project detail`} className="w-full h-full object-cover" loading="lazy" decoding="async" style={{ objectPosition: "center" }} />
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
          {service.slug === "deck-stairs" && (
            <div className="mt-8">
              <Link
                to="/portfolio/deck-restoration"
                className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-dark transition-colors"
              >
                View the full Deck Restoration project
              </Link>
            </div>
          )}
        </div>
      </section>

      {service.slug === "deck-stairs" && (
        <section className="bg-background">
          <div className="container py-16 md:py-24">
            <div className="max-w-2xl mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Before and After</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
                From weathered to warm.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                The same deck, before and after. Sanded, cleaned and finished with a rich
                protective stain. Drag the handle to see the change.
              </p>
            </div>
            <BeforeAfter
              beforeSrc={deck07.url}
              afterSrc={deck06.url}
              beforeAlt="Deck before restoration, weathered gray boards and benches"
              afterAlt="Deck after restoration, rich brown stained boards and benches"
              className="max-w-4xl"
            />
          </div>
        </section>
      )}

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
            <Link to="/#contact">Request a Consultation</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
