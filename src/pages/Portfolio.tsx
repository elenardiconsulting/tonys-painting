import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import FadeUpSection from "@/components/site/FadeUpSection";
import RippleButton from "@/components/site/RippleButton";
import { cn } from "@/lib/utils";
import { COLLECTIONS, type PortfolioCategory } from "@/data/portfolio";

type Filter = "All" | PortfolioCategory;

const CATEGORY_ORDER: PortfolioCategory[] = ["Interior", "Exterior", "Remodeling", "Commercial"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const availableCategories = CATEGORY_ORDER.filter((cat) =>
    COLLECTIONS.some((c) => c.category === cat),
  );

  const counts: Record<Filter, number> = {
    All: COLLECTIONS.length,
    Interior: 0,
    Exterior: 0,
    Remodeling: 0,
    Commercial: 0,
  };
  COLLECTIONS.forEach((c) => {
    counts[c.category] += 1;
  });

  const filters: Filter[] = ["All", ...availableCategories];

  const visible = COLLECTIONS.filter(
    (c) => activeFilter === "All" || c.category === activeFilter,
  );

  const featured = visible.find((c) => c.featured);
  const rest = visible.filter((c) => c !== featured);

  return (
    <PageLayout>
      <SEO
        title="Painting and Remodeling Portfolio | Massachusetts Projects"
        description="Browse our work across Martha's Vineyard, Cape Cod and the South Shore. Interior, exterior, remodeling and deck projects in Massachusetts since 2004."
        canonical="/portfolio"
        keywords="painting portfolio Massachusetts, painting projects Martha's Vineyard, before after painting Cape Cod, remodeling projects MA"
      />
      <InnerHero
        title="Our work speaks for itself."
        subtitle="20 years of projects across Massachusetts."
        crumbs={[{ label: "Home", to: "/" }, { label: "Portfolio" }]}
      />

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-16 md:top-20 z-30">
        <div className="container">
          <div className="flex gap-2 md:gap-3 overflow-x-auto py-4 md:py-6 -mx-6 px-6 scrollbar-none">
            {filters.map((f) => {
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
                  {f} ({counts[f]})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-background">
        <div className="container py-12 md:py-16">
          {featured && (
            <FadeUpSection>
              <Link
                to={`/portfolio/${featured.slug}`}
                className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center mb-12 md:mb-16"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                  <img
                    src={featured.cover}
                    alt={featured.images[0]?.alt ?? featured.title}
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-foreground/70 px-3 py-1 text-[11px] font-medium text-background">
                    {featured.images.length} photos
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
                    {featured.categoryLabel}
                  </p>
                  <h2 className="font-display text-3xl md:text-5xl leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">{featured.location}</p>
                  {featured.description && (
                    <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-xl">
                      {featured.description}
                    </p>
                  )}
                  <span className="mt-6 inline-flex items-center rounded-sm bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors group-hover:bg-primary-dark">
                    View {featured.images.length} photos
                  </span>
                </div>
              </Link>
            </FadeUpSection>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((c, i) => (
              <FadeUpSection key={c.slug} delay={(i % 3) * 0.1}>
                <Link to={`/portfolio/${c.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                    <img
                      src={c.cover}
                      alt={c.images[0]?.alt ?? c.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-2">
                      {c.beforeAfter && (
                        <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground">
                          Before and After
                        </span>
                      )}
                      <span className="rounded-full bg-foreground/70 px-3 py-1 text-[11px] font-medium text-background">
                        {c.images.length} photos
                      </span>
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mt-4">
                    {c.categoryLabel}
                  </p>
                  <h3 className="font-display text-2xl mt-1 leading-snug">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.location}</p>
                </Link>
              </FadeUpSection>
            ))}
          </div>
        </div>
      </section>

      {/* About our work */}
      <section className="bg-background border-t border-border">
        <div className="container py-12 md:py-16">
          <FadeUpSection>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
                Twenty years of painting and remodeling in Massachusetts.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Tony's Painting & Remodeling has been working in homes and commercial buildings across Massachusetts since 2004. Our portfolio is organized by the kind of work we do most: interior painting, exterior painting and siding, kitchen and bath remodeling, deck building and restoration, hardwood floor refinishing and commercial painting. Every collection on this page is a real project completed by our own crews, not stock photography.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Most of our work is on Martha's Vineyard, where the company started, and along Cape Cod and the South Shore, including Falmouth, Hyannis, Bourne, Sandwich, Pocasset and West Bridgewater. Island and coastal homes come with their own challenges: salt air, humidity, older construction and tight schedules around the summer season. The projects here show how we handle those conditions, from the preparation that goes into an exterior repaint to the finish work on cabinets, trim and floors.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Browse by category using the filters above, or go straight to the kind of project you are planning. Each collection includes a full photo gallery and a description of the scope, the materials and the process. If you want to see the service behind the work, visit our{" "}
                <Link to="/services/interior-painting" className="text-primary hover:underline">interior painting</Link>,{" "}
                <Link to="/services/exterior-painting" className="text-primary hover:underline">exterior painting</Link> and{" "}
                <Link to="/services/remodeling" className="text-primary hover:underline">remodeling</Link> pages, or{" "}
                <Link to="/contact" className="text-primary hover:underline">request a free estimate</Link> and we will come out to look at your project.
              </p>
            </div>
          </FadeUpSection>
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
    </PageLayout>
  );
};

export default Portfolio;
