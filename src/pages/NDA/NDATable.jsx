import React from "react";
import { ConfigProvider, Modal, Table, Tag, Popconfirm, message } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { getImageBaseUrl } from "../../config/envConfig";
import { Link } from "react-router-dom";
import { useDeleteAgreementMutation } from "../../redux/api/NDAApi";
import NDADetailsModal from "../../Components/nda/NDADetailsModal";

function NDATable({ data = [], ndaData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNDA, setSelectedNDA] = useState(null);
  const [deleteAgreement, { isLoading: deleting }] = useDeleteAgreementMutation();

  const handleDelete = async (id) => {
    try {
      await deleteAgreement(id).unwrap();
      message.success("NDA deleted successfully");
    } catch (e) {
      message.error(e?.data?.message || "Failed to delete NDA");
    }
  };



  const dataSource =
    data?.map((nda, index) => ({
      key: nda?._id || index,
      no: index + 1,
      userName: nda?.name || "N/A",
      email: nda?.email || "N/A",
      contactNumber: nda?.phone || "N/A",
      nda: nda?.nda || "N/A",
      userRole: nda?.role || "N/A",
      passportNumber: nda?.nidPassportNumber || "N/A",
      date: new Date(nda?.createdAt).toLocaleDateString() || "N/A",
      ...nda,
    })) || [];
    
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      key: "userName",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "User Role",
      key: "userRole",
      render: (_, record) => (
        <Tag
          className="!p-1 !w-full !flex !items-center !justify-center"
          color="blue"
        >
          {record?.userRole}
        </Tag>
      ),
    },
    {
      title: "Submission Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Passport Number",
      dataIndex: "nidPassportNumber",
      key: "nidPassportNumber",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Link
            to="/document"
            state={{
              ndaData: record,
              pdfUrl: record.nda,
            }}
          >
            <button className="border border-[#0091ff] rounded-lg p-1 bg-[#cce9ff] text-[#0091ff]">
              <FaRegEye className="w-8 h-8 text-[#0091ff]" />
            </button>
          </Link>
          <Popconfirm
            title="Delete NDA?"
            description="This action cannot be undone."
            okButtonProps={{ danger: true, loading: deleting }}
            okText="Delete"
            onConfirm={() => handleDelete(record?._id)}
          >
            <button className="border border-red-500 rounded-lg px-3 py-1 bg-red-50 text-red-600">
              Delete
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const metaPage = ndaData?.meta?.page || page || 1;
  const metaLimit = ndaData?.meta?.limit || 10;
  const metaTotal = ndaData?.meta?.total || data?.length || 0;

  return (
    <ConfigProvider
      theme={{
        components: {
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
        pagination={{
          pageSize: metaLimit,
          total: metaTotal,
          current: metaPage,
          onChange: (newPage) => setPage(newPage),
        }}
        scroll={{ x: "max-content" }}
      />
      <NDADetailsModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        selectedNDA={selectedNDA}
      />
    </ConfigProvider>
  );
}

export default NDATable;
