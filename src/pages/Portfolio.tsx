import { useEffect, useState, useRef, type TouchEvent as ReactTouchEvent } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import FadeUpSection from "@/components/site/FadeUpSection";
import RippleButton from "@/components/site/RippleButton";
import { cn } from "@/lib/utils";

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

type Category = "All Projects" | "Interior" | "Exterior" | "Remodeling" | "Commercial";

interface GalleryImage {
  src: string;
  alt: string;
}

interface Project {
  id: number | string;
  title: string;
  category: Exclude<Category, "All Projects">;
  categoryLabel?: string;
  location: string;
  src: string;
  description?: string;
  gallery?: GalleryImage[];
}

const RESIDENTIAL_INTERIOR_GALLERY: GalleryImage[] = [
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

const PROJECTS: Project[] = [
  {
    id: "residential-interior-painting",
    title: "Residential Interior Painting",
    category: "Interior",
    categoryLabel: "Interior Painting",
    location: "Martha's Vineyard, MA",
    src: ri01.url,
    description:
      "Full interior repaint of a residence with vaulted wood ceilings, bay windows and a primary suite. Walls, trim and doors refreshed with a clean, bright finish that lets the natural wood stand out.",
    gallery: RESIDENTIAL_INTERIOR_GALLERY,
  },
  { id: 'int-luxury-01', title: "Luxury Kitchen Renovation", category: "Interior", location: "Martha's Vineyard", src: "/images/interior-04.jpg" },
  { id: 1, title: "Coastal Residence", category: "Exterior", location: "New England", src: "/images/project-02.jpg" },
  { id: 'int-luxury-02', title: "Open Plan Living Space", category: "Interior", location: "Martha's Vineyard", src: "/images/interior-03.jpg" },
  { id: 2, title: "Colonial Restoration", category: "Exterior", location: "New England", src: "/images/project-12.jpg" },
  { id: 'floor-01', title: "Hardwood Floor Refinishing", category: "Remodeling", location: "New England", src: "/images/flooring-01.jpg" },
  { id: 3, title: "Waterfront Deck", category: "Exterior", location: "New England", src: "/images/project-08.jpg" },
  { id: 'int-luxury-03', title: "White Kitchen Interior", category: "Interior", location: "New England", src: "/images/interior-05.jpg" },
  { id: 4, title: "Master Bath Remodel", category: "Remodeling", location: "New England", src: "/images/project-04.jpg" },
  { id: 'remodel-kitchen', title: "Full Kitchen Remodel", category: "Remodeling", location: "Boston Area", src: "/images/remodeling-02.jpg" },
  { id: 5, title: "Wood Siding Project", category: "Exterior", location: "New England", src: "/images/project-14.jpg" },
  { id: 'int-luxury-04', title: "Classic Kitchen Cabinetry", category: "Interior", location: "Boston Area", src: "/images/interior-01.jpg" },
  { id: 6, title: "Shingle Style Residence", category: "Exterior", location: "New England", src: "/images/project-06.jpg" },
  { id: 'floor-02', title: "Built-in Cabinetry", category: "Interior", location: "Boston Area", src: "/images/flooring-02.jpg" },
  { id: 7, title: "Outdoor Deck Build", category: "Exterior", location: "New England", src: "/images/project-07.jpg" },
  { id: 'int-luxury-05', title: "Kitchen Island Detail", category: "Interior", location: "Martha's Vineyard", src: "/images/interior-02.jpg" },
  { id: 8, title: "Modern Interior", category: "Interior", location: "New England", src: "/images/project-05.jpg" },
  { id: 'floor-03', title: "Dark Hardwood Restoration", category: "Remodeling", location: "New England", src: "/images/flooring-03.jpg" },
  { id: 9, title: "Classic Colonial", category: "Exterior", location: "New England", src: "/images/project-13.jpg" },
  { id: 10, title: "Custom Closet Remodel", category: "Remodeling", location: "New England", src: "/images/project-15.jpg" },
  { id: 11, title: "Kitchen Remodel", category: "Remodeling", location: "New England", src: "/images/project-16.jpg" },
  { id: 12, title: "Cedar Deck Refinish", category: "Exterior", location: "New England", src: "/images/project-09.jpg" },
];

const FILTERS: Category[] = ["All Projects", "Interior", "Exterior", "Remodeling", "Commercial"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All Projects");
  const [lightboxId, setLightboxId] = useState<number | string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const filtered =
    activeFilter === "All Projects"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);
  const mobileSliderPages: Project[][] = [];
  for (let i = 0; i < filtered.length; i += 4) {
    mobileSliderPages.push(filtered.slice(i, i + 4));
  }

  const lightboxIndex = lightboxId != null ? filtered.findIndex((p) => p.id === lightboxId) : -1;
  const currentProject = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  const galleryImages: GalleryImage[] = currentProject
    ? currentProject.gallery ?? [
        { src: currentProject.src, alt: `${currentProject.title}, ${currentProject.location}` },
      ]
    : [];
  const hasGallery = (currentProject?.gallery?.length ?? 0) > 1;
  const currentImage = galleryImages[Math.min(galleryIndex, galleryImages.length - 1)] ?? null;

  const closeLightbox = () => setLightboxId(null);
  const showPrev = () => {
    if (lightboxIndex < 0) return;
    if (hasGallery) {
      setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
      return;
    }
    const next = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setGalleryIndex(0);
    setLightboxId(filtered[next].id);
  };
  const showNext = () => {
    if (lightboxIndex < 0) return;
    if (hasGallery) {
      setGalleryIndex((i) => (i + 1) % galleryImages.length);
      return;
    }
    const next = (lightboxIndex + 1) % filtered.length;
    setGalleryIndex(0);
    setLightboxId(filtered[next].id);
  };

  const openLightbox = (id: number | string) => {
    setGalleryIndex(0);
    setLightboxId(id);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) showPrev();
    else showNext();
  };


  useEffect(() => {
    if (lightboxId == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxId, activeFilter]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const slide = el.firstElementChild as HTMLElement | null;
      const gap = parseFloat(window.getComputedStyle(el).columnGap || "0");
      const slideWidth = slide ? slide.offsetWidth + gap : el.offsetWidth;
      const index = slideWidth > 0 ? Math.round(el.scrollLeft / slideWidth) : 0;
      setActiveSlide(index);
    };

    setActiveSlide(0);
    el.scrollTo({ left: 0 });
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [activeFilter]);

  return (
    <PageLayout>
      <SEO
        title="Painting and Remodeling Portfolio | New England Projects"
        description="Browse our work across New England. Interior, exterior, remodeling and deck projects since 2004."
        canonical="/portfolio"
        keywords="painting portfolio New England, painting projects New England, before after painting New England, remodeling projects MA"
      />
      <InnerHero
        title="Our work speaks for itself."
        subtitle="20 years of projects across New England."
        crumbs={[{ label: "Home", to: "/" }, { label: "Portfolio" }]}
      />

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-16 md:top-20 z-30">
        <div className="container">
          <div className="flex gap-2 md:gap-3 overflow-x-auto py-4 md:py-6 -mx-6 px-6 scrollbar-none">
            {FILTERS.map((f) => {
              const active = f === activeFilter;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "shrink-0 px-5 py-2 text-sm font-medium border rounded-full transition-colors whitespace-nowrap",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary",
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background">
        <div className="container py-12 md:py-16">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <FadeUpSection key={p.id} delay={(i % 3) * 0.1}>
                <button
                  onClick={() => setLightboxId(p.id)}
                  className="portfolio-item group relative aspect-[4/3] overflow-hidden text-left w-full"
                >
                  <img
                    src={p.src}
                    alt={`${p.title}, ${p.location}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="portfolio-overlay absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="portfolio-caption">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                        {p.category}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl text-background">
                        {p.title}
                      </h3>
                      <p className="text-sm text-background/70 mt-1">{p.location}</p>
                    </div>
                  </div>
                </button>
              </FadeUpSection>
            ))}
          </div>

          {/* Mobile 2x2 Slider */}
          <div className="md:hidden -mx-6">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-6 scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {mobileSliderPages.map((page, pageIdx) => (
                <div
                  key={pageIdx}
                  className="grid grid-cols-2 gap-3 shrink-0 snap-center"
                  style={{ width: 'calc(100vw - 48px)' }}
                >
                  {page.map((p, itemIdx) => (
                    <button
                      key={p.id}
                      type="button"
                      className="relative aspect-square overflow-hidden rounded-[10px] text-left"
                      onClick={() => setLightboxId(p.id)}
                    >
                      <img
                        src={p.src}
                        alt={`${p.title}, ${p.location}`}
                        loading={pageIdx === 0 && itemIdx < 2 ? "eager" : "lazy"}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 flex min-h-[42%] flex-col justify-end p-3"
                        style={{
                          background:
                            "linear-gradient(to top, hsl(var(--foreground) / 0.58) 0%, hsl(var(--foreground) / 0.18) 58%, transparent 100%)",
                        }}
                      >
                        <h3 className="font-sans text-[12px] font-semibold leading-tight text-background">
                          {p.title}
                        </h3>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {mobileSliderPages.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 ${
                    activeSlide === i 
                      ? "h-[6px] w-[20px] rounded-[3px] bg-primary" 
                      : "h-[6px] w-[6px] rounded-full bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark">
        <div className="container py-16 md:py-24 text-center">
          <FadeUpSection>
            <h2 className="font-display text-3xl md:text-5xl text-background leading-tight max-w-2xl mx-auto">
              Like what you see? Let&apos;s talk about your project.
            </h2>
            <RippleButton
              asChild
              size="lg"
              className="mt-8 bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
            >
              <Link to="/contact">Request a Consultation</Link>
            </RippleButton>
          </FadeUpSection>
        </div>
      </section>

      {/* Lightbox */}
      {currentProject && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 text-background/80 hover:text-primary transition-colors p-2"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-background/80 hover:text-primary transition-colors p-2"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next"
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-background/80 hover:text-primary transition-colors p-2"
          >
            <ChevronRight size={36} />
          </button>

          <div
            className="w-full max-w-[900px] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={currentImage?.src ?? currentProject.src}
              alt={currentImage?.alt ?? `${currentProject.title}, ${currentProject.location}`}
              className={
                hasGallery
                  ? "w-auto max-w-full max-h-[70vh] object-contain"
                  : "w-full aspect-[4/3] object-cover"
              }
            />
            <div className="mt-6 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">
                {currentProject.categoryLabel ?? currentProject.category}
              </p>
              <h3 className="font-display text-2xl md:text-4xl text-background">
                {currentProject.title}
              </h3>
              <p className="text-sm text-background/70 mt-2">{currentProject.location}</p>
              {currentProject.description && (
                <p className="text-sm text-background/70 mt-3 max-w-xl mx-auto leading-relaxed">
                  {currentProject.description}
                </p>
              )}
              {hasGallery && (
                <p className="text-xs text-background/60 mt-3">
                  {galleryIndex + 1} of {galleryImages.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Portfolio;