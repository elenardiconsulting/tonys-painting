import { useMemo, useState } from "react";
import { Phone, Mail, Trash2 } from "lucide-react";
import type { Lead, LeadStatus } from "@/types/lead";
import { getStatusBadge } from "@/types/lead";
import { supabase } from "@/integrations/supabase/client";
import LeadPhotos from "../LeadPhotos";

const TAG_TYPE_LABELS: Record<string, string> = {
  showroom_gift: "Showroom",
  post_project_gift: "Post-Project",
  referral_keychain: "Referral",
  vip_client: "VIP",
  support_keychain: "Support",
  general_business_card: "Business Card",
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  kitchen_remodeling: "Kitchen Remodeling",
  bathroom_remodeling: "Bathroom Remodeling",
  painting: "Painting",
  siding: "Siding",
  flooring: "Flooring",
  carpentry: "Carpentry",
  deck_and_exterior: "Deck & Exterior",
  full_home_remodel: "Full Home Remodel",
  other: "Other",
};

const prettyLabel = (map: Record<string, string>, v?: string | null) =>
  v ? map[v] || v : null;

interface Props {
  leads: Lead[];
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
}

const STATUSES: LeadStatus[] = [
  "new",
  "in_contact",
  "scheduled",
  "waiting",
  "closed_won",
  "closed_lost",
  "no_show",
];

