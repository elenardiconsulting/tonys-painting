import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FadeUpSection from "./FadeUpSection";

const VideoShowcase = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <section
      className="w-full"
      style={{ background: "#1A1A1A", padding: "80px 24px" }}
    >
      <div
        className="mx-auto flex flex-col items-center video-showcase-inner"
        style={{ maxWidth: 680, gap: 16 }}
      >
        <FadeUpSection className="flex flex-col items-center" style={{ gap: 16 }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 11,
              color: "#C4291C",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              textAlign: "center",
            }}
          >
            See us in action
          </div>
          <h2
            className="video-showcase-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(32px, 4vw, 48px)",
              color: "#F5F1EB",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textAlign: "center",
              margin: 0,
            }}
          >
            The work speaks for itself.
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "rgba(255,255,255,0.60)",
              lineHeight: 1.7,
              textAlign: "center",
              maxWidth: 480,
              marginBottom: 8,
            }}
          >
            Watch how we approach every project with precision, care and attention to detail.
          </p>
        </FadeUpSection>

        <FadeUpSection
          delay={0.2}
          className="w-full"
          style={{
            maxWidth: 400,
            margin: "0 auto",
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 24px 60px rgba(0,0,0,0.50)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <video
            ref={videoRef}
            src="/videos/tonys-showreel.mp4"
            controls
            preload="metadata"
            playsInline
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: 16,
            }}
          />
          <div
            onClick={handlePlay}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.30)",
              display: playing ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              cursor: "pointer",
            }}
          >
            <button
              type="button"
              aria-label="Play video"
              onClick={handlePlay}
              className="video-play-button"
              style={{
                width: 64,
                height: 64,
                background: "rgba(196,41,28,0.90)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(196,41,28,0.40)",
                border: "none",
                transition: "background 0.2s ease, transform 0.2s ease",
              }}
            >
              <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12L0.75 23.6913L0.75 0.308657L21 12Z" fill="#FFFFFF" />
              </svg>
            </button>
          </div>
        </FadeUpSection>

        <FadeUpSection delay={0.3} style={{ marginTop: 32 }}>
          <Link
            to="/contact"
            className="video-showcase-cta"
            style={{
              display: "inline-block",
              background: "#C4291C",
              color: "#FFFFFF",
              padding: "13px 28px",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              boxShadow: "0 4px 16px rgba(196,41,28,0.35)",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
          >
            Get Free Estimate →
          </Link>
        </FadeUpSection>
      </div>
    </section>
  );
};

export default VideoShowcase;
