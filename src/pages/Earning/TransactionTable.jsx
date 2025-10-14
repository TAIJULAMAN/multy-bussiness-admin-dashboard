import { ConfigProvider, Table } from "antd";
import Loader from "../../Components/Loaders/Loader";
import { useGetEarningQuery } from "../../redux/api/earningApi";
import { useState } from "react";

export default function TransactionTable() {
  const [page, setPage] = useState(1);
  const currentYear = new Date().getFullYear();
  const { data: earningData, isLoading } = useGetEarningQuery({
    year: currentYear,
    page,
  });

  const dataSource = earningData?.data?.allPayment
    ? [...earningData.data.allPayment]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
        .map((payment) => ({
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

  const metaPage = earningData?.meta?.page || page || 1;
  const metaLimit = earningData?.meta?.limit || 10;
  const metaTotal = earningData?.meta?.total || dataSource?.length || 0;

  return (
    <>
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
          pagination={{
            pageSize: metaLimit,
            total: metaTotal,
            current: metaPage,
            showSizeChanger: false,

            onChange: (newPage) => setPage(newPage),
          }}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>
    </>
  );
}
