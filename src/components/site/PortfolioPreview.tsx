const projects = [
  { name: "Chilmark Farmhouse", type: "Exterior" },
  { name: "Edgartown Cottage", type: "Interior" },
  { name: "West Chop Residence", type: "Remodeling" },
  { name: "Beacon Hill Townhouse", type: "Interior" },
  { name: "Vineyard Haven Studio", type: "Exterior" },
  { name: "Boston Brownstone", type: "Remodeling" },
];

const PortfolioPreview = () => {
  return (
    <section id="portfolio" className="bg-stone">
      <div className="container py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Selected Work</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
              A portfolio shaped by care.
            </h2>
          </div>
          <a
            href="#portfolio"
            className="text-sm font-medium text-foreground border-b border-foreground/30 hover:text-primary hover:border-primary transition-colors pb-0.5 self-start md:self-auto"
          >
            View full portfolio
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((p) => (
            <figure
              key={p.name}
              className="group relative aspect-[4/5] bg-background overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-display text-lg">
                {p.type}
              </div>
              <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">{p.type}</p>
                <h3 className="font-display text-2xl md:text-3xl text-background">{p.name}</h3>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
