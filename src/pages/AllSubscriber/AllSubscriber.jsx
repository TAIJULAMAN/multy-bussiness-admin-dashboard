import React from "react";
import { ConfigProvider, Modal, Table, Tag } from "antd";



export default function AllSubscriber() {
    const demoUsers = [
        { key: "1", no: 1, email: "john.doe@example.com" },
        { key: "2", no: 2, email: "jane.smith@example.co.uk" },
        { key: "3", no: 3, email: "alice.johnson@example.net" },
        { key: "4", no: 4, email: "michael.brown@example.org" },
        { key: "5", no: 5, email: "emily.davis@example.com" },
        { key: "6", no: 6, email: "david.wilson@example.co" },
        { key: "7", no: 7, email: "sarah.martin@example.io" },
        { key: "8", no: 8, email: "chris.lee@example.dev" },
        { key: "9", no: 9, email: "laura.white@example.info" },
        { key: "10", no: 10, email: "james.moore@example.biz" },
        { key: "11", no: 11, email: "linda.clark@example.ai" },
        { key: "12", no: 12, email: "robert.thomas@example.us" },
        { key: "13", no: 13, email: "patricia.jackson@example.me" },
        { key: "14", no: 14, email: "charles.harris@example.ca" },
        { key: "15", no: 15, email: "barbara.young@example.xyz" },
        { key: "16", no: 16, email: "steven.king@example.in" },
        { key: "17", no: 17, email: "betty.scott@example.tech" },
        { key: "18", no: 18, email: "brian.green@example.store" },
        { key: "19", no: 19, email: "nancy.adams@example.site" },
        { key: "20", no: 20, email: "kevin.baker@example.email" },
        { key: "21", no: 21, email: "karen.gonzalez@example.pro" },
        { key: "22", no: 22, email: "george.nelson@example.tv" },
        { key: "23", no: 23, email: "helen.carter@example.cc" },
        { key: "24", no: 24, email: "frank.mitchell@example.ac" },
        { key: "25", no: 25, email: "ruth.roberts@example.online" },
        { key: "26", no: 26, email: "raymond.phillips@example.ltd" },
        { key: "27", no: 27, email: "dorothy.campbell@example.int" },
        { key: "28", no: 28, email: "gerald.parker@example.app" },
        { key: "29", no: 29, email: "mildred.evans@example.jobs" },
        { key: "30", no: 30, email: "arthur.edwards@example.org" },
    ];







    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        {
            title: <div className="flex items-center justify-end">
                <span className="flex items-center justify-end">Email</span>
            </div>,
            key: "email",
            render: (text, record) => (
                <div className="flex items-center justify-end">
                    <span className="flex items-center justify-end">{record.email}</span>
                </div>
            )
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
                dataSource={demoUsers}
                columns={columns}
                pagination={false}
                scroll={{ x: "max-content" }}
            />
        </ConfigProvider>
    );
};

