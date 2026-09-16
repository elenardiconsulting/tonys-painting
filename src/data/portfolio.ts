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
  description: string;
  cover: string;
  images: PortfolioImage[];
  featured?: boolean;
  beforeAfter?: PortfolioBeforeAfter;
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

const KITCHEN_IMAGES: PortfolioImage[] = [
  { src: "/images/interior-04.jpg", alt: "Luxury kitchen with painted cabinetry, Martha's Vineyard" },
  { src: "/images/interior-05.jpg", alt: "White kitchen interior with painted cabinets and trim, New England" },
  { src: "/images/interior-01.jpg", alt: "Classic kitchen cabinetry finished in a smooth painted coat, Boston area" },
  { src: "/images/interior-02.jpg", alt: "Painted kitchen island detail with durable finish, Martha's Vineyard" },
  { src: "/images/flooring-02.jpg", alt: "Built in cabinetry with painted shelving and trim, Boston area" },
];

const LIVING_IMAGES: PortfolioImage[] = [
  { src: "/images/interior-03.jpg", alt: "Open plan living space with fresh wall color, Martha's Vineyard" },
  { src: "/images/project-05.jpg", alt: "Modern interior living room with clean paint and crisp trim, New England" },
];

const EXTERIOR_IMAGES: PortfolioImage[] = [
  { src: "/images/project-02.jpg", alt: "Coastal residence exterior repaint, New England" },
  { src: "/images/project-12.jpg", alt: "Colonial home exterior restoration and repaint, New England" },
  { src: "/images/project-06.jpg", alt: "Shingle style residence with refreshed exterior finish, New England" },
  { src: "/images/project-13.jpg", alt: "Classic colonial house with new exterior paint, New England" },
  { src: "/images/project-14.jpg", alt: "Wood siding project with protective exterior coating, New England" },
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
  { src: "/images/project-08.jpg", alt: "Waterfront deck with fresh finish, New England" },
  { src: "/images/project-07.jpg", alt: "Outdoor deck build with railing and stairs, New England" },
  { src: "/images/project-09.jpg", alt: "Cedar deck refinished and sealed, New England" },
];

const REMODEL_IMAGES: PortfolioImage[] = [
  { src: "/images/remodeling-02.jpg", alt: "Full kitchen remodel with new cabinets and counters, Boston area" },
  { src: "/images/project-16.jpg", alt: "Kitchen remodel with updated layout and finishes, New England" },
  { src: "/images/project-04.jpg", alt: "Master bath remodel with tile and new fixtures, New England" },
  { src: "/images/project-15.jpg", alt: "Custom closet remodel with built in storage, New England" },
];

const FLOOR_IMAGES: PortfolioImage[] = [
  { src: "/images/flooring-01.jpg", alt: "Hardwood floor refinishing with warm stain, New England" },
  { src: "/images/flooring-03.jpg", alt: "Dark hardwood floor restoration with sealed finish, New England" },
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
  },
  {
    slug: "interior-living-spaces",
    title: "Interior Living Spaces",
    category: "Interior",
    categoryLabel: "Interior Painting",
    location: "Martha's Vineyard and New England",
    description: "Open living areas refreshed with clean wall color and crisp trim.",
    cover: LIVING_IMAGES[0].src,
    images: LIVING_IMAGES,
  },
  {
    slug: "exterior-painting-and-siding",
    title: "Exterior Painting and Siding",
    category: "Exterior",
    categoryLabel: "Exterior Painting",
    location: "New England",
    description:
      "Coastal, colonial and shingle style homes protected with exterior paint and siding work built for New England weather.",
    cover: EXTERIOR_IMAGES[0].src,
    images: EXTERIOR_IMAGES,
  },
  {
    slug: "deck-restoration",
    title: "Deck Restoration",
    category: "Exterior",
    categoryLabel: "Decks",
    location: "New England",
    cover: dr2904.url,
    images: DECK_RESTORATION_IMAGES,
  },
  {
    slug: "decks",
    title: "Deck Builds and Refinishing",
    category: "Exterior",
    categoryLabel: "Decks",
    location: "New England",
    description:
      "New deck builds and cedar refinishing that bring outdoor living spaces back to life.",
    cover: DECK_IMAGES[0].src,
    images: DECK_IMAGES,
  },
  {
    slug: "kitchen-and-bath-remodeling",
    title: "Kitchen and Bath Remodeling",
    category: "Remodeling",
    categoryLabel: "Remodeling",
    location: "New England and Boston Area",
    description: "Full kitchen, bathroom and closet remodels from layout to final finish.",
    cover: REMODEL_IMAGES[0].src,
    images: REMODEL_IMAGES,
  },
  {
    slug: "hardwood-floors",
    title: "Hardwood Floor Refinishing",
    category: "Remodeling",
    categoryLabel: "Flooring",
    location: "New England",
    description: "Hardwood floors sanded, stained and sealed for a rich, lasting finish.",
    cover: FLOOR_IMAGES[0].src,
    images: FLOOR_IMAGES,
  },
];

export const getCollectionBySlug = (slug: string | undefined): PortfolioCollection | undefined =>
  COLLECTIONS.find((c) => c.slug === slug);
