import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "Tony and his crew repainted our entire home in Edgartown. The attention to detail was extraordinary. We could not be happier.",
    name: "Margaret H.",
    location: "Edgartown, MA",
  },
  {
    quote:
      "From the first estimate to the final walkthrough, the team was professional, punctual, and meticulous. Highest recommendation.",
    name: "David L.",
    location: "Chilmark, MA",
  },
  {
    quote:
      "We have used Tony's Painting for three projects now. Quality and consistency every time. They treat your home like their own.",
    name: "Sarah & James K.",
    location: "Boston, MA",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="bg-background">
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Client Reviews</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            What our clients say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="bg-stone p-8 md:p-10 flex flex-col"
            >
              <div className="flex gap-1 text-primary mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-display text-xl md:text-2xl text-foreground leading-snug flex-1">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-medium text-foreground">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.location}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
