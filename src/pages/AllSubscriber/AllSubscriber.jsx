import React from "react";
import { ConfigProvider, Table } from "antd";
import { useGetAllSubscriberQuery } from "../../redux/api/allSubscriberApi";
import Loader from "../../Components/Shared/Loaders/Loader";

export default function AllSubscriber() {
  const { data: subscriberData, isLoading, error } = useGetAllSubscriberQuery();
  console.log("subscriberData", subscriberData);

  // Map API data to table format
  const dataSource =
    subscriberData?.data?.map((subscriber, index) => ({
      key: subscriber._id || index.toString(),
      no: index + 1,
      name: subscriber.name || "No Name",
      email: subscriber.email || "No Email",
      role: subscriber.role || "User",
      status: subscriber.status || "Active",
    })) || [];
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Error Loading Subscribers
          </h3>
          <p className="text-gray-600">
            {error?.data?.message || "Failed to load subscriber data"}
          </p>
        </div>
      </div>
    );
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
