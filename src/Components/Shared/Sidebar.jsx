import { NavLink, useLocation, Link } from "react-router";
import { SidebarLink } from "../../Utils/Sideber/SidebarLink.jsx";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = ({ collapsed, isMobile, onClose }) => {
  const location = useLocation();

  return (
    <div className="h-full px-2 pt-4 pb-6 flex flex-col gap-3">
      {SidebarLink.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={isMobile ? onClose : undefined}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all
            ${
              item.path === location.pathname
                ? "bg-[#0091FF] text-white"
                : "bg-white text-[#111]"
            }`}
        >
          <span className="text-xl">{item.icon}</span>
          {(!collapsed || isMobile) && <span>{item.label}</span>}
        </NavLink>
      ))}

      {/* Logout */}
      <div className="mt-auto">
        <Link to="/login">
          <button className="flex items-center gap-3 w-full py-3 rounded-lg bg-[#bbe5fc] hover:bg-[#0091FF] text-white justify-center transition">
            <RiLogoutBoxLine size={18} />
            {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
