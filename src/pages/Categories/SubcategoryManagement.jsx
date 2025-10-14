import { Table, Button, Space, Form, ConfigProvider } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";
import AddSubcategoryModal from "../../Components/subcategories/AddSubcategoryModal";
import EditSubcategoryModal from "../../Components/subcategories/EditSubcategoryModal";
import DeleteSubcategoryModal from "../../Components/subcategories/DeleteSubcategoryModal";
import { useGetAllSubCategoryQuery } from "../../redux/api/subCatagoryApi";

export default function SubcategoryManagement() {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { data: subcategoriesData, isLoading } = useGetAllSubCategoryQuery({
    categoryId,
    page,
  });

  useEffect(() => {
    if (!subcategoriesData) return;
    const list = subcategoriesData?.data ?? subcategoriesData ?? [];
    const rows = list.map((item, idx) => ({
      key: idx + 1,
      id: item._id || item.id || `${idx}`,
      subcategoryName: item.subcategoryName || item.name || "Untitled",
      listingsCount: item?.businessCount ?? 0,
    }));
    setSubcategories(rows);
  }, [subcategoriesData]);

  // Use mapped rows so columns (subcategoryName, listingsCount) align
  const dataSource = Array.isArray(subcategories) ? subcategories : [];

  // Reset pagination to first page when category changes
  useEffect(() => {
    setPage(1);
  }, [categoryId]);

  // Open Edit Modal
  const openEditModal = (record) => {
    setSelectedSubcategory(record);
    editForm.setFieldsValue({
      subcategoryName: record.subcategoryName,
    });
    setEditModalOpen(true);
  };

  // Open Delete Modal
  const openDeleteModal = (record) => {
    setSelectedSubcategory(record);
    setDeleteModalOpen(true);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "sl",
      width: 60,
      // Use a safe fallback for metaLimit
      render: (text, record, index) =>
        (page - 1) * (subcategoriesData?.meta?.limit || 10) + index + 1,
    },
    {
      title: "Subcategory Name",
      dataIndex: "subcategoryName",
      key: "subcategoryName",
      width: 200,
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Listings Count",
      dataIndex: "listingsCount",
      key: "listingsCount",
      width: 150,
      align: "center",
      render: (count) => <span className="font-semibold">{count}</span>,
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
            onClick={() => openEditModal(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => openDeleteModal(record)}
          />
        </Space>
      ),
    },
  ];

  // Safe defaults for pagination
  const metaPage = subcategoriesData?.meta?.page;
  const metaLimit = subcategoriesData?.meta?.limit;
  const metaTotal = subcategoriesData?.meta?.total;

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageHeading title="Subcategories Management" />
        <div className="text-white">
          <Button
            type="primary"
            size="large"
            className="bg-[#0091FF] border-[#0091FF] hover:bg-[#0077CC] hover:border-[#0077CC]"
            onClick={() => setAddModalOpen(true)}
          >
            + Add New Subcategory
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
          dataSource={dataSource}
          columns={columns}
          rowKey={(row) => row._id || row.id || row.key}
          pagination={{
            pageSize: metaLimit,
            total: metaTotal,
            current: metaPage,
            onChange: (newPage) => setPage(newPage),
          }}
          scroll={{ x: "max-content" }}
          loading={
            isLoading || loading || isUpdating || isCreating || isDeleting
          }
        />

        <AddSubcategoryModal
          open={addModalOpen}
          onCancel={() => {
            setAddModalOpen(false);
            addForm.resetFields();
          }}
          form={addForm}
          onDone={() => {
            setAddModalOpen(false);
            addForm.resetFields();
          }}
        />

        <EditSubcategoryModal
          open={editModalOpen}
          onCancel={() => {
            setEditModalOpen(false);
            editForm.resetFields();
            setSelectedSubcategory(null);
          }}
          form={editForm}
          onDone={() => {
            setEditModalOpen(false);
            editForm.resetFields();
            setSelectedSubcategory(null);
          }}
          selectedSubcategory={selectedSubcategory}
        />

        <DeleteSubcategoryModal
          open={deleteModalOpen}
          onCancel={() => {
            setDeleteModalOpen(false);
            setSelectedSubcategory(null);
          }}
          onDeleted={() => {
            setDeleteModalOpen(false);
            setSelectedSubcategory(null);
          }}
          selectedSubcategory={selectedSubcategory}
        />
      </ConfigProvider>
    </>
  );
}
