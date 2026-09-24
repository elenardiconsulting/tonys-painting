import { useEffect } from "react";
import SEO from "@/components/SEO";
import InteriorPaintingTemplate from "@/components/lp/InteriorPaintingTemplate";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

const LPInteriorPainting = () => {
  useEffect(() => {
    // Avoid double-injection in StrictMode / re-renders
    if (window.clarity || document.getElementById("clarity-script")) return;

    const script = document.createElement("script");
    script.id = "clarity-script";
    script.type = "text/javascript";
    script.async = true;
    script.text = `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ynccbtkkx4");`;
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <SEO
        title="Interior Painting Services in Martha's Vineyard and New England | Tony's Painting"
        description="Licensed interior painters serving Martha's Vineyard, Edgartown, Falmouth, Hyannis and New England since 2004. Free estimate in 24 hours. Request a quote today."
        canonical="/lp/interior-painting"
        keywords="interior painting Martha's Vineyard, interior painters New England, interior house painting Edgartown, painting contractor Falmouth MA, interior painting Hyannis"
      />
      <InteriorPaintingTemplate
        tag="INTERIOR PAINTING IN NEW ENGLAND"
        headline="Your home deserves a fresh start."
        subline="Professional interior painting for homeowners and businesses across Martha's Vineyard, Falmouth, Edgartown, and New England. Clean work. On time. No surprises."
        service="Interior Painting"
        reviews={[
          {
            name: "Shane Sanders",
            text: "Tony and his team just finished painting the entire inside of our house. Very professional and detail oriented. The quality of work was top notch.",
          },
          {
            name: "OB Resident",
            text: "Tony and his team just finished painting our home. We could not be happier with the results. His team clearly wanted to exceed expectations and they did.",
          },
          {
            name: "Cathy Sclafani",
            text: "Tony and his crew were fabulous. So professional and did an excellent job.",
          },
        ]}
        included={[
          { title: "Living rooms and bedrooms", description: "Full wall painting including ceiling and trim." },
          { title: "Kitchens and bathrooms", description: "Moisture-resistant paint and detailed prep work." },
          { title: "Full home interiors", description: "Single crew, consistent finish throughout your home." },
          { title: "Commercial spaces and offices", description: "Minimal disruption, fast turnaround." },
          { title: "New construction interiors", description: "Clean finishes ready for move-in." },
          { title: "Remodeling and finish work", description: "Painting as part of a larger renovation project." },
          { title: "Surface prep and priming", description: "We fix before we paint. No shortcuts." },
          { title: "Color consultation", description: "Not sure what color? We help you decide." },
        ]}
        portfolioLocations={[
          "Martha's Vineyard, MA",
          "Edgartown, MA",
          "Falmouth, MA",
          "Martha's Vineyard, MA",
          "Hyannis, MA",
          "New England",
        ]}
        portfolioImages={[
          "/images/interior-04.jpg",
          "/images/interior-03.jpg",
          "/images/interior-05.jpg",
          "/images/interior-01.jpg",
          "/images/interior-02.jpg",
          "/images/project-05.jpg",
        ]}
      />
    </>
  );
};

export default LPInteriorPainting;
