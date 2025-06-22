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


  // const dataSource =
  //   transactionsData?.slice(0, 5).map((transaction, index) => ({

  //     key: transaction?._id || index.toString(),
  //     no: index + 1,
  //     name: transaction?.name || "No Name",
  //     img: transaction?.img,
  //     date: transaction?.updatedAt || "N/A",
  //     amount: transaction?.amount || "N/A",
  //     email: transaction?.email || "N/A",
  //     country: transaction?.country || "N/A",

  //   })) || [];

  // Demo transaction data
  const dataSource = [
    {
      _id: "1",
      name: "John Doe",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "2025-05-25",
      amount: 1500,
      TR_ID: "TRX-84921A",
      country: "Bangladesh",
      status: "completed",
      pay_On: "Stripe"
    },
    {
      _id: "2",
      name: "Jane Smith",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "2025-06-01",
      amount: 2200,
      TR_ID: "TRX-58291B",
      country: "USA",
      status: "pending",
      pay_On: "PayPal"
    },
    {
      _id: "3",
      name: "Michael Lee",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "2025-06-15",
      amount: 1750,
      TR_ID: "TRX-11384C",
      country: "Canada",
      status: "completed",
      pay_On: "Stripe"
    },
    {
      _id: "4",
      name: "Fatima Khan",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      date: "2025-06-10",
      amount: 980,
      TR_ID: "TRX-97263D",
      country: "Pakistan",
      status: "failed",
      pay_On: "Razorpay"
    },
    {
      _id: "5",
      name: "Carlos Diaz",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      date: "2025-06-20",
      amount: 3050,
      TR_ID: "TRX-44182E",
      country: "Mexico",
      status: "completed",
      pay_On: "Stripe"
    }
  ];



  const columns = [
    {
      title: "User Info",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record?.img || ""}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="flex flex-col gap-[2px]">
            <span className="leading-none">{record.name}</span>
            <span className="leading-none">{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Pay On",
      dataIndex: "pay_On",
      key: "pay_On",
    },
    {
      title: "TR ID",
      dataIndex: "TR_ID",
      key: "TR_ID",
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <span className="leading-none">${record?.amount}</span>
        </div>
      ),
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
