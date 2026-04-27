import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import FadeUpSection from "@/components/site/FadeUpSection";
import RippleButton from "@/components/site/RippleButton";
import { cn } from "@/lib/utils";

type Category = "All Projects" | "Interior" | "Exterior" | "Remodeling" | "Commercial";

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "All Projects">;
  location: string;
  src: string;
}

const PROJECTS: Project[] = [
  { id: 1, title: "Edgartown Residence", category: "Exterior", location: "Martha's Vineyard", src: "/images/project-02.jpg" },
  { id: 2, title: "Cambridge Colonial", category: "Exterior", location: "Boston", src: "/images/project-12.jpg" },
  { id: 3, title: "Vineyard Haven Deck", category: "Exterior", location: "Martha's Vineyard", src: "/images/project-08.jpg" },
  { id: 4, title: "Oak Bluffs Bath Remodel", category: "Remodeling", location: "Martha's Vineyard", src: "/images/project-04.jpg" },
  { id: 5, title: "Chilmark Wood Siding", category: "Exterior", location: "Martha's Vineyard", src: "/images/project-14.jpg" },
  { id: 6, title: "West Chop Residence", category: "Exterior", location: "Martha's Vineyard", src: "/images/project-06.jpg" },
  { id: 7, title: "Aquinnah Deck", category: "Exterior", location: "Martha's Vineyard", src: "/images/project-07.jpg" },
  { id: 8, title: "Edgartown Interior", category: "Interior", location: "Martha's Vineyard", src: "/images/project-05.jpg" },
  { id: 9, title: "Vineyard Colonial", category: "Exterior", location: "Martha's Vineyard", src: "/images/project-13.jpg" },
  { id: 10, title: "Boston Closet Remodel", category: "Remodeling", location: "Boston", src: "/images/project-15.jpg" },
  { id: 11, title: "Newton Kitchen Remodel", category: "Remodeling", location: "Boston", src: "/images/project-16.jpg" },
  { id: 12, title: "Chilmark Deck", category: "Exterior", location: "Martha's Vineyard", src: "/images/project-09.jpg" },
];

const FILTERS: Category[] = ["All Projects", "Interior", "Exterior", "Remodeling", "Commercial"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("All Projects");
  const [lightboxId, setLightboxId] = useState<number | null>(null);

  const filtered =
    activeFilter === "All Projects"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const lightboxIndex = lightboxId != null ? filtered.findIndex((p) => p.id === lightboxId) : -1;
  const currentProject = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  const closeLightbox = () => setLightboxId(null);
  const showPrev = () => {
    if (lightboxIndex < 0) return;
    const next = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxId(filtered[next].id);
  };
  const showNext = () => {
    if (lightboxIndex < 0) return;
    const next = (lightboxIndex + 1) % filtered.length;
    setLightboxId(filtered[next].id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxId, activeFilter]);

  return (
    <PageLayout>
      <InnerHero
        title="Our work speaks for itself."
        subtitle="20 years of projects across Martha's Vineyard, Boston and New England."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
              <Link to="/contact">Get Free Estimate</Link>
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
          >
            <img
              src={currentProject.src}
              alt={`${currentProject.title}, ${currentProject.location}`}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="mt-6 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">
                {currentProject.category}
              </p>
              <h3 className="font-display text-2xl md:text-4xl text-background">
                {currentProject.title}
              </h3>
              <p className="text-sm text-background/70 mt-2">{currentProject.location}</p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Portfolio;