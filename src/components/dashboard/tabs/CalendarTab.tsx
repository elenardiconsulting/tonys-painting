import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Lead } from "@/types/lead";
import { getStatusBadge } from "@/types/lead";

interface Props {
  leads: Lead[];
}

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarTab = ({ leads }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const cells: Date[] = [];
  for (let i = 0; i < totalCells; i++) {
    cells.push(new Date(year, month, i - startOffset + 1));
  }

  const getDots = (date: Date) => {
    const dayLeads = leads.filter(
      (l) => l.scheduled_at && isSameDay(new Date(l.scheduled_at), date),
    );
    return dayLeads.slice(0, 3).map((l) => getStatusBadge(l.status).color);
  };

  const selectedAppointments = leads
    .filter(
      (l) => l.scheduled_at && isSameDay(new Date(l.scheduled_at), selectedDate),
    )
    .sort(
      (a, b) =>
        new Date(a.scheduled_at!).getTime() - new Date(b.scheduled_at!).getTime(),
    );

  const upcoming = leads
    .filter((l) => l.scheduled_at && new Date(l.scheduled_at) > new Date())
    .sort(
      (a, b) =>
        new Date(a.scheduled_at!).getTime() - new Date(b.scheduled_at!).getTime(),
    )
    .slice(0, 5);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;

  return (
    <div style={{ padding: 24 }}>
      <style>{`
        .calendar-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 1024px) {
          .calendar-layout { grid-template-columns: 1fr 320px; }
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        .calendar-cell {
          height: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #1A1A1A;
          border: none;
          background: transparent;
          position: relative;
        }
        .calendar-cell:hover { background: #F5F1EB; }
      `}</style>

      <div className="calendar-layout">
        <div
          style={{
            background: "#FFFFFF",
            border: "0.5px solid #E8E2D8",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <button
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#1A1A1A",
                padding: 4,
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 18,
                  margin: 0,
                  color: "#1A1A1A",
                }}
              >
                {monthLabel}
              </h2>
              {!isCurrentMonth && (
                <button
                  onClick={() => {
                    setCurrentMonth(new Date());
                    setSelectedDate(new Date());
                  }}
                  style={{
                    padding: "4px 10px",
                    background: "#1A1A1A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 6,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  Today
                </button>
              )}
            </div>
            <button
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#1A1A1A",
                padding: 4,
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="calendar-grid" style={{ marginBottom: 4 }}>
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                style={{
                  textAlign: "center",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  color: "#9CA3AF",
                  textTransform: "uppercase",
                  padding: "6px 0",
                }}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {cells.map((date, i) => {
              const inMonth = date.getMonth() === month;
              const isToday = isSameDay(date, today);
              const isSelected = isSameDay(date, selectedDate);
              const dots = getDots(date);

              let bg = "transparent";
              let color = "#1A1A1A";
              if (isSelected) {
                bg = "#1A1A1A";
                color = "#FFFFFF";
              } else if (isToday) {
                bg = "#C4291C";
                color = "#FFFFFF";
              }

              return (
                <button
                  key={i}
                  className="calendar-cell"
                  onClick={() => setSelectedDate(date)}
                  style={{
                    background: bg,
                    color,
                    opacity: inMonth ? 1 : 0.3,
                    borderRadius: isToday || isSelected ? "50%" : 8,
                  }}
                >
                  <span>{date.getDate()}</span>
                  {dots.length > 0 && !isToday && !isSelected && (
                    <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                      {dots.map((c, idx) => (
                        <span
                          key={idx}
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: c,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: "#FFFFFF",
              border: "0.5px solid #E8E2D8",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#1A1A1A",
                margin: "0 0 12px",
              }}
            >
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>

            {selectedAppointments.length === 0 ? (
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#9CA3AF",
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                No appointments for this day.
              </div>
            ) : (
              selectedAppointments.map((lead, idx) => {
                const badge = getStatusBadge(lead.status);
                const t = new Date(lead.scheduled_at!);
                return (
                  <div
                    key={lead.id}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "10px 0",
                      borderTop: idx === 0 ? "none" : "1px solid #F1EFE8",
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        background: badge.color,
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#1A1A1A",
                        }}
                      >
                        {t.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 13,
                          color: "#1A1A1A",
                          fontWeight: 500,
                        }}
                      >
                        {lead.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: "#6B6560",
                        }}
                      >
                        {lead.service_type || "General"}
                      </div>
                    </div>
                    <span
                      style={{
                        background: badge.bg,
                        color: badge.color,
                        padding: "2px 8px",
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        height: "fit-content",
                      }}
                    >
                      {badge.label}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div
            style={{
              background: "#FFFFFF",
              border: "0.5px solid #E8E2D8",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "#1A1A1A",
                margin: "0 0 12px",
              }}
            >
              Upcoming
            </h3>
            {upcoming.length === 0 ? (
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#9CA3AF",
                }}
              >
                No upcoming appointments.
              </div>
            ) : (
              upcoming.map((lead, idx) => {
                const t = new Date(lead.scheduled_at!);
                return (
                  <div
                    key={lead.id}
                    style={{
                      padding: "8px 0",
                      borderTop: idx === 0 ? "none" : "1px solid #F1EFE8",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                      {t.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      ·{" "}
                      {t.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#1A1A1A",
                      }}
                    >
                      {lead.name}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTab;
