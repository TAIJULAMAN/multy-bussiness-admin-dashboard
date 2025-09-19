import React from "react";
import { ConfigProvider, Table } from "antd";
import { useGetAllSubscriberQuery } from "../../redux/api/allSubscriberApi";
import Loader from "../../Components/Shared/Loaders/Loader";
import { useState } from "react";

export default function AllSubscriber() {
  const [page, setPage] = useState(1);
  const { data: subscriberData, isLoading } = useGetAllSubscriberQuery({
    page,
  });

  const dataSource =
    subscriberData?.data?.map((subscriber, index) => ({
      key: subscriber._id || index.toString(),
      no: index + 1,
      email: subscriber.email || "No Email",
    })) || [];

  const metaPage = subscriberData?.meta?.page || page || 1;
  const metaLimit = subscriberData?.meta?.limit || 10;
  const metaTotal = subscriberData?.meta?.total || dataSource?.length || 0;

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
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
        pagination={{
          pageSize: metaLimit,
          total: metaTotal,
          current: metaPage,
          onChange: (newPage) => setPage(newPage),
        }}
        scroll={{ x: "max-content" }}
      />
    </ConfigProvider>
  );
}
