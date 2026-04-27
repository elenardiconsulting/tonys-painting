import SEO from "@/components/SEO";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import TrustBar from "@/components/site/TrustBar";
import VideoShowcase from "@/components/site/VideoShowcase";
import ServicesPreview from "@/components/site/ServicesPreview";
import PortfolioPreview from "@/components/site/PortfolioPreview";
import PartnersSection from "@/components/site/PartnersSection";
import Reviews from "@/components/site/Reviews";
import AboutSnippet from "@/components/site/AboutSnippet";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Painting and Remodeling You Can Trust | New England"
        description="Tony's Painting and Remodeling has served Martha's Vineyard, Boston and all of New England since 2004. Interior, exterior, remodeling and more. Free estimates."
        canonical="/"
        keywords="painting company New England, house painters Martha's Vineyard, interior exterior painting Boston MA, painting remodeling contractor New England, Tony's Painting"
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Tony's Painting and Remodeling",
          description:
            "Professional painting and remodeling services serving Martha's Vineyard, Boston and all of New England since 2004.",
          url: "https://tonyspaintingcmv.com",
          telephone: "+15089829675",
          email: "contact@tonyspaintingcmv.com",
          foundingDate: "2004",
          founder: { "@type": "Person", name: "Otoniel Santos" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Martha's Vineyard",
            addressRegion: "MA",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 41.3805,
            longitude: -70.6453,
          },
          areaServed: [
            { "@type": "Place", name: "Martha's Vineyard, MA" },
            { "@type": "Place", name: "Boston, MA" },
            { "@type": "Place", name: "Cambridge, MA" },
            { "@type": "Place", name: "Brookline, MA" },
            { "@type": "Place", name: "Newton, MA" },
            { "@type": "Place", name: "Edgartown, MA" },
            { "@type": "Place", name: "Chilmark, MA" },
            { "@type": "Place", name: "Oak Bluffs, MA" },
            { "@type": "Place", name: "Vineyard Haven, MA" },
            { "@type": "Place", name: "Aquinnah, MA" },
            { "@type": "Place", name: "Connecticut" },
            { "@type": "Place", name: "Rhode Island" },
            { "@type": "Place", name: "New Hampshire" },
            { "@type": "Place", name: "New England" },
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
            reviewCount: "9",
            bestRating: "5",
          },
          priceRange: "$$",
          image: "https://tonyspaintingcmv.com/og-image.jpg",
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
        <Reviews />
        <AboutSnippet />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
