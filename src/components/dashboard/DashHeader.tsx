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
      }}
    >
      <h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 20,
          color: "#1A1A1A",
          margin: 0,
        }}
      >
        {title}
      </h1>
      <div
        className="dash-header-date"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: "#9CA3AF",
        }}
      >
        {today}
      </div>
    </header>
  );
};

export default DashHeader;
