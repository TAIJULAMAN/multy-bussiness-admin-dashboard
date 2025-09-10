import { Modal, Table, Button, Image, Space, Pagination, Form, Input, Upload } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { EyeOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";
import Category_delete_modal from "./Category_delete_modal";
import img1 from "../../assets/cover.png";
import img2 from "../../assets/cover1.png";
import img3 from "../../assets/cover2.png";
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

  // Mock data based on the screenshot
  const categoriesData = [
    {
      key: 1,
      id: 1,
      image: img1,
      categoryName: "Restaurants & Cafes",
      totalSubcategories: 8,
    },
    {
      key: 2,
      id: 2,
      image: img2,
      categoryName: "Retail & E-commerce",
      totalSubcategories: 5,
    },
    {
      key: 3,
      id: 3,
      image: img3,
      categoryName: "Health & Fitness",
      totalSubcategories: 3,
    },
    {
      key: 4,
      id: 4,
      image: img1,
      categoryName: "Health & Fitness",
      totalSubcategories: 9,
    },
    {
      key: 5,
      id: 5,
      image: img2,
      categoryName: "Education & Training",
      totalSubcategories: 1,
    },
    {
      key: 6,
      id: 6,
      image: img3,
      categoryName: "Automotive Services",
      totalSubcategories: 7,
    },
    {
      key: 7,
      id: 7,
      image: img1,
      categoryName: "Real Estate",
      totalSubcategories: 0,
    },
    {
      key: 8,
      id: 8,
      image: img2,
      categoryName: "Travel & Tourism",
      totalSubcategories: 6,
    },
  ];

  const handleAddCategory = async (values) => {
    try {
      // Mock API call - replace with actual API
      console.log("Adding category:", values);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category added successfully!",
      });
      setAddModalOpen(false);
      form.resetFields();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add category. Please try again.",
      });
    }
  };

  const handleUpdateCategory = async (values) => {
    try {
      // Mock API call - replace with actual API
      console.log("Updating category:", values);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category updated successfully!",
      });
      setUpdateModalOpen(false);
      updateForm.resetFields();
      setSelectedCategory(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update category. Please try again.",
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
          onClick={() => navigate(`/subcategories?categoryId=${record.id}&categoryName=${record.categoryName}`)}
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
        <Table
          columns={columns}
          dataSource={categoriesData}
          pagination={false}
          scroll={{ x: 800 }}
          className="custom-table"
        />
        
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
              { max: 100, message: "Category name cannot exceed 100 characters" },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Category Image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
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
            >
              Add Category
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
              { max: 100, message: "Category name cannot exceed 100 characters" },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Category Image (Optional)"
          >
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
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#0091FF]"
            >
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
