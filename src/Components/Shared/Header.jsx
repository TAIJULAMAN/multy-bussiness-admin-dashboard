import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/icons/logo.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationsModal from "../notification/NotificationsModal";
import { decodeAuthToken } from "../../Utils/decode-access-token";
import { useGetAllNotificationQuery } from "../../redux/api/notificationApi";
import { useGetUserProfileQuery } from "../../redux/api/profileApi";
import { useSelector } from "react-redux";
import ProfileMini from "../profile/ProfileMini";
import { CiBarcode } from "react-icons/ci";
import { PiSidebarLight } from "react-icons/pi";

export default function Header({ onToggle }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const decodedToken = decodeAuthToken(token);

  const { data: profileData } = useGetUserProfileQuery({
    _id: decodedToken?.id,
  });

  const { data: notificationsData } = useGetAllNotificationQuery();

  return (
    <div className="px-6 h-20 flex justify-between items-center bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        {/* ☰ BAR ICON */}
        <button
          onClick={onToggle}
          className="p-2 rounded hover:bg-gray-200 transition"
        >
        
         <PiSidebarLight size={30}/>
        </button>

        <img className="h-12" src={logo} alt="Logo" />
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative bg-[#cce9ff] p-[15px] rounded-full"
        >
          <IoIosNotificationsOutline size={22} />
          {notificationsData?.data?.length > 0 && (
            <span className="absolute top-1 right-1 bg-[#0091FF] text-xs text-white px-1 rounded-full">
              {notificationsData?.data?.length}
            </span>
          )}
        </button>

        <ProfileMini
          image={profileData?.data?.image}
          name={profileData?.data?.name || "Admin Person"}
          role={profileData?.data?.role || "Admin"}
        />
      </div>

      <NotificationsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notificationsData={notificationsData}
        role={decodedToken?.role || "Admin"}
      />
    </div>
  );
}
