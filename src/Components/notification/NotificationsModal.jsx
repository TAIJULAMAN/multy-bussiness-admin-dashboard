import { Modal } from "antd";
import DismissNotificationButton from "./DismissNotificationButton";

export default function NotificationsModal({ open, onClose, notificationsData, onDismiss, role, title = "Notifications" }) {
  return (
    <Modal open={open} centered onCancel={onClose} footer={null} title={title}>
      <div className="py-4 max-h-[70vh] overflow-y-auto">
        {notificationsData?.data?.length > 0 ? (
          notificationsData?.data?.map((notification) => (
            <div key={notification?._id} className="relative p-3 bg-white border rounded-lg mb-3">
              <DismissNotificationButton
                notificationId={notification?._id}
                role={role}
                onDone={() => onDismiss?.(notification?._id)}
              />
              <div className="flex gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{notification?.title}</h3>
                  <p className="text-sm text-gray-700">{notification?.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
  );
}
