import { Modal, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteSubCategoryMutation } from "../../redux/api/subCatagoryApi";

export default function DeleteSubcategoryModal({ open, onCancel, onDeleted, selectedSubcategory }) {
  const [deleteSubCategory, { isLoading }] = useDeleteSubCategoryMutation();

  const handleConfirm = async () => {
    if (!selectedSubcategory?.id) {
      message.error("No subcategory selected");
      return;
    }
    try {
      await deleteSubCategory({ subCategoryId: selectedSubcategory.id }).unwrap();
      onDeleted?.();
      onCancel?.();
      message.success("Subcategory deleted successfully!");
    } catch (error) {
      message.error("Failed to delete subcategory");
    }
  };
  return (
    <Modal
      title="Delete Subcategory"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      <div className="text-center py-4">
        <div className="mb-4">
          <DeleteOutlined className="text-red-500 text-4xl mb-2" />
          <p className="text-lg font-medium mb-2">Are you sure?</p>
          <p className="text-gray-600">
            Do you want to delete the subcategory "{selectedSubcategory?.subcategoryName}"? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <Button onClick={onCancel} size="large">Cancel</Button>
          <Button type="primary" danger onClick={handleConfirm} loading={isLoading} size="large">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
