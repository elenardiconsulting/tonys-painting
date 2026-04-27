import type { Lead } from "@/types/lead";
import { getStatusBadge } from "@/types/lead";

interface Props {
  leads: Lead[];
  loading: boolean;
}

const timeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return mins + " minutes ago";
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + " hours ago";
  return Math.floor(hours / 24) + " days ago";
};

const Card = ({
  number,
  label,
  borderTop,
  numberColor,
}: {
  number: number;
  label: string;
  borderTop: string;
  numberColor?: string;
}) => (
  <div
    className="overview-card"
    style={{
      background: "#FFFFFF",
      borderRadius: 10,
      padding: 20,
      border: "0.5px solid #E8E2D8",
      borderTop: `2px solid ${borderTop}`,
    }}
  >
    <div
      className="overview-card-number"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: 28,
        color: numberColor || "#1A1A1A",
        lineHeight: 1.1,
      }}
    >
      {number}
    </div>
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: 13,
        color: "#6B6560",
        marginTop: 6,
      }}
    >
      {label}
    </div>
  </div>
);

const Skeleton = () => (
  <div
    style={{
      height: 90,
      borderRadius: 10,
      background:
        "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "400px 100%",
      animation: "dash-shimmer 1.4s linear infinite",
    }}
  />
);

const OverviewTab = ({ leads, loading }: Props) => {
  const newCount = leads.filter((l) => l.status === "new").length;
  const scheduledCount = leads.filter((l) => l.status === "scheduled").length;
  const wonCount = leads.filter((l) => l.status === "closed_won").length;
  const recent = leads.slice(0, 5);

  return (
    <div className="overview-wrap" style={{ padding: 24 }}>
      <style>{`
        @keyframes dash-shimmer {
          0% { background-position: -400px 0 }
          100% { background-position: 400px 0 }
        }
        .dash-metrics {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 768px) {
          .dash-metrics { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 767px) {
          .overview-wrap { padding: 16px !important; }
          .dash-metrics { gap: 12px !important; }
          .overview-card { padding: 14px !important; }
          .overview-card-number { font-size: 24px !important; }
          .overview-recent { padding: 16px !important; }
          .overview-recent-item { padding: 12px 0 !important; gap: 10px !important; }
          .overview-recent-avatar { width: 36px !important; height: 36px !important; }
          .overview-recent-name { font-size: 14px !important; }
          .overview-recent-meta-row {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            flex-wrap: wrap !important;
          }
          .overview-recent-badge-mobile { display: inline-flex !important; }
          .overview-recent-badge-desktop { display: none !important; }
        }
      `}</style>

      <div className="dash-metrics">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <Card number={leads.length} label="Total Leads" borderTop="#E8E2D8" />
            <Card
              number={newCount}
              label="New Leads"
              borderTop="#C4291C"
              numberColor={newCount > 0 ? "#C4291C" : undefined}
            />
            <Card number={scheduledCount} label="Scheduled" borderTop="#854F0B" />
            <Card
              number={wonCount}
              label="Closed Won"
              borderTop="#27500A"
              numberColor="#27500A"
            />
          </>
        )}
      </div>

      <div
        style={{
          marginTop: 32,
          background: "#FFFFFF",
          border: "0.5px solid #E8E2D8",
          borderRadius: 10,
          padding: 20,
        }}
      >
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "#1A1A1A",
            margin: "0 0 16px",
          }}
        >
          Recent Leads
        </h2>

        {recent.length === 0 && !loading && (
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#9CA3AF",
              padding: "20px 0",
              textAlign: "center",
            }}
          >
            No leads yet.
          </div>
        )}

        {recent.map((lead, idx) => {
          const badge = getStatusBadge(lead.status);
          return (
            <div
              key={lead.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderTop: idx === 0 ? "none" : "1px solid #F1EFE8",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#C4291C",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#1A1A1A",
                  }}
                >
                  {lead.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#6B6560",
                  }}
                >
                  {lead.service_type || "General inquiry"} · {timeAgo(lead.created_at)}
                </div>
              </div>
              <span
                style={{
                  background: badge.bg,
                  color: badge.color,
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewTab;
