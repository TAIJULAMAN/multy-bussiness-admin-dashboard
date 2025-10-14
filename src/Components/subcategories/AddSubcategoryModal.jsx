import { Modal, Form, Input, Button, message } from "antd";
import { useSearchParams } from "react-router-dom";
import { useCreateSubCategoryMutation } from "../../redux/api/subCatagoryApi";

export default function AddSubcategoryModal({ open, onCancel, form, onDone }) {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();

  const handleFinish = async (values) => {
    if (!categoryId) {
      message.error("Missing categoryId");
      return;
    }
    try {
      await createSubCategory({ name: values.subcategoryName, categoryId }).unwrap();
      form.resetFields();
      onDone?.();
      onCancel?.();
      message.success("Subcategory added successfully!");
    } catch (error) {
      message.error("Failed to add subcategory");
    }
  };

  return (
    <Modal
      title="Add New Subcategory"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4">
        <Form.Item
          label="Subcategory Name"
          name="subcategoryName"
          rules={[
            { required: true, message: "Please enter subcategory name" },
            { min: 2, message: "Subcategory name must be at least 2 characters" },
            { max: 50, message: "Subcategory name cannot exceed 50 characters" },
          ]}
        >
          <Input placeholder="Enter subcategory name" size="large" />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onCancel} size="large">Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            size="large"
            className="bg-[#0091FF] border-[#0091FF] hover:bg-[#0077CC] hover:border-[#0077CC]"
          >
            Add Subcategory
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
