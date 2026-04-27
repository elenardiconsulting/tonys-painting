import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLeads } from "@/hooks/useLeads";
import Sidebar, { type DashTab } from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";
import DashHeader from "@/components/dashboard/DashHeader";
import OverviewTab from "@/components/dashboard/tabs/OverviewTab";
import LeadsTab from "@/components/dashboard/tabs/LeadsTab";
import CalendarTab from "@/components/dashboard/tabs/CalendarTab";

const TAB_TITLES: Record<DashTab, string> = {
  overview: "Overview",
  leads: "Leads",
  calendar: "Calendar",
  analytics: "Analytics",
};

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<DashTab>("overview");
  const { leads, loading, updateLead } = useLeads();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const newLeadsCount = leads.filter((l) => l.status === "new").length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100dvh",
        background: "#F8F7F4",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .dash-sidebar { display: flex; }
        .dash-bottom-nav { display: none; }
        .dash-content-wrap { padding-bottom: 0; }
        @media (max-width: 767px) {
          .dash-sidebar { display: none !important; }
          .dash-bottom-nav { display: flex !important; }
          .dash-header-date { display: none !important; }
          .dash-content-wrap { padding-bottom: 80px !important; }
        }
      `}</style>

      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        newLeadsCount={newLeadsCount}
        onSignOut={handleSignOut}
      />

      <div className="dash-content-wrap" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <DashHeader title={TAB_TITLES[activeTab]} />
        <main style={{ flex: 1 }}>
          {activeTab === "overview" && <OverviewTab leads={leads} loading={loading} />}
          {activeTab === "leads" && <LeadsTab leads={leads} updateLead={updateLead} />}
          {activeTab === "calendar" && <CalendarTab leads={leads} />}
          {activeTab === "analytics" && (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#9CA3AF",
              }}
            >
              Analytics coming in Part 4.
            </div>
          )}
        </main>
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        newLeadsCount={newLeadsCount}
      />
    </div>
  );
};

export default DashboardPage;
