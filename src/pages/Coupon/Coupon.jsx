import React from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import img from "../../assets/build.png"
import { Link } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

function Coupon() {
          const [isModalOpen, setIsModalOpen] = useState(false);
          const [selectedListing, setSelectedListing] = useState(null);
          const [page, setPage] = useState(1);

          const handleCancel = () => {
                    setIsModalOpen(false);
          };
          const handleDeleteAdmin = (faq) => {
                    Swal.fire({
                              title: "Are you sure?",
                              text: "You are about to delete this FAQ",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                    });
          };


          const dataSource = [
                    {
                              key: "1",
                              no: 1,
                              code: "WELCOME10",
                              reason: "New user first order",
                              discount: "10%",
                              startDate: "2023-01-01",
                              endDate: "2023-01-31",
                              status: "Active",
                    },
                    {
                              key: "2",
                              no: 2,
                              code: "SUMMER20",
                              reason: "Summer season offer",
                              discount: "20%",
                              startDate: "2023-06-01",
                              endDate: "2023-08-31",
                              status: "Active",
                    },
                    {
                              key: "4",
                              no: 4,
                              code: "NEWYEAR25",
                              reason: "New Year Celebration",
                              discount: "25%",
                              startDate: "2023-12-25",
                              endDate: "2024-01-05",
                              status: "Active",
                    },
                    {
                              key: "5",
                              no: 5,
                              code: "BLACKFRIDAY30",
                              reason: "Black Friday Special",
                              discount: "30%",
                              startDate: "2023-11-24",
                              endDate: "2023-11-25",
                              status: "Expired",
                    },
                    {
                              key: "6",
                              no: 6,
                              code: "SPRING15",
                              reason: "Spring sale",
                              discount: "15%",
                              startDate: "2023-03-01",
                              endDate: "2023-04-30",
                              status: "Expired",
                    },
                    {
                              key: "7",
                              no: 7,
                              code: "FALL10",
                              reason: "Fall season discount",
                              discount: "10%",
                              startDate: "2023-09-01",
                              endDate: "2023-10-15",
                              status: "Expired",
                    },

                    {
                              key: "9",
                              no: 9,
                              code: "WELCOME5",
                              reason: "Welcome back users",
                              discount: "5%",
                              startDate: "2023-01-01",
                              endDate: "2023-06-30",
                              status: "Expired",
                    },
                    {
                              key: "10",
                              no: 10,
                              code: "FESTIVE40",
                              reason: "Festive Season Offer",
                              discount: "40%",
                              startDate: "2023-10-01",
                              endDate: "2023-10-31",
                              status: "Active",
                    },
          ];



          const columns = [
                    {
                              title: "No",
                              dataIndex: "no",
                              key: "no",
                    },
                    {
                              title: "Coupon Code",
                              dataIndex: "code",
                              key: "code",
                    },
                    {
                              title: "Reason",
                              dataIndex: "reason",
                              key: "reason",
                    },
                    {
                              title: "Discount (%)	",
                              dataIndex: "discount",
                              key: "discount",
                    },
                    {
                              title: "Valid From",
                              dataIndex: "startDate",
                              key: "startDate",
                    },
                    {
                              title: "Valid To",
                              dataIndex: "endDate",
                              key: "endDate",
                    },
                    {
                              title: "Status",
                              dataIndex: "status",
                              key: "status",
                    },

                    {
                              title: "Action",
                              key: "action",
                              render: (_, record) => (
                                        <div className="flex gap-2 justify-center item-center">
                                                  <div className="bg-[#0091FF] rounded  p-2">
                                                            <button
                                                            // onClick={(e) => {
                                                            //           e.stopPropagation();
                                                            //           handleOpenEditModal(faq);
                                                            // }}
                                                            >
                                                                      <CiEdit className="text-xl text-white font-bold" />
                                                            </button>
                                                  </div>
                                                  <div className="bg-[#FECACA] border border-[#EF4444] rounded  p-2">
                                                            <button
                                                                      onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleDeleteAdmin(faq);
                                                                      }}
                                                            >
                                                                      <RiDeleteBin6Line className="text-xl text-[#EF4444] font-bold" />
                                                            </button>
                                                  </div>
                                        </div>
                              ),
                    },
          ];

          return (

                    <div className="p-5">
                              <div className="flex items-center justify-between mb-5">
                                        <PageHeading title="Coupon Management" />
                                        <button
                                                  // type="submit"
                                                  // onClick={() => setIsAddModalVisible(true)}
                                                  className="bg-[#0091FF] !text-white px-5 py-2 rounded"
                                        >
                                                  + Add New Coupon
                                        </button>
                              </div>


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
                                                            current: 1,
                                                            showSizeChanger: false,
                                                            onChange: (page) => setPage(page),
                                                  }}
                                                  scroll={{ x: "max-content" }}
                                        />

                              </ConfigProvider>
                    </div>
          );
}

export default Coupon;
