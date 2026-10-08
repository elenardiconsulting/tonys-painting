import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import FadeUpSection from "@/components/site/FadeUpSection";
import RippleButton from "@/components/site/RippleButton";

interface CityPageProps {
  city: string;
  region: string;
  slug: string;
  headline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  nearby: string[];
}

const SERVICES = [
  "Interior Painting",
  "Exterior Painting",
  "Remodeling",
  "Deck and Stairs",
  "General Carpentry",
  "Flooring",
  "Handyman Services",
];

const CityPainting = ({
  city,
  region,
  slug,
  headline,
  description,
  seoTitle,
  seoDescription,
  keywords,
  nearby,
}: CityPageProps) => {
  return (
    <PageLayout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/${slug}`}
        keywords={keywords}
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Tony's Painting and Remodeling",
          description: `Professional painting and remodeling contractor serving ${city}, ${region} since 2004.`,
          url: `https://tonyspaintingmv.com/${slug}`,
          telephone: "+15089829675",
          email: "Tonyspainting11@gmail.com",
          foundingDate: "2004",
          address: {
            "@type": "PostalAddress",
            addressLocality: city,
            addressRegion: "MA",
            addressCountry: "US",
          },
          areaServed: { "@type": "City", name: city },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "7",
            bestRating: "5",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Painting and Remodeling Services",
            itemListElement: SERVICES.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s },
            })),
          },
          sameAs: [
            "https://www.instagram.com/tonyspainting_remodeling/",
            "https://www.facebook.com/tonyspaintingmvLLC/",
          ],
        }}
      />

      <FadeUpSection>
        <InnerHero
          title={headline}
          subtitle={description}
          crumbs={[{ label: "Home", to: "/" }, { label: city }]}
        />
      </FadeUpSection>

      <section style={{ backgroundColor: "#F5F1EB", padding: "clamp(48px,6vw,80px) 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeUpSection>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(28px,3vw,40px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "16px" }}>
              What we do in {city}.
            </h2>
            <p style={{ color: "#6B6560", fontSize: "15px", lineHeight: 1.7, maxWidth: "640px", marginBottom: "40px" }}>
              Tony's Painting and Remodeling has served {city} and surrounding communities since 2004. Every project comes with a free estimate, a dedicated crew, and a finish you can count on.
            </p>
          </FadeUpSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {SERVICES.map((service) => (
              <FadeUpSection key={service}>
                <Link
                  to="/contact"
                  style={{ textDecoration: "none" }}
                >
                  <div style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E8E2D8",
                    borderRadius: "10px",
                    padding: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "box-shadow 0.2s ease",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A1A1A" }}>{service}</span>
                    <span style={{ color: "#C4291C", fontSize: "16px" }}>→</span>
                  </div>
                </Link>
              </FadeUpSection>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(48px,6vw,80px) 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FadeUpSection>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(28px,3vw,40px)", color: "#1A1A1A", letterSpacing: "-0.02em", marginBottom: "24px" }}>
              Trusted by homeowners in {city}.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { name: "Shane Sanders", text: "Tony and his team just finished painting the entire inside of our house. Very professional and detail oriented. The quality of work was top notch." },
                { name: "OB Resident", text: "Tony and his team just finished painting our home. We could not be happier with the results. His team clearly wanted to exceed expectations and they did." },
                { name: "Cathy Sclafani", text: "Tony and his crew were fabulous. So professional and did an excellent job." },
              ].map((r) => (
                <div key={r.name} style={{ backgroundColor: "#F5F1EB", border: "1px solid #E8E2D8", borderRadius: "10px", padding: "24px" }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                    {[0,1,2,3,4].map(i => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C4291C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <p style={{ color: "#1A1A1A", fontSize: "14px", lineHeight: 1.7, fontStyle: "italic", marginBottom: "12px" }}>&ldquo;{r.text}&rdquo;</p>
                  <p style={{ color: "#6B6560", fontSize: "12px", fontWeight: 600 }}>{r.name}</p>
                </div>
              ))}
            </div>
          </FadeUpSection>
        </div>
      </section>

      {nearby.length > 0 && (
        <section style={{ backgroundColor: "#F5F1EB", padding: "clamp(36px,4vw,60px) 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <FadeUpSection>
              <p style={{ color: "#6B6560", fontSize: "13px", marginBottom: "16px" }}>
                We also serve:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {nearby.map((c) => (
                  <Link
                    key={c}
                    to={`/painting-contractor-${c.toLowerCase().replace(/\s+/g, "-")}`}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "50px",
                      border: "1px solid #E8E2D8",
                      backgroundColor: "#FFFFFF",
                      color: "#1A1A1A",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </FadeUpSection>
          </div>
        </section>
      )}

      <section style={{ backgroundColor: "#1A1A1A", padding: "clamp(60px,8vw,100px) 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <FadeUpSection>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", color: "#F5F1EB", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "16px" }}>
              Free estimate in {city}.
            </h2>
            <p style={{ color: "#9CA3AF", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>
              No commitment. We typically respond within one business day.
            </p>
            <RippleButton
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
            >
              <Link to="/contact">Request a Free Estimate</Link>
            </RippleButton>
          </FadeUpSection>
        </div>
      </section>
    </PageLayout>
  );
};

export default CityPainting;
