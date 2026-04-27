import FadeUpSection from "@/components/site/FadeUpSection";

const projects = [
  { name: "Colonial home exterior painting", type: "Exterior", src: "/images/project-13.jpg", alt: "Colonial home exterior painting, Martha's Vineyard" },
  { name: "Tony's team painting home", type: "Exterior", src: "/images/project-12.jpg", alt: "Tony's team painting blue exterior home" },
  { name: "Premium deck staining", type: "Exterior", src: "/images/project-07.jpg", alt: "Premium deck staining and finishing" },
  { name: "Bathroom remodel", type: "Remodeling", src: "/images/project-04.jpg", alt: "Bathroom remodel with tile and hardwood" },
  { name: "Deck staining", type: "Exterior", src: "/images/project-09.jpg", alt: "Deck staining Martha's Vineyard" },
  { name: "Kitchen remodel", type: "Remodeling", src: "/images/project-16.jpg", alt: "Kitchen remodel with countertop installation" },
];

const PortfolioPreview = () => {
  return (
    <section id="portfolio" className="bg-stone">
      <div className="container py-20 md:py-28">
        <FadeUpSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Selected Work</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              A portfolio shaped by care.
            </h2>
          </div>
          <a
            href="/portfolio"
            className="text-sm font-medium text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors pb-0.5 self-start md:self-auto"
          >
            View full portfolio
          </a>
        </FadeUpSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <FadeUpSection
              key={p.name}
              delay={(i % 3) * 0.1}
              as="article"
              className="portfolio-item group relative aspect-[4/5] bg-background overflow-hidden"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="portfolio-overlay absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="portfolio-caption">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">{p.type}</p>
                  <h3 className="font-display text-2xl md:text-3xl text-background">{p.name}</h3>
                </div>
              </div>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;