import React, { useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/icons/logo.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Modal } from "antd";
import { RxCross2 } from "react-icons/rx";
import { decodeAuthToken } from "../../Utils/decode-access-token";
import toast from "react-hot-toast";
import {
  useGetAllNotificationQuery,
  useDeleteNotificationMutation,
} from "../../redux/api/notificationApi";
import { useSelector } from "react-redux";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const token = useSelector((state) => state.auth.token);
  console.log(token);
  const decodedToken = decodeAuthToken(token);
  console.log("decodedToken", decodedToken);

  // const { data: profileData } = useGetProfileQuery({ _id: decodedToken?.id });
  // console.log("profileData from header", profileData);

  const { data: notificationsData } = useGetAllNotificationQuery();
  console.log("notificationsData", notificationsData);

  const [deleteNotification] = useDeleteNotificationMutation();

  const handleDismiss = async (notificationId) => {
    console.log("handleDismiss called with:", notificationId);
    console.log("decodedToken:", decodedToken);
    console.log("role:", decodedToken?.role || "Admin");

    try {
      const params = {
        notificationId,
        role: decodedToken?.role || "Admin",
      };
      console.log("Sending delete request with params:", params);

      const result = await deleteNotification(params).unwrap();
      console.log("Delete result:", result);

      if (result) {
        toast.success("Notification deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      console.error("Error details:", error?.data || error?.message);
      toast.error("Failed to delete notification");
    }
  };

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
        <Link to="/profile" className="flex items-center gap-2">
          <img
            src="https://avatar.iran.liara.run/public/26"
            className="w-8 md:w-12 h-8 md:h-12 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="hidden md:flex flex-col items-start">
            <h3 className="text-gray-800 text-sm">Shah Aman</h3>
            <p className="text-xs px-2 py-1 bg-[#cce9ff] text-[#0091FF] rounded">
              Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Modal for Notifications */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="Notifications"
      >
        <div className="py-4 max-h-[70vh] overflow-y-auto">
          {notificationsData?.data?.length > 0 ? (
            notificationsData?.data?.map((notification) => (
              <div
                key={notification?._id}
                className="relative p-3 bg-white border rounded-lg mb-3"
              >
                <button
                  onClick={() => handleDismiss(notification?._id)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Dismiss notification"
                >
                  <RxCross2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {notification?.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {notification?.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">No notifications.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Header;
