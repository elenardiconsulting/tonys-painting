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
