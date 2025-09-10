import { Modal, Table, Button, Image, Space, Pagination } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PageHeading from "../../Components/Shared/PageHeading";
import img1 from "../../assets/cover.png";
import img2 from "../../assets/cover1.png";
import img3 from "../../assets/cover2.png";

export default function SubcategoryManagement() {
  const [category, setCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const columns = [
    {
      title: "Sl",
      dataIndex: "key",
      key: "sl",
      width: 60,
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Subcategory Name",
      dataIndex: "categoryName",
      key: "categoryName",
      width: 200,
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Listings Count",
      dataIndex: "totalSubcategories",
      key: "totalSubcategories",
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
    </>
  );
}
