import {
  Modal,
  Table,
  Button,
  Image,
  Space,
  Form,
  Input,
  Upload,
  ConfigProvider,
} from "antd";
import { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";
import {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/categoryApi";
import { getImageBaseUrl } from "../../config/envConfig";
import img1 from "../../assets/cover.png";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

export default function Categories() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  const { data: categoriesResponse, isLoading } = useGetAllCategoryQuery({
    page,
  });
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
    console.log("updateCategory", updateCategory)
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const categoriesData =
    categoriesResponse?.data?.map((category, index) => ({
      key: category._id || category.id || index + 1,
      id: category._id || category.id,
      image: category.categoryImage
        ? `${getImageBaseUrl()}/category-image/${category.categoryImage}`
        : img1,
      categoryName: category.categoryName,
      totalSubcategories: category.subCategoryCount || 0,
    })) || [];

  const handleAddCategory = async (values) => {
    try {
      // Validate required fields
      // if (!values.categoryName?.trim()) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Validation Error",
      //     text: "Category name is required!",
      //   });
      //   return;
      // }

      // if (!values.image || values.image.fileList.length === 0) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Validation Error",
      //     text: "Category image is required!",
      //   });
      //   return;
      // }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("categoryName", values?.categoryName?.trim());
      formData.append("category-image", values.image.fileList[0].originFileObj);

      // Call API
      const response = await createCategory(formData).unwrap();

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message || "Category created successfully!",
        });
        setAddModalOpen(false);
        form.resetFields();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Failed to create category",
        });
      }
    } catch (error) {
      console.error("Create category error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.data?.message ||
          "Failed to create category. Please try again.",
      });
    }
  };

  const handleUpdateCategory = async (values) => {
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
      // console.log(selectedCategory);
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
        setUpdateModalOpen(false);
        updateForm.resetFields();
        setSelectedCategory(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Failed to update category",
        });
      }
    } catch (error) {
      console.error("Update category error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.data?.message ||
          "Failed to update category. Please try again.",
      });
    }
  };

  const handleOpenUpdateModal = (category) => {
    setSelectedCategory(category);
    updateForm.setFieldsValue({
      categoryName: category?.categoryName,
    });
    setUpdateModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    try {
      // console.log(selectedCategory);
      const response = await deleteCategory(category.id).unwrap();

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message || "Category deleted successfully!",
        });
        setCategory(null);
        setDeleteModalOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Failed to delete category",
        });
      }
    } catch (error) {
      console.error("Delete category error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.data?.message ||
          "Failed to delete category. Please try again.",
      });
    }
  };

  const columns = [
    {
      title: "Sl",
      dataIndex: "key",
      key: "sl",
      width: 60,
      render: (text, record, index) => (page - 1) * metaLimit + index + 1,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image) => (
        <Image
          src={image}
          alt="Category"
          width={60}
          height={60}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      width: 200,
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Total Subcategories",
      dataIndex: "totalSubcategories",
      key: "totalSubcategories",
      width: 150,
    },
    {
      title: "View Subcategories",
      key: "viewSubcategories",
      width: 150,
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          className="bg-blue-500"
          onClick={() => navigate(`/subcategories?categoryId=${record.id}`)}
        >
          View
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <button
            onClick={() => handleOpenUpdateModal(record)}
            className="border border-green-500 rounded-lg p-1 bg-green-100 text-green-600"
            title="Edit Listing"
          >
            <FiEdit className="w-8 h-8 text-green-600" />
          </button>
          <button
            onClick={() => {
              setCategory(record); // Set the category state for deletion
              setDeleteModalOpen(true); // Open the confirmation modal
            }}
            className="bg-[#FEE2E2] border border-red-500 rounded-lg p-1 text-red-600"
          >
            <RiDeleteBin6Line className="w-8 h-8 text-xl text-[#EF4444] font-bold leading-none cursor-pointer" />
          </button>
        </Space>
      ),
    },
  ];

  const metaPage = categoriesResponse?.meta?.page;
  const metaLimit = categoriesResponse?.meta?.limit;
  const metaTotal = categoriesResponse?.meta?.total;

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageHeading title="Categories Management" />
        <div className="text-white">
          <Button
            type="primary"
            size="large"
            className="bg-[#0091FF] border-[#0091FF] hover:bg-[#0077CC] hover:border-[#0077CC]"
            onClick={() => setAddModalOpen(true)}
          >
            + Add New Category
          </Button>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimary: "#0091ff",
              colorPrimaryHover: "#0091ff",
              itemActiveBg: "#0091ff",
              itemActiveColor: "#ffffff",
              colorBgTextHover: "#0091ff",
              colorText: "#0091ff",
            },
            Table: {
              headerBg: "#0091ff",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#0091ff",
            },
          },
        }}
      >
        <Table
          dataSource={categoriesData}
          columns={columns}
          pagination={{
            pageSize: metaLimit,
            total: metaTotal,
            current: metaPage,
            onChange: (newPage) => setPage(newPage),
          }}
          scroll={{ x: "max-content" }}
        />

        {/* Add Category Modal */}
        <Modal
          title="Add New Category"
          open={addModalOpen}
          onCancel={() => {
            setAddModalOpen(false);
            form.resetFields();
          }}
          footer={null}
          centered
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddCategory}
            className="mt-4"
          >
            <Form.Item
              name="categoryName"
              label="Category Name"
              rules={[
                { required: true, message: "Please enter category name" },
                {
                  max: 100,
                  message: "Category name cannot exceed 100 characters",
                },
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
                  // Check file size (5MB limit)
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    Swal.fire({
                      icon: "error",
                      title: "File too large",
                      text: "Image must be smaller than 5MB!",
                    });
                    return false;
                  }
                  // Check file type
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    Swal.fire({
                      icon: "error",
                      title: "Invalid file type",
                      text: "Please upload an image file!",
                    });
                    return false;
                  }
                  return false; // Prevent auto upload
                }}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => {
                  setAddModalOpen(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#0091FF]"
                loading={isCreating}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Add Category"}
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Update Category Modal */}
        <Modal
          title="Update Category"
          open={updateModalOpen}
          onCancel={() => {
            setUpdateModalOpen(false);
            updateForm.resetFields();
            setSelectedCategory(null);
          }}
          footer={null}
          centered
        >
          <Form
            form={updateForm}
            layout="vertical"
            onFinish={handleUpdateCategory}
            className="mt-4"
          >
            <Form.Item
              name="categoryName"
              label="Category Name"
              rules={[
                { required: true, message: "Please enter category name" },
                {
                  max: 100,
                  message: "Category name cannot exceed 100 characters",
                },
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
                  // Check file size (5MB limit)
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    Swal.fire({
                      icon: "error",
                      title: "File too large",
                      text: "Image must be smaller than 5MB!",
                    });
                    return false;
                  }
                  // Check file type
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    Swal.fire({
                      icon: "error",
                      title: "Invalid file type",
                      text: "Please upload an image file!",
                    });
                    return false;
                  }
                  return false; // Prevent auto upload
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
              <Button
                onClick={() => {
                  setUpdateModalOpen(false);
                  updateForm.resetFields();
                  setSelectedCategory(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#0091FF]"
                loading={isUpdating}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          open={deleteModalOpen}
          centered
          footer={null}
          onCancel={() => {
            setCategory(null);
            setDeleteModalOpen(false);
          }}
        >
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Delete Category
              </h2>
              <p className="text-gray-600">
                Are you sure you want to delete{" "}
                <strong>"{category?.categoryName}"</strong>? This action cannot
                be undone and will also remove all its sub-categories.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => {
                  setCategory(null);
                  setDeleteModalOpen(false);
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                danger
                onClick={handleDeleteCategory}
                loading={isDeleting}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
}
