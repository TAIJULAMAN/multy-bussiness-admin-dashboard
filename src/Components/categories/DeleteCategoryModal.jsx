import { Modal, Button } from "antd";
import Swal from "sweetalert2";
import { useDeleteCategoryMutation } from "../../redux/api/categoryApi";

export default function DeleteCategoryModal({ open, onCancel, category, onDeleted }) {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleConfirm = async () => {
    try {
      const response = await deleteCategory(category?.id).unwrap();
      if (response?.success) {
        Swal.fire({ icon: "success", title: "Success", text: response?.message || "Category deleted successfully!" });
        onDeleted?.();
        onCancel?.();
      } else {
        Swal.fire({ icon: "error", title: "Error", text: response?.message || "Failed to delete category" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error?.data?.message || "Failed to delete category. Please try again." });
    }
  };

  return (
    <Modal open={open} centered footer={null} onCancel={onCancel}>
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Delete Category</h2>
          <p className="text-gray-600">
            Are you sure you want to delete <strong>"{category?.categoryName}"</strong>? This action cannot be undone and will also remove all its sub-categories.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} disabled={isLoading}>Cancel</Button>
          <Button type="primary" danger onClick={handleConfirm} loading={isLoading} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
