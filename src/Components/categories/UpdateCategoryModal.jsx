import { Modal, Form, Input, Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useUpdateCategoryMutation } from "../../redux/api/categoryApi";
import Loader from "../Loaders/Loader";
import { useEffect } from "react";

export default function UpdateCategoryModal({
  open,
  onCancel,
  form,
  onDone,
  selectedCategory,
}) {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (open && selectedCategory) {
      form.setFieldsValue({
        categoryName: selectedCategory?.categoryName,
      });
    }
  }, [open, selectedCategory, form]);

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", values.categoryName.trim());
      if (
        values.image &&
        values.image.fileList &&
        values.image.fileList.length > 0
      ) {
        formData.append(
          "category-image",
          values.image.fileList[0].originFileObj
        );
      }
      const response = await updateCategory({
        categoryId: selectedCategory.id,
        data: formData,
      }).unwrap();

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message || "Category updated successfully!",
        });
        form.resetFields();
        onDone?.();
        onCancel?.();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Failed to update category",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.data?.message ||
          "Failed to update category. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Modal
      title="Update Category"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-4"
      >
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
          label="Category Image (Optional)"
          valuePropName="file"
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isLt5M = file.size / 1024 / 1024 < 5;
              if (!isLt5M) {
                Swal.fire({
                  icon: "error",
                  title: "File too large",
                  text: "Image must be smaller than 5MB!",
                });
                return false;
              }
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                Swal.fire({
                  icon: "error",
                  title: "Invalid file type",
                  text: "Please upload an image file!",
                });
                return false;
              }
              return false; // prevent auto-upload
            }}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload New Image</Button>
          </Upload>
        </Form.Item>

        {selectedCategory && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <Image
              src={selectedCategory.image}
              alt={selectedCategory.categoryName}
              width={80}
              height={80}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#0091FF]"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Category"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
