import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import FadeUpSection from "@/components/site/FadeUpSection";
import RippleButton from "@/components/site/RippleButton";

const services = [
  {
    name: 'Interior Painting',
    description: "Wall, ceiling and trim painting for every room. We protect your floors and furniture and do a final walkthrough with you before we leave.",
    href: '/services/interior-painting',
    image: '/images/interior-04.jpg',
  },
  {
    name: 'Exterior Painting',
    description: "Siding, trim and surface prep built for New England weather. We use exterior coatings rated for coastal and inland climates.",
    href: '/services/exterior-painting',
    image: '/images/project-13.jpg',
  },
  {
    name: 'Remodeling',
    description: "Kitchen, bathroom and living space remodeling with one crew handling flooring, tile, plastering and carpentry.",
    href: '/services/remodeling',
    image: '/images/remodeling-02.jpg',
  },
  {
    name: 'Flooring',
    description: "Hardwood installation, refinishing and restoration. We check the subfloor, sand evenly and apply a durable finish coat.",
    href: '/services/flooring',
    image: '/images/flooring-01.jpg',
  },
  {
    name: 'Ceramic Tile',
    description: "Bathroom and kitchen tile installed with level lines and sealed grout. Precision from layout through final clean.",
    href: '/services/ceramic-tile',
    image: '/images/project-04.jpg',
  },
  {
    name: 'Deck and Stairs',
    description: "Deck cleaning, sanding, staining and repair for wood that holds up through the seasons.",
    href: '/services/deck-stairs',
    image: '/images/project-07.jpg',
  },
  {
    name: 'General Carpentry',
    description: "Trim, moldings, built-ins and wood repairs done with clean cuts and proper fastening.",
    href: '/services/carpentry',
    image: '/images/flooring-02.jpg',
  },
  {
    name: 'Plastering',
    description: "Crack repair, skim coating and plaster restoration for walls that were never meant to look like that.",
    href: '/services/plastering',
    image: '/images/interior-01.jpg',
  },
  {
    name: 'Handyman Services',
    description: "Repairs and small fixes done by an experienced crew. We show up when we say we will.",
    href: '/services/handyman',
    image: '/images/project-09.jpg',
  },
  {
    name: 'Fence',
    description: "Wood and vinyl fence installation and repair. Properly set posts, level rails and a clean finish.",
    href: '/services/fence',
    image: '/images/project-14.jpg',
  },
  {
    name: 'Countertop',
    description: "Kitchen and bathroom countertop installation with accurate measurements and no guesswork.",
    href: '/services/countertop',
    image: '/images/interior-02.jpg',
  },
  {
    name: 'Construction Cleaning',
    description: "Post-construction cleanup that gets the space ready to live in. Dust, debris and residue — gone.",
    href: '/services/construction-cleaning',
    image: '/images/interior-05.jpg',
  },
];

const Services = () => {
  return (
    <PageLayout>
      <SEO
        title="Painting & Remodeling Services in Massachusetts | Tony's"
        description="Interior painting, exterior painting, cabinet refinishing, remodeling, flooring, tile, carpentry and more. Serving Martha's Vineyard, Cape Cod and the South Shore. Free estimates."
        canonical="/services"
        keywords="interior painting Massachusetts, exterior painting Massachusetts, home remodeling MA, cabinet painting MA, flooring contractor MA, tile contractor MA, deck staining MA"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Painting and Remodeling Services",
          provider: {
            "@type": "LocalBusiness",
            name: "Tony's Painting and Remodeling",
            telephone: "+15089829675",
          },
          areaServed: "New England, USA",
          description:
            "Professional painting and remodeling services including interior painting, exterior painting, flooring, tile, carpentry and more.",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "USD",
          },
        }}
      />
      <FadeUpSection>
        <InnerHero
          title="Painting and remodeling services for Massachusetts homeowners."
          subtitle="From a single room to a full remodel, we handle every trade in-house. No coordinating multiple contractors."
          crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
        />
      </FadeUpSection>

      <section className="bg-background">
        <div className="container py-16 md:py-24">
          <div className="services-page-grid">
            {services.map((service, i) => (
              <FadeUpSection key={service.href} delay={i * 0.05}>
                <Link to={service.href} className="service-image-card-link">
                  <article className="service-image-card">
                    <div className="service-image-wrap">
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div style={{ height: '2px', background: '#C4291C' }} />
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: '18px',
                        color: '#1A1A1A',
                        margin: 0,
                      }}>
                        {service.name}
                      </h2>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: '#6B6560',
                        lineHeight: 1.65,
                        margin: 0,
                        flex: 1,
                      }}>
                        {service.description}
                      </p>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#C4291C',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '4px',
                      }}>
                        Learn more →
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeUpSection>
            ))}
          </div>
        </div>

        <style>{`
          .service-image-card-link {
            display: block;
            text-decoration: none;
            height: 100%;
          }
          .service-image-card {
            background: #FFFFFF;
            border-radius: 12px;
            border: 0.5px solid #E8E2D8;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: box-shadow 0.2s ease;
            height: 100%;
          }
          .service-image-wrap {
            position: relative;
            aspect-ratio: 16/9;
            overflow: hidden;
          }
          .service-image-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            transition: transform 0.4s ease;
          }
          .service-image-card:hover {
            box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          }
          .service-image-card:hover img {
            transform: scale(1.04);
          }
          .services-page-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          @media (min-width: 768px) {
            .services-page-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            .services-page-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}</style>
      </section>

      <section className="bg-dark">
        <div className="container py-16 md:py-24 text-center">
          <FadeUpSection>
            <h2 className="font-display text-3xl md:text-5xl text-background leading-tight max-w-2xl mx-auto">
              Have a project in mind? We'd like to hear about it.
            </h2>
            <RippleButton
              asChild
              size="lg"
              className="mt-8 bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-10"
            >
              <Link to="/contact">Request a Free Estimate</Link>
            </RippleButton>
          </FadeUpSection>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
