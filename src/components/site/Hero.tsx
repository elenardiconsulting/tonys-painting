import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="top" className="relative pt-24 md:pt-28">
      <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-12 md:py-20">
        <div className="animate-fade-up">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Established 2004
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
            Transforming spaces across Martha&apos;s Vineyard and New England.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Since 2004, Tony&apos;s team has brought precision and care to every project in the region.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark rounded-sm h-12 px-8">
              <a href="#contact">Get Free Estimate</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm h-12 px-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              <a href="#portfolio">See Our Work</a>
            </Button>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Martha&apos;s Vineyard · Boston · New England
          </p>
        </div>

        <div className="relative aspect-[4/5] lg:aspect-[3/4] w-full bg-stone overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="font-display text-2xl text-muted-foreground/70">Project Photo</div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mt-2">
                Edgartown Residence
              </p>
            </div>
          </div>
          <div className="absolute inset-0 ring-1 ring-foreground/5" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
