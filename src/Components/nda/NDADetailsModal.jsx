import { Modal } from "antd";
import { getImageBaseUrl } from "../../config/envConfig";

export default function NDADetailsModal({ open, onCancel, selectedNDA }) {
  return (
    <Modal open={open} centered onCancel={onCancel} footer={null} title="NDA Details">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-5">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  selectedNDA?.userId?.image
                    ? `${getImageBaseUrl()}/profile-image/${selectedNDA?.userId?.image}`
                    : "https://avatar.iran.liara.run/public/20"
                }
                alt={selectedNDA?.userName}
                className="w-16 h-16 object-cover rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold">{selectedNDA?.userName}</h1>
                <p className="text-gray-600">{selectedNDA?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-2">NDA Information</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">User Role</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">{selectedNDA?.userRole}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Agreement Type</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">{selectedNDA?.agreementType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">{selectedNDA?.contactNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Business Location</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">{selectedNDA?.country}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Submission Date</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">{selectedNDA?.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">{selectedNDA?.status}</p>
                </div>
              </div>

              {selectedNDA?.agreementContent && (
                <div>
                  <h2 className="text-xl font-bold mb-2">Agreement Content</h2>
                  <p className="mt-1 p-4 bg-gray-50 rounded border">{selectedNDA?.agreementContent}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
