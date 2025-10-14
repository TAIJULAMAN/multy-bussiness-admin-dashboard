import { Table, Button, Image, Space, Form, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApi";
import { getImageBaseUrl } from "../../config/envConfig";
import img1 from "../../assets/cover.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import AddCategoryModal from "../../Components/categories/AddCategoryModal";
import UpdateCategoryModal from "../../Components/categories/UpdateCategoryModal";
import DeleteCategoryModal from "../../Components/categories/DeleteCategoryModal";
import { useState } from "react";
import Loader from "../../Components/Loaders/Loader";

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

  if (isLoading) {
    return <Loader />;
  }

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

  const handleOpenUpdateModal = (category) => {
    setSelectedCategory(category);
    updateForm.setFieldsValue({
      categoryName: category?.categoryName,
    });
    setUpdateModalOpen(true);
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
        <AddCategoryModal
          open={addModalOpen}
          onCancel={() => {
            setAddModalOpen(false);
            form.resetFields();
          }}
          form={form}
          onDone={() => {
            setAddModalOpen(false);
            form.resetFields();
          }}
        />
        <UpdateCategoryModal
          open={updateModalOpen}
          onCancel={() => {
            setUpdateModalOpen(false);
            updateForm.resetFields();
            setSelectedCategory(null);
          }}
          form={updateForm}
          onDone={() => {
            setUpdateModalOpen(false);
            updateForm.resetFields();
            setSelectedCategory(null);
          }}
          selectedCategory={selectedCategory}
        />
        <DeleteCategoryModal
          open={deleteModalOpen}
          onCancel={() => {
            setCategory(null);
            setDeleteModalOpen(false);
          }}
          category={category}
          onDeleted={() => {
            setCategory(null);
            setDeleteModalOpen(false);
          }}
        />
      </ConfigProvider>
    </>
  );
}
