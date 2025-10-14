import { useRef, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { SidebarLink } from "../../Utils/Sideber/SidebarLink.jsx";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [setting_active, set_setting_active] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.querySelector(".active")) {
      setOpen(true);
      set_setting_active(true);
    } else {
      set_setting_active(false);
    }
  }, [ref, location.pathname]);

  return (
    <div className="px-4 pb-10 flex justify-start flex-col gap-3 sidebar">
      {SidebarLink?.map((item) => (
        <NavLink
          onClick={() => {
            setOpen(false);
            set_setting_active(false);
          }}
          to={item?.path}
          style={{
            width: "100%",
            justifyContent: "start",
            paddingLeft: "14px",
            paddingRight: "14px",
          }}
          className={`button-white w-full ${
            item?.path === location.pathname
              ? "!bg-[#0091FF] !text-white"
              : "!bg-white !text-[#111]"
          } whitespace-nowrap links`}
          key={item?.path}
        >
          {item?.icon} {item?.label}
        </NavLink>
      ))}
      {/* Logout Button */}
      <div className="mt-10 w-full px-4 text-gray-800 hover:text-white">
        <Link to="/login">
          <button className="flex items-center gap-4 w-full py-3 rounded-lg bg-[#bbe5fc] hover:bg-[#0091FF] duration-200  text-white justify-center ">
            <RiLogoutBoxLine className="w-5 h-5 font-bold" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
