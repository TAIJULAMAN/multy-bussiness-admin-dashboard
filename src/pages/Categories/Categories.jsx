import {
  Modal,
  Table,
  Button,
  Image,
  Space,
  Pagination,
  Form,
  Input,
  Upload,
  Spin,
} from "antd";
import { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";
import Category_delete_modal from "./Category_delete_modal";
import { useGetAllCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation } from "../../redux/api/categoryApi";
import { getImageBaseUrl } from "../../config/envConfig";
import img1 from "../../assets/cover.png";
import Swal from "sweetalert2";

export default function Categories() {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  const {
    data: categoriesResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllCategoryQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  console.log("categoriesResponse from category", categoriesResponse);

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
      if (!values.categoryName?.trim()) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Category name is required!",
        });
        return;
      }

      if (!values.image || values.image.fileList.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Category image is required!",
        });
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("categoryName", values.categoryName.trim());
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
        // Data will auto-refresh due to invalidatesTags
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
        text: error?.data?.message || "Failed to create category. Please try again.",
      });
    }
  };
  

  const handleUpdateCategory = async (values) => {
    try {
      // Validate required fields
      if (!values.categoryName?.trim()) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Category name is required!",
        });
        return;
      }

      if (!selectedCategory?.id) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Category ID is missing. Please try again.",
        });
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("categoryName", values.categoryName.trim());
      
      // Only append image if a new one is selected
      if (values.image && values.image.fileList && values.image.fileList.length > 0) {
        formData.append("category-image", values.image.fileList[0].originFileObj);
      }

      // Call API - pass FormData directly
      const response = await updateCategory({
        id: selectedCategory.id,
        data: formData
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
        // Data will auto-refresh due to invalidatesTags
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
        text: error?.data?.message || "Failed to update category. Please try again.",
      });
    }
  };

  const handleOpenUpdateModal = (category) => {
    setSelectedCategory(category);
    updateForm.setFieldsValue({
      categoryName: category.categoryName,
    });
    setUpdateModalOpen(true);
  };

  const columns = [
    {
      title: "Sl",
      dataIndex: "key",
      key: "sl",
      width: 60,
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
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
      align: "center",
      render: (count) => <span className="font-semibold">{count}</span>,
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
          onClick={() =>
            navigate(
              `/subcategories?categoryId=${record.id}&categoryName=${record.categoryName}`
            )
          }
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
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            className="bg-blue-500"
            onClick={() => handleOpenUpdateModal(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => {
              setCategory(record);
              setDeleteModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

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

      <div className="bg-white rounded-lg shadow-sm">
        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 mb-4">Failed to load categories</p>
            <Button onClick={refetch} type="primary" className="bg-[#0091FF]">
              Retry
            </Button>
          </div>
        ) : (
          <>
            <Spin spinning={isLoading}>
              <Table
                columns={columns}
                dataSource={categoriesData}
                pagination={false}
                scroll={{ x: 800 }}
                className="custom-table"
                locale={{
                  emptyText: isLoading ? "Loading..." : "No categories found",
                }}
              />
            </Spin>

            <div className="flex justify-center py-5">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={categoriesData.length}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
              />
            </div>
          </>
        )}
      </div>

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
                const isImage = file.type.startsWith('image/');
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

          <Form.Item name="image" label="Category Image (Optional)">
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
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
            <Button type="primary" htmlType="submit" className="bg-[#0091FF]">
              Update Category
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
        <Category_delete_modal
          category={category}
          onclose={() => {
            setCategory(null);
            setDeleteModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
