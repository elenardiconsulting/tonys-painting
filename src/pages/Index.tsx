import SEO from "@/components/SEO";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import TrustBar from "@/components/site/TrustBar";
import VideoShowcase from "@/components/site/VideoShowcase";
import ServicesPreview from "@/components/site/ServicesPreview";
import PortfolioPreview from "@/components/site/PortfolioPreview";
import PartnersSection from "@/components/site/PartnersSection";

import AboutSnippet from "@/components/site/AboutSnippet";
import InstagramReels from "@/components/site/InstagramReels";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Professional House Painting & Remodeling in Massachusetts | Tony's"
        description="Tony's Painting & Remodeling serves Martha's Vineyard, Cape Cod and the South Shore. Interior painting, exterior painting, cabinet refinishing and remodeling since 2004. Request a free estimate."
        canonical="/"
        keywords="house painters Massachusetts, interior painting Martha's Vineyard, exterior painting Cape Cod, painting contractor South Shore, home remodeling Massachusetts, cabinet refinishing MA"
        schema={{
          "@context": "https://schema.org",
"@type": "PaintingContractor",
          name: "Tony's Painting & Remodeling",
          description:
            "Licensed residential painting and remodeling contractor serving Martha's Vineyard, Cape Cod and the South Shore of Massachusetts since 2004.",
          url: "https://tonyspaintingmv.com",
          telephone: "+15089829675",
          email: "Tonyspainting11@gmail.com",
          foundingDate: "2004",
          founder: { "@type": "Person", name: "Otoniel Santos" },
          address: {
            "@type": "PostalAddress",
            streetAddress: "11 Cook Rd",
            addressLocality: "Vineyard Haven",
            addressRegion: "MA",
            postalCode: "02568",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 41.3805,
            longitude: -70.6453,
          },
          areaServed: [
            { "@type": "State", name: "Massachusetts" },
          ],
          serviceArea: [
            { "@type": "City", name: "Martha's Vineyard", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "Edgartown", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "Chilmark", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "West Tisbury", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "Vineyard Haven", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "Falmouth", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "Bourne", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "Hyannis", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "Cape Cod", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "West Bridgewater", containedInPlace: { "@type": "State", name: "Massachusetts" } },
            { "@type": "City", name: "South Shore", containedInPlace: { "@type": "State", name: "Massachusetts" } },
          ],
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            opens: "07:00",
            closes: "18:00",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "7",
            bestRating: "5",
          },
          priceRange: "$$",
          image: "https://tonyspaintingmv.com/og-image.jpg",
          sameAs: [
            "https://www.instagram.com/tonyspainting_remodeling/",
            "https://www.facebook.com/tonyspaintingmvLLC/",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Painting and Remodeling Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Painting" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exterior Painting" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remodeling" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deck and Stairs" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flooring" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ceramic Tile" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plastering" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "General Carpentry" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fence" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Countertop" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Construction Cleaning" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Handyman Services" } },
            ],
          },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <VideoShowcase />
        <ServicesPreview />
        <PortfolioPreview />
        <PartnersSection />
        <InstagramReels />
        <AboutSnippet />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
