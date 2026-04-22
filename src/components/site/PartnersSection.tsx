import { useState } from "react";
import FadeUpSection from "@/components/site/FadeUpSection";

interface Partner {
  name: string;
  src: string;
}

const PARTNERS: Partner[] = [
  {
    name: "Benjamin Moore",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Benjamin_Moore_%26_Co_logo.svg/320px-Benjamin_Moore_%26_Co_logo.svg.png",
  },
  {
    name: "Sherwin-Williams",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sherwin-Williams_logo.svg/320px-Sherwin-Williams_logo.svg.png",
  },
  {
    name: "Cabot Stains",
    src: "https://www.cabotstain.com/content/dam/cabot/global/logos/cabot-logo.png",
  },
  {
    name: "EPA Lead-Safe Certified",
    src: "https://www.epa.gov/sites/default/files/2014-05/lead_safe_logo.png",
  },
];

const PartnerLogo = ({ partner, delay }: { partner: Partner; delay: number }) => {
  const [failed, setFailed] = useState(false);

  return (
    <FadeUpSection
      delay={delay}
      className="group"
      style={{
        padding: "16px 28px",
        backgroundColor: "rgba(245,241,235,0.05)",
        border: "0.5px solid rgba(245,241,235,0.08)",
        borderRadius: "10px",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(245,241,235,0.1)";
        e.currentTarget.style.borderColor = "rgba(245,241,235,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(245,241,235,0.05)";
        e.currentTarget.style.borderColor = "rgba(245,241,235,0.08)";
      }}
    >
      {failed ? (
        <span
          style={{
            color: "#F5F1EB",
            fontWeight: 700,
            fontSize: "14px",
            display: "inline-block",
            lineHeight: "40px",
          }}
        >
          {partner.name}
        </span>
      ) : (
        <img
          src={partner.src}
          alt={partner.name}
          onError={() => setFailed(true)}
          loading="lazy"
          style={{
            height: "40px",
            objectFit: "contain",
            filter: "brightness(0) invert(1) opacity(0.85)",
          }}
        />
      )}
    </FadeUpSection>
  );
};

const PartnersSection = () => {
  return (
    <section
      style={{ backgroundColor: "#2C2C2A" }}
      className="px-6 py-[60px] md:px-10 md:py-20"
    >
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <FadeUpSection delay={0}>
          <p
            className="text-center uppercase"
            style={{
              color: "#6B6560",
              fontSize: "11px",
              letterSpacing: "0.12em",
              marginBottom: "16px",
            }}
          >
            Trusted partners and certifications
          </p>
          <h2
            className="font-display text-center"
            style={{
              fontWeight: 900,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#F5F1EB",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            We only work with the best materials.
          </h2>
        </FadeUpSection>

        <FadeUpSection delay={0.1}>
          <div
            aria-hidden="true"
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "#C4291C",
              margin: "0 auto 20px",
            }}
          />
          <p
            className="text-center mx-auto"
            style={{
              color: "#9CA3AF",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "520px",
              marginBottom: "48px",
            }}
          >
            Every project uses premium paints and materials from trusted brands. That is why our work holds up year after year.
          </p>
        </FadeUpSection>

        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-6">
          {PARTNERS.map((p, i) => (
            <PartnerLogo key={p.name} partner={p} delay={0.2 + i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
