import { useCallback, useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import FadeUpSection from "@/components/site/FadeUpSection";
import RippleButton from "@/components/site/RippleButton";
import BeforeAfter from "@/components/site/BeforeAfter";
import NotFound from "./NotFound";
import { COLLECTIONS, getCollectionBySlug } from "@/data/portfolio";

const PortfolioCollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = getCollectionBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = collection?.images.length ?? 0;

  const close = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i == null ? i : (i - 1 + total) % total));
  }, [total]);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i == null ? i : (i + 1) % total));
  }, [total]);

  useEffect(() => {
    if (lightboxIndex == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, showPrev, showNext]);

  if (!collection) return <NotFound />;

  const index = COLLECTIONS.findIndex((c) => c.slug === collection.slug);
  const previous = index > 0 ? COLLECTIONS[index - 1] : COLLECTIONS[COLLECTIONS.length - 1];
  const next = COLLECTIONS[(index + 1) % COLLECTIONS.length];
  const current = lightboxIndex != null ? collection.images[lightboxIndex] : null;

  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) showPrev();
    else showNext();
  };

  return (
    <PageLayout>
      <SEO
        title={`${collection.title} | Tony's Painting and Remodeling`}
        description={collection.description}
        canonical={`/portfolio/${collection.slug}`}
      />
      <InnerHero
        title={collection.title}
        subtitle={collection.location}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Portfolio", to: "/portfolio" },
          { label: collection.title },
        ]}
      />

      <section className="bg-background">
        <div className="container py-12 md:py-16">
          <FadeUpSection>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mt-8 mb-3">
              {collection.categoryLabel}
            </p>
            <h1 className="font-display text-3xl md:text-5xl leading-tight">{collection.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{collection.location}</p>
            <p className="text-base text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              {collection.description}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              {collection.images.length} photos
            </p>
          </FadeUpSection>

          {collection.beforeAfter && (
            <FadeUpSection>
              <div className="mt-12 md:mt-16">
                <div className="max-w-2xl mb-8">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">
                    Before and After
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
                    From weathered to warm.
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Same deck, same angle. Drag the handle to see the change.
                  </p>
                </div>
                <BeforeAfter
                  beforeSrc={collection.beforeAfter.before}
                  afterSrc={collection.beforeAfter.after}
                  beforeAlt={collection.beforeAfter.beforeAlt}
                  afterAlt={collection.beforeAfter.afterAlt}
                  className="max-w-4xl"
                />
              </div>
            </FadeUpSection>
          )}

          {/* Masonry grid */}
          <div className="mt-10 columns-1 md:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {collection.images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group mb-4 block w-full overflow-hidden rounded-[10px] break-inside-avoid"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next collection */}
      <section className="bg-background border-t border-border">
        <div className="container py-12 grid gap-4 md:grid-cols-2">
          <Link
            to={`/portfolio/${previous.slug}`}
            className="group border border-border rounded-[10px] p-6 transition-colors hover:border-primary"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Previous collection
            </p>
            <h3 className="font-display text-2xl mt-2 group-hover:text-primary transition-colors">
              {previous.title}
            </h3>
          </Link>
          <Link
            to={`/portfolio/${next.slug}`}
            className="group border border-border rounded-[10px] p-6 text-right transition-colors hover:border-primary"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Next collection
            </p>
            <h3 className="font-display text-2xl mt-2 group-hover:text-primary transition-colors">
              {next.title}
            </h3>
          </Link>
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
      {current && lightboxIndex != null && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
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
            aria-label="Previous photo"
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-background/80 hover:text-primary transition-colors p-2"
          >
            <ChevronLeft size={36} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
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
              src={current.src}
              alt={current.alt}
              className="w-auto max-w-full max-h-[65vh] object-contain"
            />
            <p className="text-xs text-background/70 mt-4">
              {lightboxIndex + 1} of {collection.images.length}
            </p>
            <div className="mt-4 flex gap-2 overflow-x-auto max-w-full scrollbar-none px-1">
              {collection.images.map((thumb, i) => (
                <button
                  key={thumb.src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={
                    "h-14 w-14 shrink-0 overflow-hidden rounded-sm border-2 transition-colors " +
                    (i === lightboxIndex ? "border-primary" : "border-transparent opacity-60")
                  }
                >
                  <img src={thumb.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default PortfolioCollectionPage;
