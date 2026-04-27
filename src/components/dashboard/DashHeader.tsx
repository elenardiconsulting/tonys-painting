import tonysLogo from "@/assets/tonys-logo.png";

interface DashHeaderProps {
  title: string;
}

const DashHeader = ({ title }: DashHeaderProps) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header
      style={{
        height: 64,
        background: "#FFFFFF",
        borderBottom: "1px solid #E8E2D8",
        position: "sticky",
        top: 0,
        zIndex: 10,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
        <a href="/" aria-label="Tony's Remodeling home" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img
            src={tonysLogo}
            alt="Tony's Remodeling - Painting and Carpentry"
            style={{ height: 42, width: "auto", objectFit: "contain", display: "block" }}
          />
        </a>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#1A1A1A",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>
      </div>
      <div
        className="dash-header-date"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: "#9CA3AF",
          flexShrink: 0,
        }}
      >
        {today}
      </div>
    </header>
  );
};

export default DashHeader;
