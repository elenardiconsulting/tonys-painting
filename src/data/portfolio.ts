import ri01 from "@/assets/portfolio/residential-interior/residential-interior-painting-01.webp.asset.json";
import ri02 from "@/assets/portfolio/residential-interior/residential-interior-painting-02.webp.asset.json";
import ri03 from "@/assets/portfolio/residential-interior/residential-interior-painting-03.webp.asset.json";
import ri04 from "@/assets/portfolio/residential-interior/residential-interior-painting-04.webp.asset.json";
import ri05 from "@/assets/portfolio/residential-interior/residential-interior-painting-05.webp.asset.json";
import ri06 from "@/assets/portfolio/residential-interior/residential-interior-painting-06.webp.asset.json";
import ri07 from "@/assets/portfolio/residential-interior/residential-interior-painting-07.webp.asset.json";
import ri08 from "@/assets/portfolio/residential-interior/residential-interior-painting-08.webp.asset.json";
import ri09 from "@/assets/portfolio/residential-interior/residential-interior-painting-09.webp.asset.json";
import ri10 from "@/assets/portfolio/residential-interior/residential-interior-painting-10.webp.asset.json";
import ri11 from "@/assets/portfolio/residential-interior/residential-interior-painting-11.webp.asset.json";
import ri12 from "@/assets/portfolio/residential-interior/residential-interior-painting-12.webp.asset.json";
import ri13 from "@/assets/portfolio/residential-interior/residential-interior-painting-13.webp.asset.json";

import cs01 from "@/assets/portfolio/commercial-school/commercial-school-painting-01.webp.asset.json";
import cs02 from "@/assets/portfolio/commercial-school/commercial-school-painting-02.webp.asset.json";
import cs03 from "@/assets/portfolio/commercial-school/commercial-school-painting-03.webp.asset.json";
import cs04 from "@/assets/portfolio/commercial-school/commercial-school-painting-04.webp.asset.json";
import cs05 from "@/assets/portfolio/commercial-school/commercial-school-painting-05.webp.asset.json";
import cs06 from "@/assets/portfolio/commercial-school/commercial-school-painting-06.webp.asset.json";
import cs07 from "@/assets/portfolio/commercial-school/commercial-school-painting-07.webp.asset.json";

import dr2896 from "@/assets/deck-IMG_2896.jpg.asset.json";
import dr2900 from "@/assets/deck-IMG_2900.jpg.asset.json";
import dr2904 from "@/assets/deck-IMG_2904.jpg.asset.json";
import dr2905 from "@/assets/deck-IMG_2905.jpg.asset.json";
import dr2913 from "@/assets/deck-IMG_2913.jpg.asset.json";
import dr2914 from "@/assets/deck-IMG_2914.jpg.asset.json";
import dr2916 from "@/assets/deck-IMG_2916.jpg.asset.json";

export type PortfolioCategory = "Interior" | "Exterior" | "Remodeling" | "Commercial";

