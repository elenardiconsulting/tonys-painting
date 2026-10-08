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

const SEO_BY_SLUG: Record<string, { title: string; description: string; h1: string; h2: string; keywords: string; schema?: object; breadcrumbs?: { name: string; url: string }[]; faqs?: { question: string; answer: string }[] }> = {
  "interior-painting": {
    title: "Interior Painting Services in Massachusetts | Tony's Painting",
    description:
      "Professional interior painting for homes in Martha's Vineyard, Cape Cod and the South Shore. Surface prep, clean work and a final walkthrough included. Free estimates. Call 508-982-9675.",
    h1: "Interior painting services for Massachusetts homeowners.",
    h2: "What our interior painting work includes.",
    keywords:
      "interior painting Martha's Vineyard MA, interior painters Cape Cod, house painters Martha's Vineyard, interior painting Edgartown, interior painting Falmouth MA",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Interior Painting",
      provider: { "@type": "LocalBusiness", name: "Tony's Painting and Remodeling", telephone: "+15089829675" },
      areaServed: "Massachusetts, USA",
      description: "Interior painting for residential and commercial spaces across Massachusetts. Walls, ceilings, trim, accent walls and more.",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Interior Painting", url: "https://tonyspaintingmv.com/services/interior-painting" },
    ],
    faqs: [
      { question: "How much does interior painting cost in Massachusetts?", answer: "Interior painting costs vary based on room size, ceiling height and number of coats. Most rooms range from $300 to $800. We provide free estimates with no obligation." },
      { question: "How long does an interior painting project take?", answer: "A single room typically takes one day. A full home interior takes 3 to 7 days depending on size and complexity. We provide a timeline before starting." },
      { question: "Do you move furniture before painting?", answer: "Yes. Our team moves and protects all furniture before starting. We cover floors and surfaces and move everything back when the job is done." },
      { question: "What paint brands do you use for interior projects?", answer: "We use Benjamin Moore and Sherwin-Williams premium interior paints. We also accept customer-supplied paint if you have a specific product in mind." },
    ],
  },
  "exterior-painting": {
    title: "Exterior House Painting in Massachusetts | Tony's Painting",
    description:
      "Exterior painting for homes in Martha's Vineyard, Cape Cod and the South Shore. Proper prep, New England–rated coatings and clean results. Free estimates. Call 508-982-9675.",
    h1: "Exterior house painting in Massachusetts.",
    h2: "How we approach exterior painting projects.",
    keywords:
      "exterior painting Martha's Vineyard MA, exterior painters Cape Cod, house painting Martha's Vineyard, exterior painting Edgartown, exterior painting Falmouth MA",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Exterior Painting",
      provider: { "@type": "LocalBusiness", name: "Tony's Painting and Remodeling", telephone: "+15089829675" },
      areaServed: "Massachusetts, USA",
      description: "Exterior painting with premium paints built for Massachusetts weather. Siding, trim, decks, fences and more.",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
    },
    breadcrumbs: [
      { name: "Home", url: "https://tonyspaintingmv.com/" },
      { name: "Services", url: "https://tonyspaintingmv.com/services" },
      { name: "Exterior Painting", url: "https://tonyspaintingmv.com/services/exterior-painting" },
    ],
    faqs: [
      { question: "How much does exterior painting cost in Massachusetts?", answer: "Exterior painting costs depend on the size of the home, siding material and condition. Most homes range from $2,500 to $8,000. We provide free on-site estimates." },
      { question: "What is the best time of year to paint exterior in New England?", answer: "Late spring through early fall is ideal. We paint when temperatures are consistently above 50 degrees Fahrenheit and conditions are dry. We work within safe weather windows year-round." },
      { question: "How long does exterior paint last in New England?", answer: "With proper preparation and premium paint, exterior paint lasts 7 to 10 years in New England. Proper surface prep is the most important factor in paint longevity." },
      { question: "Do you pressure wash before exterior painting?", answer: "Yes. Power washing and surface preparation are included in every exterior project. Clean, properly prepped surfaces are essential for paint to bond and last." },
    ],
  },
  remodeling: {
    title: "Home Remodeling Contractor in Massachusetts | Tony's Painting",
    description:
      "Kitchen, bathroom and living space remodeling for homes in Martha's Vineyard, Cape Cod and the South Shore. One crew, multiple trades. Free estimates. Call 508-982-9675.",
    h1: "Home remodeling services in Massachusetts.",
    h2: "What we handle on remodeling projects.",
    keywords:
      "home remodeling Martha's Vineyard MA, remodeling contractor Cape Cod, kitchen bathroom remodel Martha's Vineyard, flooring tile Martha's Vineyard MA",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Home Remodeling",
      provider: { "@type": "LocalBusiness", name: "Tony's Painting and Remodeling", telephone: "+15089829675" },
      areaServed: "Massachusetts, USA",
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
    title: "Deck Staining & Repair in Massachusetts | Tony's Painting",
    description:
      "Deck and stair cleaning, sanding, staining and repair for homes in Martha's Vineyard, Cape Cod and the South Shore. Free estimates. Call 508-982-9675.",
    h1: "Deck and stair work in Massachusetts.",
    h2: "What we check and do before we stain.",
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
    title: "Flooring Installation & Refinishing in Massachusetts | Tony's",
    description:
      "Hardwood, vinyl plank and engineered wood flooring for homes in Martha's Vineyard, Cape Cod and the South Shore. Subfloor assessment included. Free estimates. Call 508-982-9675.",
    h1: "Flooring installation and refinishing in Massachusetts.",
    h2: "What goes into a flooring project.",
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
    title: "Ceramic Tile Installation in Massachusetts | Tony's Painting",
    description:
      "Bathroom and kitchen tile installation for homes in Martha's Vineyard, Cape Cod and the South Shore. Level lines, sealed grout. Free estimates. Call 508-982-9675.",
    h1: "Ceramic tile installation in Massachusetts.",
    h2: "How we set tile on every project.",
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
    title: "Plastering & Skim Coating in Massachusetts | Tony's Painting",
    description:
      "Plaster repair, skim coating and drywall patching for homes in Martha's Vineyard, Cape Cod and the South Shore. Smooth finish ready for paint. Free estimates. Call 508-982-9675.",
    h1: "Plastering and wall repair in Massachusetts.",
    h2: "What we address before we leave the wall.",
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
    title: "General Carpentry Services in Massachusetts | Tony's Painting",
    description:
      "Trim, moldings, built-ins and wood repairs for homes in Martha's Vineyard, Cape Cod and the South Shore. Proper cuts and fastening. Free estimates. Call 508-982-9675.",
    h1: "General carpentry for Massachusetts homeowners.",
    h2: "What we build and repair.",
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
    title: "Fence Installation & Repair in Massachusetts | Tony's Painting",
    description:
      "Wood and vinyl fence installation and repair for homes in Martha's Vineyard, Cape Cod and the South Shore. Properly set posts, level finish. Free estimates. Call 508-982-9675.",
    h1: "Fence installation and repair in Massachusetts.",
    h2: "How we build and repair fences.",
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
    title: "Countertop Installation in Massachusetts | Tony's Painting",
    description:
      "Kitchen and bathroom countertop installation for homes in Martha's Vineyard, Cape Cod and the South Shore. Accurate measurements, clean finish. Free estimates. Call 508-982-9675.",
    h1: "Countertop installation in Massachusetts.",
    h2: "How we measure and install countertops.",
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
    title: "Post-Construction Cleaning in Massachusetts | Tony's Painting",
    description:
      "Post-construction cleaning for residential spaces in Martha's Vineyard, Cape Cod and the South Shore. We get the space ready to use. Free estimates. Call 508-982-9675.",
    h1: "Post-construction cleaning in Massachusetts.",
    h2: "What a post-construction clean covers.",
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
    title: "Handyman Services in Massachusetts | Tony's Painting & Remodeling",
    description:
      "Repairs, fixes and property upkeep for homeowners in Martha's Vineyard, Cape Cod and the South Shore. Licensed and insured. Call 508-982-9675.",
    h1: "Handyman services for Massachusetts homeowners.",
    h2: "What our handyman crew takes on.",
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
      "Whether you're repainting a single room or the entire house, we start with proper surface prep — filling holes, sanding rough spots and priming where the finish coat needs a solid base. We protect your floors and furniture before we pick up a brush, keep the work area clean throughout and do a final walkthrough with you before we leave.",
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
      "The condition of your siding and trim tells you a lot about how a paint job will hold up. We inspect every surface before we start, scrape and sand areas where paint is peeling, and prime bare wood before applying the finish coat. We work around the weather and use exterior paints formulated for New England's climate — cold winters, humid summers and coastal salt air included.",
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
      "Sometimes a fresh coat of paint is just the beginning. Our remodeling crew handles flooring installation and refinishing, tile work, plastering, carpentry and related trades — so you don't need to manage multiple contractors or coordinate schedules across a project. We've completed kitchen and bathroom updates and larger living space renovations for homeowners in Martha's Vineyard, Cape Cod and the South Shore.",
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
      "Small jobs matter. We handle repairs, fixes and general property upkeep that don't fit neatly into a single trade — deck boards, door hardware, minor carpentry, cleanup after a contractor and similar work. If something's been on your list and you're not sure who to call, we can take a look and give you a straight answer.",
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
    description: "Decks and exterior stairs take more abuse than almost anything else on a house. Before we sand or stain anything, we check for soft spots, rot and loose fasteners — because a good finish on structurally sound wood is what makes the project last. We clean the surface, let it dry properly and apply a stain or sealer suited to the wood type and exposure.",
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
    description: "Construction leaves behind fine dust, adhesive residue, caulk smears and debris that standard cleaning won't address. We do a complete post-construction clean for residential spaces — surfaces, fixtures, floors and windows — so the space is ready to use when we're done.",
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
    description: "Trim, molding, built-ins and structural wood repairs that are cut to fit and fastened properly. Good carpentry is what separates a renovation that holds together from one that looks rushed six months later. We do the measuring twice.",
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
    description: "We install and refinish hardwood, vinyl plank, laminate and engineered wood floors. Before we start, we assess the subfloor for levelness and moisture issues — because the finish coat is only as good as what's underneath. Sanding is done evenly across the whole floor, not just the visible wear spots.",
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
    description: "Tile is one of those finishes where being off by an eighth of an inch shows. We lay out the pattern before we set anything, use a flat, properly prepared substrate and apply grout that's sealed against moisture. Bathrooms, kitchens, mudrooms and entryways.",
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
    description: "A fence that lists or has loose posts isn't doing its job. We set posts at the right depth for the soil conditions, make sure the fence is level and plumb, and finish the wood or vinyl to match the property. Repairs and full installations.",
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
    description: "Cracks, holes and uneven walls are common in older New England homes — and they need to be addressed properly before you paint over them. We repair plaster and drywall, apply skim coats where the wall needs to be evened out and sand to a consistent surface. The goal is a wall that looks right under any lighting.",
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
    description: "A countertop is only as level and tight as the measurement and installation that put it there. We take accurate field measurements, fit the pieces to the actual cabinet run and finish the edges and seams cleanly. Kitchen and bathroom surfaces.",
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
        title={seo?.h1 || service.heroTitle || service.name}
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
              {seo?.h2}
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
                      <img src={src} alt={`Tony's ${service.name} project detail`} className="w-full h-full object-cover" loading="lazy" decoding="async" width={800} height={1000} style={{ objectPosition: "center" }} />
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
                      <img src={src} alt={`Tony's ${service.name} project detail`} className="w-full h-full object-cover" loading="lazy" decoding="async" width={800} height={1000} style={{ objectPosition: "center" }} />
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
            Interested in this service?
          </h2>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
          >
            <Link to="/#contact">Request a Free Estimate</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
