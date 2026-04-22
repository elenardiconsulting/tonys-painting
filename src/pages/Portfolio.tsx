import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = "All Projects" | "Interior" | "Exterior" | "Remodeling" | "Commercial";

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "All Projects">;
  location: string;
}

const PROJECTS: Project[] = [
  { id: 1, title: "Edgartown Residence", category: "Interior", location: "Martha's Vineyard" },
  { id: 2, title: "West Chop Summer Home", category: "Exterior", location: "Martha's Vineyard" },
  { id: 3, title: "Boston Office Renovation", category: "Commercial", location: "Boston" },
  { id: 4, title: "Chilmark Farmhouse", category: "Exterior", location: "Martha's Vineyard" },
  { id: 5, title: "Brookline Master Bath", category: "Remodeling", location: "Boston" },
  { id: 6, title: "Oak Bluffs Victorian", category: "Interior", location: "Martha's Vineyard" },
  { id: 7, title: "Vineyard Haven Kitchen", category: "Remodeling", location: "Martha's Vineyard" },
  { id: 8, title: "Cambridge Townhouse", category: "Exterior", location: "Boston" },
  { id: 9, title: "Aquinnah Retreat", category: "Interior", location: "Martha's Vineyard" },
  { id: 10, title: "Newton Commercial Space", category: "Commercial", location: "Boston" },
  { id: 11, title: "Edgartown Porch", category: "Exterior", location: "Martha's Vineyard" },
  { id: 12, title: "Hamptons Weekend Home", category: "Interior", location: "Martha's Vineyard" },
];

const FILTERS: Category[] = ["All Projects", "Interior", "Exterior", "Remodeling", "Commercial"];

// Deterministic placeholder color per project for visual variety.
const placeholderTone = (id: number) => {
  const tones = [
    "from-stone to-background",
    "from-background to-stone",
    "from-stone via-background to-stone",
    "from-[hsl(33_25%_82%)] to-[hsl(36_33%_94%)]",
    "from-[hsl(24_15%_75%)] to-[hsl(33_25%_88%)]",
    "from-[hsl(36_20%_88%)] to-[hsl(24_10%_70%)]",
  ];
  return tones[id % tones.length];
};

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
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setLightboxId(p.id)}
                className="group relative aspect-[4/3] overflow-hidden text-left animate-fade-in"
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
                    placeholderTone(p.id),
                  )}
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-center justify-center text-foreground/30 font-display text-base">
                  {p.category}
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-300 flex flex-col items-center justify-center text-center p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {p.category}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {p.title}
                  </h3>
                  <p className="text-sm text-background/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {p.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark">
        <div className="container py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-background leading-tight max-w-2xl mx-auto">
            Like what you see? Let&apos;s talk about your project.
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
            <div
              className={cn(
                "w-full aspect-[4/3] bg-gradient-to-br flex items-center justify-center text-foreground/30 font-display text-xl",
                placeholderTone(currentProject.id),
              )}
            >
              {currentProject.category}
            </div>
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
