import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string;
}

interface InnerHeroProps {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  variant?: "stone" | "image";
  height?: string;
}

const InnerHero = ({ title, subtitle, crumbs, variant = "stone", height }: InnerHeroProps) => {
  const isImage = variant === "image";
  const baseHeight = height ?? (isImage ? "h-[400px]" : "h-[280px]");

  return (
    <section
      className={`relative ${baseHeight} flex items-end ${isImage ? "bg-dark" : "bg-stone"} pt-20 md:pt-24`}
    >
      {isImage && (
        <>
          <div className="absolute inset-0 bg-stone" aria-hidden />
          <div className="absolute inset-0 bg-dark/55" aria-hidden />
        </>
      )}

      <div className="container relative pb-10 md:pb-14">
        <nav className="flex items-center text-xs uppercase tracking-[0.2em] mb-4">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center">
              {c.to ? (
                <Link
                  to={c.to}
                  className={`${isImage ? "text-background/70 hover:text-primary" : "text-muted-foreground hover:text-primary"} transition-colors`}
                >
                  {c.label}
                </Link>
              ) : (
                <span className={isImage ? "text-background" : "text-foreground"}>{c.label}</span>
              )}
              {i < crumbs.length - 1 && (
                <ChevronRight
                  size={12}
                  className={`mx-2 ${isImage ? "text-background/50" : "text-muted-foreground"}`}
                />
              )}
            </span>
          ))}
        </nav>

        <h1
          className={`font-display text-4xl md:text-6xl leading-tight ${isImage ? "text-background" : "text-foreground"}`}
          style={{ fontWeight: 900, letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-3 max-w-2xl text-base md:text-lg ${isImage ? "text-background/80" : "text-muted-foreground"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default InnerHero;
