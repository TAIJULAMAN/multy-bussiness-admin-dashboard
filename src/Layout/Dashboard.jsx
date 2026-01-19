import { useState } from "react";
import Sidebar from "../Components/Shared/Sidebar.jsx";
import Header from "../Components/Shared/Header.jsx";
import { Outlet } from "react-router";

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = window.innerWidth < 768;

  return (
    <div className=" bg-[#f0f6ff] ">
      <Header
        onToggle={() => {
          if (isMobile) {
            setMobileOpen(!mobileOpen);
          } else {
            setCollapsed(!collapsed);
          }
        }}
      />

      <div className="flex pt-20 h-[calc(100vh)]">
        {/* Sidebar */}
        <aside
          className={`
            bg-white transition-all duration-300 ease-in-out
            ${isMobile ? "absolute z-40" : "relative"}
            ${mobileOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}
            ${collapsed && !isMobile ? "w-[80px]" : "w-[300px]"}
            h-full overflow-y-auto
          `}
        >
          <Sidebar
            collapsed={collapsed}
            isMobile={isMobile}
            onClose={() => setMobileOpen(false)}
          />
        </aside>

        {/* Overlay (Mobile only) */}
        {isMobile && mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40 z-30"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden bg-[var(--color-gray-20)]">
          <div className="h-full overflow-y-auto p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
