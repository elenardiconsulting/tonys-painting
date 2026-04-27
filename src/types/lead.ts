export type LeadStatus =
  | "new"
  | "in_contact"
  | "scheduled"
  | "waiting"
  | "closed_won"
  | "closed_lost"
  | "no_show";

export interface Lead {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  service_type: string | null;
  message: string | null;
  status: LeadStatus;
  scheduled_at: string | null;
  notes: string;
  prefer_phone: boolean;
  created_at: string;
  updated_at: string;
}

interface BadgeStyle {
  label: string;
  bg: string;
  color: string;
}

export const getStatusBadge = (status: LeadStatus): BadgeStyle => {
  const map: Record<LeadStatus, BadgeStyle> = {
    new: { label: "New", bg: "#EAF3DE", color: "#3B6D11" },
    in_contact: { label: "In Contact", bg: "#E6F1FB", color: "#185FA5" },
    scheduled: { label: "Scheduled", bg: "#FAEEDA", color: "#854F0B" },
    waiting: { label: "Waiting", bg: "#EEEDFE", color: "#534AB7" },
    closed_won: { label: "Closed Won", bg: "#EAF3DE", color: "#27500A" },
    closed_lost: { label: "Closed Lost", bg: "#FCEBEB", color: "#A32D2D" },
    no_show: { label: "No Show", bg: "#F1EFE8", color: "#5F5E5A" },
  };
  return map[status];
};
