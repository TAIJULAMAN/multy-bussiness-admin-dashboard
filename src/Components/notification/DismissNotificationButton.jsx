import { RxCross2 } from "react-icons/rx";
import { useDeleteNotificationMutation } from "../../redux/api/notificationApi";
import toast from "react-hot-toast";

export default function DismissNotificationButton({ notificationId, role, onDone }) {
  const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

  const handleClick = async () => {
    try {
      const params = { notificationId, role: role || "Admin" };
      const result = await deleteNotification(params).unwrap();
      if (result) {
        toast.success("Notification deleted successfully");
        onDone?.(notificationId);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete notification");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
      aria-label="Dismiss notification"
    >
      <RxCross2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
    </button>
  );
}
