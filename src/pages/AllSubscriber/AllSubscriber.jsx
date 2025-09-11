import React from "react";
import { ConfigProvider, Table } from "antd";
import { useGetAllSubscriberQuery } from "../../redux/api/allSubscriberApi";
import Loader from "../../Components/Shared/Loaders/Loader";

export default function AllSubscriber() {
  const { data: subscriberData, isLoading } = useGetAllSubscriberQuery();
  console.log("subscriberData", subscriberData);

  // Map API data to table format
  const dataSource =
    subscriberData?.data?.map((subscriber, index) => ({
      key: subscriber._id || index.toString(),
      no: index + 1,
      email: subscriber.email || "No Email",
    })) || [];
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
            colorPrimary: "#14803c",
            colorPrimaryHover: "#14803c",
            itemActiveBg: "#14803c",
            itemActiveColor: "#ffffff",
            colorBgTextHover: "#14803c",
            colorText: "#14803c",
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
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} subscribers`,
        }}
        scroll={{ x: "max-content" }}
      />
    </ConfigProvider>
  );
}
