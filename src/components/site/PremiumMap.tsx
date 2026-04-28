interface PremiumMapProps {
  variant?: "footer" | "contact";
}

const PremiumMap = ({ variant = "footer" }: PremiumMapProps) => {
  const isFooter = variant === "footer";

  return (
    <div
      className="footer-map"
      style={{
        width: "100%",
        overflow: "hidden",
        background: isFooter ? "#1A1A1A" : "#FFFFFF",
        border: isFooter ? "none" : "1px solid #E8E2D8",
        borderRadius: isFooter ? 0 : 12,
        boxShadow: isFooter ? "none" : "0 8px 32px rgba(0,0,0,0.06)",
      }}
    >
      {/* Google Maps Embed */}
      <div style={{ position: "relative", width: "100%" }}>
        <iframe
          title="Tony's Painting service area map"
          src="https://www.google.com/maps?q=Martha's+Vineyard,+MA&output=embed"
          width="100%"
          height={isFooter ? 220 : 360}
          style={{
            border: 0,
            display: "block",
            filter: isFooter
              ? "grayscale(100%) invert(92%) contrast(85%)"
              : "grayscale(40%) contrast(95%)",
          }}
          loading="lazy"
          allowFullScreen={false}
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Overlay com info da empresa */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            background: isFooter ? "rgba(26,26,26,0.88)" : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "10px",
            padding: "10px 14px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            border: isFooter
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.06)",
            maxWidth: "220px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#C4291C",
                flexShrink: 0,
                boxShadow: "0 0 0 2px rgba(196,41,28,0.25)",
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "13px",
                color: isFooter ? "#F5F1EB" : "#1A1A1A",
                lineHeight: 1.2,
              }}
            >
              Tony's Painting
            </span>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              color: isFooter ? "#9CA3AF" : "#6B6560",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Martha's Vineyard, MA
          </p>
        </div>
      </div>

      {/* Barra inferior com CTA */}
      <div
        style={{
          background: isFooter ? "#1A1A1A" : "#F5F1EB",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: isFooter
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid #E8E2D8",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: isFooter ? "#9CA3AF" : "#6B6560",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Serving Martha's Vineyard and New England
          </p>
        </div>
        <a
          href="https://maps.google.com/?q=Martha's+Vineyard,+MA"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "#C4291C",
            color: "white",
            padding: "7px 14px",
            borderRadius: "6px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "11px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Get Directions
        </a>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-map iframe { height: 160px !important; }
        }
      `}</style>
    </div>
  );
};

export default PremiumMap;
