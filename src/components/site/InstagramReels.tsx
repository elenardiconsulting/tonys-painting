import { useState, useRef, useEffect } from "react";

const reels = [
  { url: "https://www.instagram.com/reel/DXnh0eujkbr/", embedUrl: "https://www.instagram.com/reel/DXnh0eujkbr/embed/" },
  { url: "https://www.instagram.com/reel/DXfU0FhCax4/", embedUrl: "https://www.instagram.com/reel/DXfU0FhCax4/embed/" },
  { url: "https://www.instagram.com/reel/DXk-G4QDmP5/", embedUrl: "https://www.instagram.com/reel/DXk-G4QDmP5/embed/" },
  { url: "https://www.instagram.com/reel/DXWuvwnjjIX/", embedUrl: "https://www.instagram.com/reel/DXWuvwnjjIX/embed/" },
];

const INSTAGRAM_PROFILE = "https://www.instagram.com/tonyspainting_remodeling/";

const InstagramReels = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveSlide(index);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="bg-background"
      style={{ padding: "80px 0" }}
      aria-label="Instagram Reels"
    >
      <style>{`
        .reels-desktop { display: grid; }
        .reels-mobile { display: none; }
        @media (max-width: 767px) {
          .reels-desktop { display: none !important; }
          .reels-mobile { display: block !important; }
          .reels-section-pad { padding: 56px 0 !important; }
        }
        .reels-mobile div::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header estilo Instagram */}
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Avatar ring estilo Instagram */}
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "3px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
            aria-label="Open Tony's Painting Instagram profile"
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                padding: "2px",
                background: "#F5F1EB",
              }}
            >
              <img
                src="/images/co_ceo.png"
                alt="Tony's Painting Instagram"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </a>

          <div>
            <a
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#1A1A1A",
                textDecoration: "none",
                display: "block",
                lineHeight: 1.2,
              }}
            >
              @tonyspainting_remodeling
            </a>
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "13px",
                color: "#6B6560",
              }}
            >
              Follow us on Instagram
            </span>
          </div>
        </div>

        {/* Botao Follow estilo Instagram */}
        <a
          href={INSTAGRAM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#0095F6",
            color: "#FFFFFF",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
        >
          Follow
        </a>
      </div>

      {/* DESKTOP: 4 reels lado a lado */}
      <div
        className="container reels-desktop"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {reels.map((reel, i) => (
          <div
            key={i}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #EFEFEF",
              background: "#000",
              aspectRatio: "9/16",
            }}
          >
            <iframe
              src={reel.embedUrl}
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              allowFullScreen
              loading="lazy"
              title={`Tony's Painting Reel ${i + 1}`}
            />
          </div>
        ))}
      </div>

      {/* MOBILE: 1 reel por vez com slide */}
      <div className="reels-mobile">
        <div
          ref={sliderRef}
          style={{
            display: "flex",
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            gap: "16px",
            padding: "0 24px",
          }}
        >
          {reels.map((reel, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: "calc(100vw - 48px)",
                scrollSnapAlign: "center",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #EFEFEF",
                background: "#000",
                aspectRatio: "9/16",
                maxHeight: "65vh",
              }}
            >
              <iframe
                src={reel.embedUrl}
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                allowFullScreen
                loading="lazy"
                title={`Tony's Painting Reel ${i + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Dots mobile */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "16px",
          }}
        >
          {reels.map((_, i) => (
            <div
              key={i}
              style={{
                width: activeSlide === i ? "20px" : "6px",
                height: "6px",
                borderRadius: activeSlide === i ? "3px" : "50%",
                background: activeSlide === i ? "#C4291C" : "rgba(0,0,0,0.18)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramReels;
