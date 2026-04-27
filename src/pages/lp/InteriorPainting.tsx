import LandingTemplate from "@/components/lp/LandingTemplate";

const LPInteriorPainting = () => (
  <LandingTemplate
    tag="INTERIOR PAINTING"
    headline="Professional interior painting in Martha's Vineyard and Boston."
    subline="Clean work, on schedule, with attention to every detail. Residential and commercial."
    service="Interior Painting"
    heroReview={{
      name: "Shane Sanders",
      text: "Tony and his team just finished painting the entire inside of our house. Very professional and detail oriented. The quality of work was top notch.",
    }}
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
      { title: "Living rooms and bedrooms", description: "" },
      { title: "Kitchens and bathrooms", description: "" },
      { title: "Ceilings and trim", description: "" },
      { title: "Accent walls", description: "" },
      { title: "Commercial offices", description: "" },
      { title: "New construction interiors", description: "" },
      { title: "Color consultation", description: "" },
      { title: "Surface prep and priming", description: "" },
    ]}
    portfolioLocations={[
      "Edgartown",
      "Oak Bluffs",
      "Vineyard Haven",
      "Aquinnah",
      "Boston",
      "Brookline",
    ]}
    portfolioImages={[
      "/images/project-05.jpg",
      "/images/project-15.jpg",
      "/images/project-04.jpg",
      "/images/project-16.jpg",
      "/images/project-01.jpg",
      "/images/project-02.jpg"
    ]}
  />
);

export default LPInteriorPainting;