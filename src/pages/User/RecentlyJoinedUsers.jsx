import React from "react";
import { ConfigProvider, Table, Tag } from "antd";
import { useGetAllUserQuery } from "../../redux/api/userApi";

const RecentlyJoinedUsers = () => {
  const { data: recentUsersData } = useGetAllUserQuery();
  console.log("recentUsersData", recentUsersData);
  // Demo data
  const users = recentUsersData?.data?.slice(0, 5);

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_, record, index) => index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Contact Number", dataIndex: "mobile", key: "mobile" },
    {
      title: "User Role",
      key: "userRole",
      render: (_, record) => (
        <Tag
          className="!p-1 !w-full !flex !items-center !justify-center"
          color="blue"
        >
          {record.role}
        </Tag>
      ),
    },
    { title: "Country", dataIndex: "country", key: "country" },
    {
      title: "Subscription",
      key: "subscription",
      render: (_, record) =>
        record?.subscriptionPlanType || "Free Plan",
    },
  ];

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
        dataSource={users}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </ConfigProvider>
  );
};

export default RecentlyJoinedUsers;
