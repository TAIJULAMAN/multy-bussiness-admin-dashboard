import React from "react";
import { ConfigProvider, Table } from "antd";
import { useState } from "react";
import Loader from "../../Components/Shared/Loaders/Loader";
import { useGetEarningQuery } from "../../redux/api/earningApi";

const TransactionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const { data: earningData, isLoading } = useGetEarningQuery({
    year: currentYear,
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataSource = earningData?.data?.allPayment
    ? [...earningData.data.allPayment]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map((payment, index) => ({
          key: payment._id,
          _id: payment._id,
          name: payment.user?.name || "No Name",
          email: payment.user?.email || "No Email",
          date: new Date(payment.createdAt).toLocaleDateString(),
          amount: payment.amount,
          TR_ID: payment?.payment_intent_id || "No TR ID",
          status: payment.status,
          pay_On: "Stripe",
        }))
    : [];

  const columns = [
    {
      title: "User Info",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-[2px]">
            <span className="leading-none text-sm font-medium">
              {record.name}
            </span>
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
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

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
      </ConfigProvider>
    </>
  );
};

export default TransactionTable;