export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface PortfolioBeforeAfter {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

export interface PortfolioCollection {
  slug: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  location: string;
  description?: string;
  cover: string;
  images: PortfolioImage[];
  featured?: boolean;
  beforeAfter?: PortfolioBeforeAfter;
  details?: {
    heading: string;
    paragraphs: string[];
    serviceLabel: string;
    serviceTo: string;
  };
}

const RESIDENTIAL_INTERIOR_IMAGES: PortfolioImage[] = [
  { src: ri01.url, alt: "Vaulted wood ceiling bedroom with arched window after interior repaint" },
  { src: ri02.url, alt: "Open bedroom with pine vaulted ceiling, skylight and freshly painted walls" },
  { src: ri03.url, alt: "Primary bedroom with arched window and clean neutral wall finish" },
  { src: ri04.url, alt: "Bay window sitting room with natural wood ceiling and painted trim" },
  { src: ri05.url, alt: "Hallway with crisp white trim and freshly painted neutral walls" },
  { src: ri06.url, alt: "Bedroom entry with painted walls, trim and hardwood floors" },
  { src: ri07.url, alt: "Bright bedroom with large window and fresh interior paint" },
  { src: ri08.url, alt: "Bedroom corner with smooth wall finish and white baseboards" },
  { src: ri09.url, alt: "Upstairs landing with painted walls and clean white trim" },
  { src: ri10.url, alt: "Primary bathroom with soaking tub and refreshed painted walls" },
  { src: ri11.url, alt: "Primary bathroom with corner tub, bright walls and painted trim" },
  { src: ri12.url, alt: "Long hallway with even neutral paint and white trim" },
  { src: ri13.url, alt: "Window lined hallway with freshly painted walls and trim" },
];

const COMMERCIAL_SCHOOL_IMAGES: PortfolioImage[] = [
  { src: cs01.url, alt: "School hallway with navy blue accent walls and painted door frames" },
  { src: cs02.url, alt: "Large classroom with fresh neutral walls and navy blue trim" },
  { src: cs03.url, alt: "School entry area with skylight, light blue walls and navy window trim" },
  { src: cs04.url, alt: "Classroom with painted walls, blue accent wall and interior window" },
  { src: cs05.url, alt: "Classroom with clean neutral walls and dark baseboards" },
  { src: cs06.url, alt: "Classroom corner with smooth wall finish and dark baseboards" },
  { src: cs07.url, alt: "Interior window with navy painted frame between classrooms" },
];

const KITCHEN_IMAGES: PortfolioImage[] = [
  { src: "/images/interior-04.jpg", alt: "Luxury kitchen with painted cabinetry, Martha's Vineyard" },
  { src: "/images/interior-05.jpg", alt: "White kitchen interior with painted cabinets and trim, Massachusetts" },
  { src: "/images/interior-01.jpg", alt: "Classic kitchen cabinetry finished in a smooth painted coat, Boston area" },
  { src: "/images/interior-02.jpg", alt: "Painted kitchen island detail with durable finish, Martha's Vineyard" },
  { src: "/images/flooring-02.jpg", alt: "Built in cabinetry with painted shelving and trim, Boston area" },
];

const LIVING_IMAGES: PortfolioImage[] = [
  { src: "/images/interior-03.jpg", alt: "Open plan living space with fresh wall color, Martha's Vineyard" },
  { src: "/images/project-05.jpg", alt: "Modern interior living room with clean paint and crisp trim, Massachusetts" },
];

const EXTERIOR_IMAGES: PortfolioImage[] = [
  { src: "/images/project-02.jpg", alt: "Coastal residence exterior repaint, Massachusetts" },
  { src: "/images/project-12.jpg", alt: "Colonial home exterior restoration and repaint, Massachusetts" },
  { src: "/images/project-06.jpg", alt: "Shingle style residence with refreshed exterior finish, Massachusetts" },
  { src: "/images/project-13.jpg", alt: "Classic colonial house with new exterior paint, Massachusetts" },
  { src: "/images/project-14.jpg", alt: "Wood siding project with protective exterior coating, Massachusetts" },
];

const DECK_RESTORATION_IMAGES: PortfolioImage[] = [
  { src: dr2904.url, alt: "Restored deck with rich brown stained boards and built in benches" },
  { src: dr2914.url, alt: "Freshly stained deck boards running toward the water view railing" },
  { src: dr2900.url, alt: "Deck bench and railing finished with a warm protective stain" },
  { src: dr2916.url, alt: "Wide view of the restored deck with clean stained planks and steps" },
  { src: dr2905.url, alt: "Corner of the restored deck with stained bench seating and railing" },
  { src: dr2913.url, alt: "Deck stairs and landing sealed with a rich brown finish" },
  { src: dr2896.url, alt: "Deck before restoration, weathered gray boards and benches" },
];

const DECK_IMAGES: PortfolioImage[] = [
  { src: "/images/project-08.jpg", alt: "Waterfront deck with fresh finish, Massachusetts" },
  { src: "/images/project-07.jpg", alt: "Outdoor deck build with railing and stairs, Massachusetts" },
  { src: "/images/project-09.jpg", alt: "Cedar deck refinished and sealed, Massachusetts" },
];

const REMODEL_IMAGES: PortfolioImage[] = [
  { src: "/images/remodeling-02.jpg", alt: "Full kitchen remodel with new cabinets and counters, Boston area" },
  { src: "/images/project-16.jpg", alt: "Kitchen remodel with updated layout and finishes, Massachusetts" },
  { src: "/images/project-04.jpg", alt: "Master bath remodel with tile and new fixtures, Massachusetts" },
  { src: "/images/project-15.jpg", alt: "Custom closet remodel with built in storage, Massachusetts" },
];

const FLOOR_IMAGES: PortfolioImage[] = [
  { src: "/images/flooring-01.jpg", alt: "Hardwood floor refinishing with warm stain, Massachusetts" },
  { src: "/images/flooring-03.jpg", alt: "Dark hardwood floor restoration with sealed finish, Massachusetts" },
];

export const COLLECTIONS: PortfolioCollection[] = [
  {
    slug: "residential-interior-martha-s-vineyard",
    title: "Residential Interior Painting",
    category: "Interior",
    categoryLabel: "Interior Painting",
    location: "Martha's Vineyard, MA",
    description:
      "Full interior repaint of a residence with vaulted wood ceilings, bay windows and a primary suite. Walls, trim and doors refreshed with a clean, bright finish that lets the natural wood stand out.",
    cover: ri01.url,
    images: RESIDENTIAL_INTERIOR_IMAGES,
    featured: true,
    details: {
      heading: "Interior painting on Martha's Vineyard, done room by room.",
      paragraphs: [
        "This Martha's Vineyard home came to us with vaulted pine ceilings, arched windows and a primary suite that had not been painted in years. The owners wanted the natural wood to stay the focus, so every wall, ceiling edge and piece of trim was finished in a clean neutral that lets the ceilings and window frames stand out instead of competing with them.",
        "Interior work in an island home follows a set order. We start by protecting floors and furniture, then fill nail holes, sand rough spots and caulk the gaps between trim and wall. Primer goes on any patched area so the final color reads evenly. Walls get two coats of a washable matte finish, and trim, doors and baseboards get a durable satin enamel that holds up to daily use and salt air.",
        "Projects like this usually run one to two weeks depending on the number of rooms and the amount of trim. We work around your schedule, keep each room sealed while it is in progress and leave the space clean at the end of every day.",
        "If you own a home on Martha's Vineyard, in Edgartown, Chilmark, West Tisbury or Vineyard Haven and want the same kind of finish, our interior painting team can walk the house with you and put together a room-by-room estimate at no cost.",
      ],
      serviceLabel: "Interior Painting",
      serviceTo: "/services/interior-painting",
    },
  },
  {
    slug: "commercial-school-painting",
    title: "School Interior Painting",
    category: "Commercial",
    categoryLabel: "Commercial Painting",
    location: "Massachusetts",
    description:
      "Full interior painting for a new school building. Classrooms, hallways and common areas finished with clean neutral walls and navy blue accents and trim.",
    cover: cs01.url,
    images: COMMERCIAL_SCHOOL_IMAGES,
    details: {
      heading: "Commercial interior painting for schools and public buildings.",
      paragraphs: [
        "This project covered the full interior of a new school building in Massachusetts: classrooms, hallways, entry areas and common spaces. The design called for clean neutral walls paired with navy blue accent walls, door frames and window trim, so the finished rooms feel calm and organized while still having a clear identity.",
        "Commercial painting is a different job from residential work. Surfaces are larger, schedules are tighter and the paint has to stand up to constant traffic, scuffs and cleaning. We use low-VOC commercial coatings rated for high-traffic interiors, apply them with a spray-and-back-roll method for an even finish on big wall runs, and cut sharp lines where accent colors meet the base color.",
        "We coordinate with the general contractor and the building schedule so painting lands in the right window, after drywall and before flooring and fixtures. Crews work in phases so one wing can be finished and handed off while the next is in progress.",
        "Tony's Painting & Remodeling takes on commercial interior projects across Massachusetts, including schools, offices, retail spaces and multi-unit buildings. If you are planning a new build or a repaint of an existing facility, we can review the scope and give you a detailed quote.",
      ],
      serviceLabel: "Interior Painting",
      serviceTo: "/services/interior-painting",
    },
  },
  {
    slug: "kitchens-and-cabinetry",
    title: "Kitchens and Cabinetry",
    category: "Interior",
    categoryLabel: "Interior Painting",
    location: "Martha's Vineyard and Boston Area",
    description:
      "Painted cabinetry, islands and built-ins finished with a smooth, durable coat that holds up to daily use.",
    cover: KITCHEN_IMAGES[0].src,
    images: KITCHEN_IMAGES,
    details: {
      heading: "Painted kitchen cabinets that hold up to real use.",
      paragraphs: [
        "These kitchens on Martha's Vineyard and in the Boston area all had solid cabinetry that the owners did not want to replace. Painting the existing cabinets, islands and built-ins gave each kitchen a fresh look at a fraction of the cost of new cabinetry, with a smooth factory-style finish that stands up to grease, moisture and daily wear.",
        "Cabinet painting is mostly preparation. Doors and drawer fronts come off and are labeled. Every surface is degreased, scuff-sanded and primed with a bonding primer made for slick finishes. We then spray a hard-curing enamel in thin coats, which avoids brush marks and gives the durable shell that kitchen cabinets need. Hardware goes back on only after the finish has fully cured.",
        "A typical kitchen takes five to eight working days from removal to reinstall. We set up a clean spray area and keep the kitchen usable for as much of the project as possible.",
        "If your cabinets are structurally sound but dated, painting is usually the smartest move. Our interior painting team handles cabinet refinishing across Martha's Vineyard, Cape Cod and the South Shore, and we are happy to look at your kitchen and recommend the right approach.",
      ],
      serviceLabel: "Interior Painting",
      serviceTo: "/services/interior-painting",
    },
  },
  {
    slug: "interior-living-spaces",
    title: "Interior Living Spaces",
    category: "Interior",
    categoryLabel: "Interior Painting",
    location: "Martha's Vineyard and Massachusetts",
    description: "Open living areas refreshed with clean wall color and crisp trim.",
    cover: LIVING_IMAGES[0].src,
    images: LIVING_IMAGES,
    details: {
      heading: "Living rooms and open floor plans with clean, even color.",
      paragraphs: [
        "Open living spaces are the rooms people see first and spend the most time in, so the finish has to be right. These projects on Martha's Vineyard and across Massachusetts involved large connected areas where walls flow from living room to dining room to kitchen without a natural break, which means color and sheen have to be consistent across the whole space.",
        "For big open rooms we pay extra attention to lighting. Natural light from large windows shows every roller mark and patch, so we skim and sand problem areas before priming and use a consistent rolling pattern across each wall. Trim, crown molding and baseboards get a satin enamel that frames the wall color cleanly.",
        "We also help with color selection. Many homeowners want a warm neutral that works with hardwood floors and coastal light. We can sample two or three options on the wall before committing to the full job.",
        "Living space repaints are usually finished in three to five days. If your home on Martha's Vineyard, Cape Cod or the South Shore needs a refresh, our interior painting team can give you a free in-home estimate.",
      ],
      serviceLabel: "Interior Painting",
      serviceTo: "/services/interior-painting",
    },
  },
  {
    slug: "exterior-painting-and-siding",
    title: "Exterior Painting and Siding",
    category: "Exterior",
    categoryLabel: "Exterior Painting",
    location: "Massachusetts",
    description:
      "Coastal, colonial and shingle style homes protected with exterior paint and siding work built for Massachusetts weather.",
    cover: EXTERIOR_IMAGES[0].src,
    images: EXTERIOR_IMAGES,
    details: {
      heading: "Exterior painting built for the Massachusetts coast.",
      paragraphs: [
        "Coastal, colonial and shingle style homes across Massachusetts each need a different exterior approach, but they all face the same conditions: cold winters, humid summers, salt air and strong sun. These projects show what a properly prepared exterior repaint looks like, from a classic white colonial to a shingle residence with a refreshed natural finish.",
        "Exterior work starts with washing the house to remove chalking, mildew and salt. Loose paint is scraped and sanded, bare wood is primed, rotted boards are replaced and all gaps are caulked. Only then do we apply two coats of a premium exterior paint or solid stain, using products rated for coastal exposure. Siding repair is part of the job when it is needed, so the finish goes on sound material.",
        "Timing matters in Massachusetts. We schedule exterior work between late spring and early fall when temperatures and humidity allow the paint to cure properly. Most homes take one to two weeks.",
        "If your home's exterior is fading, peeling or showing bare wood, waiting makes the repair bigger. Our exterior painting team serves Martha's Vineyard, Cape Cod, Falmouth, Bourne, Sandwich and the South Shore. Request a free exterior inspection and estimate.",
      ],
      serviceLabel: "Exterior Painting",
      serviceTo: "/services/exterior-painting",
    },
  },
  {
    slug: "deck-restoration",
    title: "Deck Restoration",
    category: "Exterior",
    categoryLabel: "Decks",
    location: "Massachusetts",
    cover: dr2904.url,
    images: DECK_RESTORATION_IMAGES,
    details: {
      heading: "Deck restoration: from weathered gray to warm and protected.",
      paragraphs: [
        "This Massachusetts deck had gone gray and rough after years of sun and rain, with built-in benches and railings in the same condition. The owners wanted it brought back without rebuilding, so we restored the existing boards and finished the whole deck in a rich brown stain that protects the wood and matches the view out to the water.",
        "Restoring a deck is a multi-step process. We start with a deep clean using a wood brightener to lift the gray oxidized layer, then sand the boards, benches and rails to open the grain. Loose fasteners are reset and any boards that cannot be saved are replaced. Once the wood is dry, we apply a penetrating oil or semi-transparent stain in two coats, working it into the grain so it does not peel like a surface paint.",
        "A full restoration like this takes three to five days, depending on the size of the deck and drying conditions. The finish should be refreshed every two to three years to keep the wood protected.",
        "If your deck looks tired but the structure is sound, restoration is far less expensive than replacement. Our deck and stairs team handles restoration and refinishing across Martha's Vineyard, Cape Cod and the South Shore.",
      ],
      serviceLabel: "Deck and Stairs",
      serviceTo: "/services/deck-stairs",
    },
  },
  {
    slug: "decks",
    title: "Deck Builds and Refinishing",
    category: "Exterior",
    categoryLabel: "Decks",
    location: "Massachusetts",
    description:
      "New deck builds and cedar refinishing that bring outdoor living spaces back to life.",
    cover: DECK_IMAGES[0].src,
    images: DECK_IMAGES,
    details: {
      heading: "New deck builds and cedar refinishing for outdoor living.",
      paragraphs: [
        "These projects range from a new waterfront deck with railing and stairs to cedar decks that were sanded and sealed to bring back their color. In Massachusetts, a deck is the main outdoor living space for most of the year, so it has to be built and finished to handle heavy use and hard weather.",
        "For new builds, we handle framing, decking, railings and stairs, using pressure-treated framing and cedar or composite decking depending on the look and budget. Every deck is built to code with proper footings, flashing at the house and hardware rated for exterior use. For refinishing, existing cedar is cleaned, sanded and sealed with a product that highlights the natural grain while blocking moisture and UV.",
        "A new deck typically takes one to three weeks from start to finish. Refinishing an existing cedar deck takes two to four days.",
        "Whether you need a new deck or want the one you have to look new again, our deck and stairs team serves Martha's Vineyard, Cape Cod and the South Shore. Request a free estimate and we will come out to measure and talk through options.",
      ],
      serviceLabel: "Deck and Stairs",
      serviceTo: "/services/deck-stairs",
    },
  },
  {
    slug: "kitchen-and-bath-remodeling",
    title: "Kitchen and Bath Remodeling",
    category: "Remodeling",
    categoryLabel: "Remodeling",
    location: "Massachusetts and Boston Area",
    description: "Full kitchen, bathroom and closet remodels from layout to final finish.",
    cover: REMODEL_IMAGES[0].src,
    images: REMODEL_IMAGES,
    details: {
      heading: "Kitchen, bath and closet remodeling from layout to final finish.",
      paragraphs: [
        "These remodels in the Boston area and across Massachusetts covered the full range: a kitchen with new cabinets and counters, a primary bath with new tile and fixtures, and a custom closet with built-in storage. In each case we managed the project end to end, so the homeowner dealt with one team from demolition through the last coat of paint.",
        "Remodeling with Tony's means carpentry, tile, plastering, countertops and painting are all handled by our own crews. That matters because the hand-offs between trades are where most remodels lose time and quality. We plan the sequence up front, order materials early and keep the schedule tight.",
        "A kitchen remodel usually takes four to eight weeks, a bathroom two to four, and a closet build-out a few days. We give you a written scope and timeline before work starts and keep you updated as each phase finishes.",
        "If you are planning a kitchen, bathroom or storage remodel on Martha's Vineyard, Cape Cod or the South Shore, our remodeling team can review your ideas and put together a detailed estimate.",
      ],
      serviceLabel: "Remodeling",
      serviceTo: "/services/remodeling",
    },
  },
  {
    slug: "hardwood-floors",
    title: "Hardwood Floor Refinishing",
    category: "Remodeling",
    categoryLabel: "Flooring",
    location: "Massachusetts",
    description: "Hardwood floors sanded, stained and sealed for a rich, lasting finish.",
    cover: FLOOR_IMAGES[0].src,
    images: FLOOR_IMAGES,
    details: {
      heading: "Hardwood floor refinishing with a deep, lasting finish.",
      paragraphs: [
        "The hardwood floors in these Massachusetts homes were worn, scratched and dull but structurally sound, which makes them perfect candidates for refinishing rather than replacement. One floor was brought back with a warm medium stain, the other with a dark stain that gives the room a more formal look. Both were sealed with a durable finish that will last for years.",
        "Floor refinishing starts with sanding down to bare wood using a drum sander and edger, then progressively finer grits to remove scratches and leave a smooth surface. Stain is applied evenly and allowed to penetrate before we apply two or three coats of a water-based or oil-modified polyurethane. Each coat is lightly abraded before the next for a smooth, even sheen.",
        "Most floor refinishing jobs take three to five days including drying time. The space needs to be empty, and we recommend staying off the floor for at least 24 hours after the last coat.",
        "If your hardwood floors have lost their finish or color, our flooring team refinishes floors across Martha's Vineyard, Cape Cod and the South Shore. Request a free estimate and we will assess the floors and recommend a stain and finish.",
      ],
      serviceLabel: "Flooring",
      serviceTo: "/services/flooring",
    },
  },
];

export const getCollectionBySlug = (slug: string | undefined): PortfolioCollection | undefined =>
  COLLECTIONS.find((c) => c.slug === slug);
