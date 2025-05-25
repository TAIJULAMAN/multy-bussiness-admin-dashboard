import React from "react";
import { ConfigProvider, Modal, Space, Table } from "antd";
import { useState } from "react";
// import { MdBlockFlipped } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import img from "../../assets/block.png";
// import { useGetTransactionsQuery } from "../../redux/api/transactionApi";
import { imageUrl } from "../../Utils/server";
import Loader from "../../Components/Shared/Loaders/Loader";

const TransactionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { data: transactionsData, isLoading } = useGetTransactionsQuery();
  // console.log("transactionsData", transactionsData);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Demo transaction data
  const transactionsData = {
    data: [
      {
        _id: "1",
        name: "John Doe",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        updatedAt: "2025-05-25",
        amount: 1500,
        email: "john.doe@example.com",
        status: "completed"
      },
      {
        _id: "2",
        name: "Sarah Wilson",
        img: "https://randomuser.me/api/portraits/women/2.jpg",
        updatedAt: "2025-05-24",
        amount: 2300,
        email: "sarah.wilson@example.com",
        status: "pending"
      },
      {
        _id: "3",
        name: "Michael Brown",
        img: "https://randomuser.me/api/portraits/men/3.jpg",
        updatedAt: "2025-05-23",
        amount: 3200,
        email: "michael.brown@example.com",
        status: "completed"
      },
      {
        _id: "4",
        name: "Emma Davis",
        img: "https://randomuser.me/api/portraits/women/4.jpg",
        updatedAt: "2025-05-22",
        amount: 1800,
        email: "emma.davis@example.com",
        status: "completed"
      },
      {
        _id: "5",
        name: "James Wilson",
        img: "https://randomuser.me/api/portraits/men/5.jpg",
        updatedAt: "2025-05-21",
        amount: 2700,
        email: "james.wilson@example.com",
        status: "pending"
      }
    ]
  };


  const dataSource =
    transactionsData?.data?.slice(0, 5).map((transaction, index) => ({

      key: transaction?._id || index.toString(),
      no: index + 1,
      name: transaction?.name || "No Name",
      img: transaction?.img,
      date: transaction?.updatedAt || "N/A",
      amount: transaction?.amount || "N/A",
      email: transaction?.email || "N/A",

    })) || [];


  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={imageUrl(record?.img)}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.name || "No Name"}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Space size="middle">
          <IoIosMail />
          {email}
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    }
  ];

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Table: {
              headerBg: "#0091FF",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#0091FF",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: "max-content" }}
        />

        {/*Block Modal */}
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center py-10">
            <img src={img} alt="Confirmation" className="w-40 h-40 mb-5" />
            <p className="text-3xl text-center text-gray-800">Warning</p>
            <p className="text-xl text-center mt-5">
              Do you want to block this?
            </p>
            <div className="text-center py-5 w-full flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="border-2 border-[#14803c] text-gray-800 font-semibold w-1/3 py-3 px-5 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCancel}
                className="bg-[#14803c] text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default TransactionTable;
