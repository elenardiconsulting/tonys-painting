import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import LPForm from "./LPForm";

interface LandingTemplateProps {
  tag: string;
  headline: string;
  subline: string;
  service: string;
  reviewText: string;
  reviewName: string;
}

const TRUST_SIGNALS = [
  "Licensed and Insured",
  "Free Estimates, No Commitment",
  "5-Star Rated on Google",
  "Serving Martha's Vineyard since 2004",
  "Response within one business day",
];

const LandingTemplate = ({
  tag,
  headline,
  subline,
  service,
  reviewText,
  reviewName,
}: LandingTemplateProps) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F1EB" }}>
      {/* Header */}
      <header
        style={{ backgroundColor: "#2C2C2A" }}
        className="px-6 md:px-8 py-3.5"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
          <Link
            to="/"
            className="font-display"
            style={{
              fontWeight: 900,
              fontSize: "20px",
              color: "#F5F1EB",
              letterSpacing: "-0.02em",
            }}
          >
            Tony&apos;s <span style={{ color: "#C4291C" }}>Painting</span>
          </Link>
          <div className="flex items-center gap-2" style={{ fontSize: "14px" }}>
            <span style={{ color: "#9CA3AF" }}>Call now:</span>
            <a
              href="tel:+15089829675"
              style={{ color: "#C4291C", fontWeight: 600 }}
            >
              508 982 9675
            </a>
          </div>
        </div>
      </header>

      {/* Hero two-column */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[55fr_45fr] min-h-[calc(100vh-56px)]">
        {/* Left column */}
        <section
          style={{ backgroundColor: "#1A1A1A" }}
          className="px-6 py-12 md:px-[60px] md:py-20 flex flex-col justify-center gap-8"
        >
          <div>
            <span
              className="inline-block uppercase"
              style={{
                color: "#C4291C",
                fontSize: "12px",
                letterSpacing: "0.15em",
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
            <h1
              className="font-display mt-4"
              style={{
                fontWeight: 900,
                fontSize: "clamp(32px, 4.5vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#F5F1EB",
              }}
            >
              {headline}
            </h1>
            <p
              className="mt-5 max-w-xl"
              style={{ color: "#9CA3AF", fontSize: "16px", lineHeight: 1.6 }}
            >
              {subline}
            </p>
          </div>

          {/* Trust signals */}
          <ul className="space-y-2.5">
            {TRUST_SIGNALS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3"
                style={{ color: "#F5F1EB", fontSize: "15px" }}
              >
                <span
                  aria-hidden="true"
                  className="rounded-full"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#C4291C",
                    flexShrink: 0,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Featured review */}
          <div
            style={{ backgroundColor: "#2C2C2A", borderRadius: "8px" }}
            className="p-5"
          >
            <div className="flex gap-1 mb-2" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  style={{ color: "#C4291C", fill: "#C4291C" }}
                />
              ))}
            </div>
            <p
              style={{ color: "#F5F1EB", fontSize: "14px", lineHeight: 1.6 }}
            >
              &ldquo;{reviewText}&rdquo;
            </p>
            <p
              className="mt-2"
              style={{ color: "#9CA3AF", fontSize: "13px", fontWeight: 500 }}
            >
              {reviewName}
            </p>
          </div>
        </section>

        {/* Right column: form */}
        <section
          style={{ backgroundColor: "#F5F1EB" }}
          className="px-6 py-12 md:px-10 md:py-[60px] flex items-center"
        >
          <LPForm service={service} />
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{ backgroundColor: "#2C2C2A", color: "#6B6560" }}
        className="text-center px-4"
      >
        <p style={{ fontSize: "11px", padding: "16px 0" }}>
          Copyright 2024, Tony&apos;s Painting. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingTemplate;
