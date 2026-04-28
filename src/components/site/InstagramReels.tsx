import { useState, useRef, useEffect } from "react";

const reels = [
  { video: "/videos/reel-01.mp4", url: "https://www.instagram.com/reel/DXnh0eujkbr/" },
  { video: "/videos/reel-02.mp4", url: "https://www.instagram.com/reel/DXfU0FhCax4/" },
  { video: "/videos/reel-03.mp4", url: "https://www.instagram.com/reel/DXk-G4QDmP5/" },
  { video: "/videos/reel-04.mp4", url: "https://www.instagram.com/reel/DXWuvwnjjIX/" },
];

const INSTAGRAM_PROFILE = "https://www.instagram.com/tonyspainting_remodeling/";

const ReelCard = ({ reel, index }: { reel: typeof reels[0]; index: number }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={() => window.open(reel.url, "_blank", "noopener,noreferrer")}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #EFEFEF",
        background: "#000",
        aspectRatio: "9/16",
        cursor: "pointer",
      }}
    >
      <video
        ref={videoRef}
        src={reel.video}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Overlay escuro no hover */}
      <div
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.25)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0)")}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0)",
          transition: "background 0.25s ease",
        }}
      />

      {/* Badge Instagram */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 10px",
          borderRadius: "999px",
          background: "rgba(0,0,0,0.55)",
          color: "#FFFFFF",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          fontSize: "12px",
          backdropFilter: "blur(6px)",
          pointerEvents: "none",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
        </svg>
        Reel
      </div>
    </div>
  );
};

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
        }
        .reels-mobile div::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
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
                src="/favicon.ico"
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

      {/* DESKTOP: 4 videos */}
      <div
        className="container reels-desktop"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          maxWidth: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {reels.map((reel, i) => (
          <ReelCard key={i} reel={reel} index={i} />
        ))}
      </div>

      {/* MOBILE: 1 video por vez */}
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
                width: "calc((100vw - 48px) * 0.8)",
                marginLeft: i === 0 ? "calc((100vw - 48px) * 0.1)" : 0,
                marginRight: i === reels.length - 1 ? "calc((100vw - 48px) * 0.1)" : 0,
                scrollSnapAlign: "center",
                maxHeight: "52vh",
              }}
            >
              <ReelCard reel={reel} index={i} />
            </div>
          ))}
        </div>

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