const LeadCard = ({
  lead,
  updateLead,
  deleteLead,
  onScheduleNeeded,
}: {
  lead: Lead;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  onScheduleNeeded: (lead: Lead) => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notes, setNotes] = useState(lead.notes || "");
  const [confirming, setConfirming] = useState(false);
  const [removing, setRemoving] = useState(false);
  const badge = getStatusBadge(lead.status);

  const handleStatusChange = (newStatus: LeadStatus) => {
    setDropdownOpen(false);
    updateLead(lead.id, { status: newStatus });
    if (newStatus === "scheduled") {
      onScheduleNeeded({ ...lead, status: newStatus });
    }
  };

  const handleDelete = () => {
    setRemoving(true);
    setConfirming(false);
    setTimeout(() => {
      deleteLead(lead.id);
    }, 300);
  };

  const saveNotes = async () => {
    if (notes === lead.notes) return;
    await supabase.from("leads").update({ notes }).eq("id", lead.id);
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 10,
        border: "0.5px solid #E8E2D8",
        borderLeft: `4px solid ${badge.color}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: removing ? 0 : 1,
        transition: "opacity 300ms ease",
      }}
    >
      <div
        style={{
          padding: "16px 16px 12px",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
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
            fontFamily: "'Montserrat', sans-serif",
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
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: "#1A1A1A",
              }}
            >
              {lead.name}
            </span>
            {lead.source === "NFC Keychain" && (
              <span
                style={{
                  background: "#1A1A1A",
                  color: "#FFFFFF",
                  padding: "2px 6px",
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  fontFamily: "'Montserrat', sans-serif",
                }}
                title="Lead created from NFC keychain"
              >
                NFC
              </span>
            )}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 13,
              color: "#6B6560",
            }}
          >
            {lead.service_type || "General inquiry"}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            style={{
              background: badge.bg,
              color: badge.color,
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
              border: "none",
              cursor: "pointer",
              minHeight: 28,
            }}
          >
            {badge.label}
          </button>
          {dropdownOpen && (
            <>
              {/* Desktop dropdown */}
              <div
                className="lead-status-dropdown"
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  background: "#FFFFFF",
                  border: "1px solid #E8E2D8",
                  borderRadius: 8,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  zIndex: 5,
                  minWidth: 160,
                  padding: 4,
                }}
              >
                {STATUSES.map((s) => {
                  const b = getStatusBadge(s);
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "6px 10px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 12,
                        borderRadius: 4,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1EB")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span
                        style={{
                          background: b.bg,
                          color: b.color,
                          padding: "2px 8px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {b.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile bottom sheet */}
              <div
                className="lead-status-sheet-overlay"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(false);
                }}
                style={{
                  display: "none",
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  zIndex: 100,
                }}
              >
                <div
                  className="lead-status-sheet"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "#FFFFFF",
                    borderRadius: "16px 16px 0 0",
                    padding: 20,
                    paddingBottom: "calc(20px + env(safe-area-inset-bottom))",
                    zIndex: 101,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#1A1A1A",
                      marginBottom: 12,
                    }}
                  >
                    Change Status
                  </div>
                  {STATUSES.map((s) => {
                    const b = getStatusBadge(s);
                    return (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(s)}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: 12,
                          border: "none",
                          borderBottom: "1px solid #F1EFE8",
                          background: "transparent",
                          cursor: "pointer",
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: 14,
                        }}
                      >
                        <span
                          style={{
                            background: b.bg,
                            color: b.color,
                            padding: "4px 10px",
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {b.label}
                        </span>
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      width: "100%",
                      marginTop: 12,
                      padding: 12,
                      background: "#FFFFFF",
                      border: "1px solid #E8E2D8",
                      borderRadius: 8,
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 13,
              color: "#6B6560",
              textDecoration: "none",
            }}
          >
            <Phone size={14} />
            {lead.phone}
          </a>
        )}
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 13,
              color: "#6B6560",
              textDecoration: "none",
            }}
          >
            <Mail size={14} />
            {lead.email}
          </a>
        )}
      </div>

      {lead.message && (
        <div
          style={{
            padding: "12px 16px 0",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            color: "#6B6560",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {lead.message}
        </div>
      )}

      <div style={{ padding: "12px 16px 0" }}>
        <label
          style={{
            display: "block",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            color: "#9CA3AF",
            marginBottom: 4,
          }}
        >
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={saveNotes}
          style={{
            width: "100%",
            minHeight: 60,
            resize: "none",
            border: "1px solid #E8E2D8",
            borderRadius: 6,
            padding: 8,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            color: "#1A1A1A",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div
        style={{
          padding: "12px 16px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 12,
          color: "#9CA3AF",
        }}
      >
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#9CA3AF",
              fontSize: 12,
              fontFamily: "'Montserrat', sans-serif",
              padding: "4px 8px",
              borderRadius: 6,
              minHeight: 36,
            }}
            title="Delete lead"
          >
            <Trash2 size={14} />
            Delete
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#A32D2D", fontFamily: "'Montserrat', sans-serif" }}>
              Sure?
            </span>
            <button
              onClick={handleDelete}
              style={{
                background: "#A32D2D",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: 6,
                fontFamily: "'Montserrat', sans-serif",
                minHeight: 36,
              }}
            >
              Yes, delete
            </button>
            <button
              onClick={() => setConfirming(false)}
              style={{
                background: "transparent",
                border: "1px solid #E8E2D8",
                cursor: "pointer",
                fontSize: 11,
                padding: "6px 12px",
                borderRadius: 6,
                fontFamily: "'Montserrat', sans-serif",
                color: "#6B6560",
                minHeight: 36,
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <span>
          {new Date(lead.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

const ScheduleModal = ({
  lead,
  onClose,
  updateLead,
}: {
  lead: Lead;
  onClose: () => void;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const save = async () => {
    if (!date || !time) return;
    const dt = new Date(`${date}T${time}`).toISOString();
    await updateLead(lead.id, { scheduled_at: dt });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 200,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <style>{`
        .schedule-modal {
          background: #FFFFFF;
          border-radius: 16px 16px 0 0;
          padding: 24px;
          width: 100%;
          max-width: 420px;
        }
        @media (min-width: 768px) {
          .schedule-modal-wrap { align-items: center !important; }
          .schedule-modal { border-radius: 12px; }
        }
      `}</style>
      <div className="schedule-modal-wrap" style={{ display: "contents" }} />
      <div className="schedule-modal" onClick={(e) => e.stopPropagation()}>
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "#1A1A1A",
            margin: "0 0 16px",
          }}
        >
          Schedule Appointment
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: 10,
              border: "1px solid #E8E2D8",
              borderRadius: 6,
              fontSize: 14,
              fontFamily: "'Montserrat', sans-serif",
            }}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{
              padding: 10,
              border: "1px solid #E8E2D8",
              borderRadius: 6,
              fontSize: 14,
              fontFamily: "'Montserrat', sans-serif",
            }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                background: "#FFFFFF",
                border: "1px solid #E8E2D8",
                borderRadius: 6,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={save}
              style={{
                flex: 1,
                padding: "10px",
                background: "#C4291C",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 6,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeadsTab = ({ leads, updateLead, deleteLead }: Props) => {
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [scheduleLead, setScheduleLead] = useState<Lead | null>(null);

  const filtered = leads.filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      const inName = l.name?.toLowerCase().includes(q);
      const inEmail = l.email?.toLowerCase().includes(q);
      const inPhone = l.phone?.toLowerCase().includes(q);
      if (!inName && !inEmail && !inPhone) return false;
    }
    return true;
  });

  const pills: { id: LeadStatus | "all"; label: string }[] = [
    { id: "all", label: "All" },
    ...STATUSES.map((s) => ({ id: s, label: getStatusBadge(s).label })),
  ];

  return (
    <div className="leads-wrap" style={{ padding: 24 }}>
      <style>{`
        .leads-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .leads-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1100px) {
          .leads-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .leads-toolbar {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        @media (min-width: 768px) {
          .leads-toolbar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        @media (max-width: 767px) {
          .leads-wrap { padding: 0 !important; }
          .leads-pills-row {
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            flex-wrap: nowrap !important;
            padding: 12px 16px !important;
            gap: 8px !important;
            margin: 0 !important;
          }
          .leads-pills-row::-webkit-scrollbar { display: none; }
          .leads-pills-row > button { flex-shrink: 0; }
          .leads-search {
            margin: 0 16px 12px !important;
            width: calc(100% - 32px) !important;
            min-width: 0 !important;
          }
          .leads-toolbar { gap: 0 !important; margin-bottom: 12px !important; }
          .leads-grid {
            grid-template-columns: 1fr !important;
            padding: 0 16px !important;
            gap: 12px !important;
          }
          .lead-status-dropdown { display: none !important; }
          .lead-status-sheet-overlay { display: block !important; }
        }
      `}</style>

      <div className="leads-toolbar">
        <div className="leads-pills-row" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {pills.map((p) => {
            const active = filter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setFilter(p.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  background: active ? "#1A1A1A" : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#1A1A1A",
                  border: active ? "1px solid #1A1A1A" : "1px solid #E8E2D8",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <input
          className="leads-search"
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #E8E2D8",
            borderRadius: 6,
            fontSize: 13,
            fontFamily: "'Montserrat', sans-serif",
            outline: "none",
            minWidth: 240,
          }}
        />
      </div>

      <div className="leads-grid">
        {filtered.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            updateLead={updateLead}
            deleteLead={deleteLead}
            onScheduleNeeded={setScheduleLead}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            color: "#9CA3AF",
          }}
        >
          No leads match your filters.
        </div>
      )}

      {scheduleLead && (
        <ScheduleModal
          lead={scheduleLead}
          onClose={() => setScheduleLead(null)}
          updateLead={updateLead}
        />
      )}
    </div>
  );
};

export default LeadsTab;
