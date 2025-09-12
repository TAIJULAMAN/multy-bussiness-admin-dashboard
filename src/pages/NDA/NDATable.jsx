import React from "react";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { getImageBaseUrl } from "../../config/envConfig";
import { Link } from "react-router-dom";

function NDATable({ data = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNDA, setSelectedNDA] = useState(null);
  const [page, setPage] = useState(1);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleViewNDA = (record) => {
    setSelectedNDA(record);
    setIsModalOpen(true);
  };

  // Transform NDA data for table display
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
        <Link 
          to="/document" 
          state={{ 
            ndaData: record,
            pdfUrl: record.nda 
          }}
        >
          <button className="border border-[#0091ff] rounded-lg p-1 bg-[#cce9ff] text-[#0091ff]">
            <FaRegEye className="w-8 h-8 text-[#0091ff]" />
          </button>
        </Link>
      ),
    },
  ];

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
        // pagination={{
        //   pageSize: listData?.pagination?.itemPerPage,
        //   total: listData?.pagination?.totalItems,
        //   current: listData?.pagination?.currentPage,
        //   showSizeChanger: false,
        //   onChange: (page) => setPage(page),
        // }}
        pagination={{
          pageSize: 10,
          total: dataSource.length,
          current: page,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
        scroll={{ x: "max-content" }}
      />
      <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
        title="NDA Details"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-5">
            {/* User Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    selectedNDA?.userId?.image
                      ? `${getImageBaseUrl()}/profile-image/${
                          selectedNDA?.userId?.image
                        }`
                      : "https://avatar.iran.liara.run/public/20"
                  }
                  alt={selectedNDA?.userName}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold">
                    {selectedNDA?.userName}
                  </h1>
                  <p className="text-gray-600">{selectedNDA?.email}</p>
                </div>
              </div>
            </div>

            {/* NDA Details */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">NDA Information</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      User Role
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">
                      {selectedNDA?.userRole}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Agreement Type
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">
                      {selectedNDA?.agreementType}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Contact Number
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">
                      {selectedNDA?.contactNumber}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Business Location
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">
                      {selectedNDA?.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Submission Date
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">
                      {selectedNDA?.date}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Status
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff] p-2 rounded">
                      {selectedNDA?.status}
                    </p>
                  </div>
                </div>

                {selectedNDA?.agreementContent && (
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      Agreement Content
                    </h2>
                    <p className="mt-1 p-4 bg-gray-50 rounded border">
                      {selectedNDA?.agreementContent}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default NDATable;
