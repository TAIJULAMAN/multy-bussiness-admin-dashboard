import { useState } from "react";
import logo from "../../assets/icons/logo.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationsModal from "../notification/NotificationsModal";
import { decodeAuthToken } from "../../Utils/decode-access-token";
import { useGetAllNotificationQuery } from "../../redux/api/notificationApi";
import { useGetUserProfileQuery } from "../../redux/api/profileApi";
import { useSelector } from "react-redux";
import ProfileMini from "../profile/ProfileMini";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const token = useSelector((state) => state.auth.token);
  const decodedToken = decodeAuthToken(token);

  const { data: profileData } = useGetUserProfileQuery({
    _id: decodedToken?.id,
  });

  const { data: notificationsData } = useGetAllNotificationQuery();

  if (!isOpen) return null;

  return (
    <div className="px-10 h-20 flex justify-between items-center bg-white shadow">
      <img className="h-12" src={logo} alt="Dudu" />

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative bg-[#cce9ff] p-[15px] rounded-full transition"
        >
          <IoIosNotificationsOutline size={22} />
          {notificationsData?.data?.length > 0 && (
            <span className="absolute top-1 right-1 bg-[#0091FF] text-xs text-white px-1 rounded-full">
              {notificationsData?.data?.length}
            </span>
          )}
        </button>

        {/* Profile */}
        <ProfileMini
          image={profileData?.data?.image}
          name={profileData?.data?.name || "Admin Person"}
          role={profileData?.data?.role || "Admin"}
        />
      </div>

      {/* Notifications Modal */}
      <NotificationsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notificationsData={notificationsData}
        role={decodedToken?.role || "Admin"}
      />
    </div>
  );
}
