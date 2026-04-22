const items = [
  { stat: "20+", label: "Years Experience" },
  { stat: "500+", label: "Projects Completed" },
  { stat: "5★", label: "5-Star Rated" },
];

const TrustBar = () => {
  return (
    <section className="bg-stone border-y border-border">
      <div className="container grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {items.map((it) => (
          <div key={it.label} className="py-10 md:py-12 text-center">
            <div className="font-display text-4xl md:text-5xl text-foreground">{it.stat}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
