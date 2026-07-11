import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle, MessageSquare, Globe, Instagram, Star } from "lucide-react";
import PublicPageHeader from "@/components/site/PublicPageHeader";
import SEO from "@/components/SEO";

const PHONE_DISPLAY = "508 982 9675";
const PHONE_E164 = "+15089829675";
const PHONE_DIGITS = "15089829675";
const INSTAGRAM_URL = "https://www.instagram.com/tonyspainting_remodeling/";
const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/place/?q=place_id:0x89e529970477bc27:0x3d37406d51e5cec&action=write-review";
const WEBSITE_URL = "/";

const Welcome = () => {
  const [params] = useSearchParams();
  const tag = params.get("tag") ?? "";
  const type = params.get("type") ?? "";
  const sid = params.get("sid") ?? "";

  const uploadQuery = new URLSearchParams();
  if (tag) uploadQuery.set("tag", tag);
  if (type) uploadQuery.set("type", type);
  if (sid) uploadQuery.set("sid", sid);
  const uploadHref = `/project-upload${uploadQuery.toString() ? `?${uploadQuery.toString()}` : ""}`;

  const talkButtons = [
    PHONE_E164 && {
      href: `tel:${PHONE_E164}`,
      label: "Call Now",
      sub: PHONE_DISPLAY,
      Icon: Phone,
    },
    PHONE_DIGITS && {
      href: `https://wa.me/${PHONE_DIGITS}`,
      label: "WhatsApp",
      sub: "Chat with us",
      Icon: MessageCircle,
      external: true,
    },
    PHONE_E164 && {
      href: `sms:${PHONE_E164}`,
      label: "Text Us",
      sub: PHONE_DISPLAY,
      Icon: MessageSquare,
    },
  ].filter(Boolean) as Array<{ href: string; label: string; sub: string; Icon: typeof Phone; external?: boolean }>;

  const learnButtons = [
    WEBSITE_URL && {
      href: WEBSITE_URL,
      label: "Visit Website",
      sub: "tonyspaintingmv.com",
      Icon: Globe,
      internal: true,
    },
    INSTAGRAM_URL && {
      href: INSTAGRAM_URL,
      label: "Instagram",
      sub: "@tonyspainting_remodeling",
      Icon: Instagram,
      external: true,
    },
    GOOGLE_REVIEW_URL && {
      href: GOOGLE_REVIEW_URL,
      label: "Leave a Review",
      sub: "Google Reviews",
      Icon: Star,
      external: true,
    },
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    sub: string;
    Icon: typeof Phone;
    external?: boolean;
    internal?: boolean;
  }>;

  const renderSecondary = (btn: {
    href: string;
    label: string;
    sub: string;
    Icon: typeof Phone;
    external?: boolean;
    internal?: boolean;
  }) => {
    const content = (
      <>
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-stone text-dark shrink-0">
          <btn.Icon className="w-5 h-5" />
        </span>
        <span className="flex flex-col text-left">
          <span className="font-semibold text-foreground leading-tight">{btn.label}</span>
          <span className="text-sm text-muted-foreground leading-tight">{btn.sub}</span>
        </span>
      </>
    );
    const className =
      "flex items-center gap-3 min-h-[56px] px-4 py-3 rounded-lg bg-surface border border-stone hover:border-primary hover:shadow-sm transition-all";
    if (btn.internal) {
      return (
        <Link key={btn.label} to={btn.href} className={className}>
          {content}
        </Link>
      );
    }
    return (
      <a
        key={btn.label}
        href={btn.href}
        {...(btn.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={className}
      >
        {content}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Welcome — Tony's Painting and Remodeling"
        description="Thanks for visiting our showroom. Send project photos, call, or explore our work."
      />

      <PublicPageHeader />

      <main className="max-w-2xl mx-auto px-4 pt-10 pb-16">
        {/* Warm header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Thanks for visiting our showroom
          </p>
          <h1 className="font-display text-3xl md:text-4xl leading-tight text-foreground">
            Welcome to Tony's Painting and Remodeling
          </h1>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">
            Pick what works best for you. Send project photos for a real estimate, or reach out directly.
          </p>
        </div>

        {/* HERO CTA */}
        <Link
          to={uploadHref}
          className="group relative flex items-center justify-between gap-4 w-full min-h-[88px] px-6 py-5 rounded-xl bg-primary hover:bg-primary-dark text-primary-foreground shadow-lg shadow-primary/20 transition-all"
        >
          <div className="flex flex-col text-left">
            <span className="text-xs uppercase tracking-wider opacity-90">My Project</span>
            <span className="font-serif text-xl md:text-2xl leading-tight">
              Send Photos & Get an Estimate
            </span>
          </div>
          <ArrowRight className="w-6 h-6 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Talk to us */}
        {talkButtons.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
              Talk to us
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {talkButtons.map(renderSecondary)}
            </div>
          </section>
        )}

        {/* Learn more */}
        {learnButtons.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
              Learn more
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {learnButtons.map(renderSecondary)}
            </div>
          </section>
        )}

        <p className="text-center text-xs text-muted-foreground mt-10">
          Tony's Painting and Remodeling · Martha's Vineyard and New England · Since 2004
        </p>
      </main>
    </div>
  );
};

export default Welcome;
