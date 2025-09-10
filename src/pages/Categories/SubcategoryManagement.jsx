import { Modal, Table, Button, Space, Pagination, Form, Input, message } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";

export default function SubcategoryManagement() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const categoryName = searchParams.get('categoryName');
  
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Initialize subcategories data
  useEffect(() => {
    const initialData = [
      {
        key: 1,
        id: 1,
        subcategoryName: "Fast Food",
        listingsCount: 25,
      },
      {
        key: 2,
        id: 2,
        subcategoryName: "Fine Dining",
        listingsCount: 12,
      },
      {
        key: 3,
        id: 3,
        subcategoryName: "Coffee Shops",
        listingsCount: 18,
      },
      {
        key: 4,
        id: 4,
        subcategoryName: "Bakeries",
        listingsCount: 8,
      },
      {
        key: 5,
        id: 5,
        subcategoryName: "Food Trucks",
        listingsCount: 15,
      },
    ];
    setSubcategories(initialData);
  }, []);

  // Handle Add Subcategory
  const handleAddSubcategory = async (values) => {
    setLoading(true);
    try {
      const newSubcategory = {
        key: subcategories.length + 1,
        id: subcategories.length + 1,
        subcategoryName: values.subcategoryName,
        listingsCount: 0,
      };
      setSubcategories([...subcategories, newSubcategory]);
      setAddModalOpen(false);
      addForm.resetFields();
      message.success('Subcategory added successfully!');
    } catch (error) {
      message.error('Failed to add subcategory');
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Subcategory
  const handleEditSubcategory = async (values) => {
    setLoading(true);
    try {
      const updatedSubcategories = subcategories.map(sub => 
        sub.id === selectedSubcategory.id 
          ? { ...sub, subcategoryName: values.subcategoryName }
          : sub
      );
      setSubcategories(updatedSubcategories);
      setEditModalOpen(false);
      editForm.resetFields();
      setSelectedSubcategory(null);
      message.success('Subcategory updated successfully!');
    } catch (error) {
      message.error('Failed to update subcategory');
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Subcategory
  const handleDeleteSubcategory = async () => {
    setLoading(true);
    try {
      const updatedSubcategories = subcategories.filter(sub => sub.id !== selectedSubcategory.id);
      setSubcategories(updatedSubcategories);
      setDeleteModalOpen(false);
      setSelectedSubcategory(null);
      message.success('Subcategory deleted successfully!');
    } catch (error) {
      message.error('Failed to delete subcategory');
    } finally {
      setLoading(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (record) => {
    setSelectedSubcategory(record);
    editForm.setFieldsValue({
      subcategoryName: record.subcategoryName
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
      title: "Sl",
      dataIndex: "key",
      key: "sl",
      width: 60,
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
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

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageHeading title={`${categoryName || 'Category'} - Subcategories Management`} />
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

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={subcategories}
          pagination={false}
          scroll={{ x: 800 }}
          className="custom-table"
          loading={loading}
        />

        <div className="flex justify-center py-5">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={subcategories.length}
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

      {/* Add Subcategory Modal */}
      <Modal
        title="Add New Subcategory"
        open={addModalOpen}
        onCancel={() => {
          setAddModalOpen(false);
          addForm.resetFields();
        }}
        footer={null}
        width={500}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddSubcategory}
          className="mt-4"
        >
          <Form.Item
            label="Subcategory Name"
            name="subcategoryName"
            rules={[
              { required: true, message: 'Please enter subcategory name' },
              { min: 2, message: 'Subcategory name must be at least 2 characters' },
              { max: 50, message: 'Subcategory name cannot exceed 50 characters' }
            ]}
          >
            <Input 
              placeholder="Enter subcategory name"
              size="large"
            />
          </Form.Item>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              onClick={() => {
                setAddModalOpen(false);
                addForm.resetFields();
              }}
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              size="large"
              className="bg-[#0091FF] border-[#0091FF] hover:bg-[#0077CC] hover:border-[#0077CC]"
            >
              Add Subcategory
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Edit Subcategory Modal */}
      <Modal
        title="Edit Subcategory"
        open={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          editForm.resetFields();
          setSelectedSubcategory(null);
        }}
        footer={null}
        width={500}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubcategory}
          className="mt-4"
        >
          <Form.Item
            label="Subcategory Name"
            name="subcategoryName"
            rules={[
              { required: true, message: 'Please enter subcategory name' },
              { min: 2, message: 'Subcategory name must be at least 2 characters' },
              { max: 50, message: 'Subcategory name cannot exceed 50 characters' }
            ]}
          >
            <Input 
              placeholder="Enter subcategory name"
              size="large"
            />
          </Form.Item>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              onClick={() => {
                setEditModalOpen(false);
                editForm.resetFields();
                setSelectedSubcategory(null);
              }}
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              size="large"
              className="bg-[#0091FF] border-[#0091FF] hover:bg-[#0077CC] hover:border-[#0077CC]"
            >
              Update Subcategory
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Subcategory"
        open={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedSubcategory(null);
        }}
        footer={null}
        width={400}
      >
        <div className="text-center py-4">
          <div className="mb-4">
            <DeleteOutlined className="text-red-500 text-4xl mb-2" />
            <p className="text-lg font-medium mb-2">Are you sure?</p>
            <p className="text-gray-600">
              Do you want to delete the subcategory "{selectedSubcategory?.subcategoryName}"? 
              This action cannot be undone.
            </p>
          </div>
          
          <div className="flex justify-center gap-3 mt-6">
            <Button 
              onClick={() => {
                setDeleteModalOpen(false);
                setSelectedSubcategory(null);
              }}
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              danger
              onClick={handleDeleteSubcategory}
              loading={loading}
              size="large"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
