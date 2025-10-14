import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useCreateCategoryMutation } from "../../redux/api/categoryApi";

export default function AddCategoryModal({ open, onCancel, form, onDone }) {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", values?.categoryName?.trim());
      formData.append("category-image", values.image.fileList[0].originFileObj);

      const response = await createCategory(formData).unwrap();
      if (response?.success) {
        Swal.fire({ icon: "success", title: "Success", text: response.message || "Category created successfully!" });
        form.resetFields();
        onDone?.();
        onCancel?.();
      } else {
        Swal.fire({ icon: "error", title: "Error", text: response?.message || "Failed to create category" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error?.data?.message || "Failed to create category. Please try again." });
    }
  };

  return (
    <Modal title="Add New Category" open={open} onCancel={onCancel} footer={null} centered>
      <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4">
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[
            { required: true, message: "Please enter category name" },
            { max: 100, message: "Category name cannot exceed 100 characters" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Category Image"
          rules={[{ required: true, message: "Please upload an image" }]}
          valuePropName="file"
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isLt5M = file.size / 1024 / 1024 < 5;
              if (!isLt5M) {
                Swal.fire({ icon: "error", title: "File too large", text: "Image must be smaller than 5MB!" });
                return false;
              }
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                Swal.fire({ icon: "error", title: "Invalid file type", text: "Please upload an image file!" });
                return false;
              }
              return false;
            }}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" className="bg-[#0091FF]" loading={isLoading} disabled={isLoading}>
            {isLoading ? "Creating..." : "Add Category"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
