import { Instagram, Facebook } from "lucide-react";
import SEO from "@/components/SEO";
import PageLayout from "@/components/site/PageLayout";
import InnerHero from "@/components/site/InnerHero";
import ContactForm from "@/components/site/ContactForm";
import { Separator } from "@/components/ui/separator";

const contactBlocks = [
  {
    label: "Phone",
    value: "508 982 9675",
    href: "tel:+15089829675",
  },
  {
    label: "Email",
    value: "contact@tonyspaintingcmv.com",
    href: "mailto:contact@tonyspaintingcmv.com",
  },
  {
    label: "Service Area",
    value: "Martha's Vineyard and Boston Area",
    href: null,
  },
];

const trustItems = [
  "Licensed and Insured",
  "Free Estimates",
  "20 Years of Experience",
];

const Contact = () => {
  return (
    <PageLayout>
      <SEO
        title="Get a Free Painting Estimate in New England"
        description="Contact Tony's Painting and Remodeling for a free estimate. Serving Martha's Vineyard, Boston and all of New England. Call 508 982 9675 or fill out the form."
        canonical="/contact"
        keywords="free painting estimate New England, painting quote Martha's Vineyard, contact painters Boston MA, hire painting contractor MA"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Get a Free Estimate",
          description: "Request a free painting and remodeling estimate from Tony's team.",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "Tony's Painting and Remodeling",
            telephone: "+15089829675",
            email: "contact@tonyspaintingcmv.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Martha's Vineyard",
              addressRegion: "MA",
              addressCountry: "US",
            },
          },
        }}
      />
      <InnerHero
        title="Let's talk about your project."
        subtitle="Tell us what you need and we will get back to you within one business day."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        height="h-[260px]"
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Form card */}
          <div className="lg:col-span-3">
            <div className="bg-surface border border-border rounded-lg p-5 sm:p-6 md:p-7 max-w-xl">
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Request a Free Estimate
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                No commitment. We will review your request and reach out to schedule a visit.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">
              Prefer to call?
            </h2>

            <div className="mt-8 space-y-7">
              {contactBlocks.map((b) => (
                <div key={b.label} className="flex items-start gap-3">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                    aria-hidden
                  />
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {b.label}
                    </div>
                    {b.href ? (
                      <a
                        href={b.href}
                        className="mt-1 block text-foreground hover:text-primary transition-colors text-lg"
                      >
                        {b.value}
                      </a>
                    ) : (
                      <div className="mt-1 text-foreground text-lg">{b.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <p className="text-sm text-muted-foreground leading-relaxed">
              We typically respond within one business day. For urgent requests, please call directly.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-stone py-10">
        <div className="container flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden />
              <span className="text-sm md:text-base text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
