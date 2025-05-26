import { ConfigProvider, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import img from "../../assets/product.png"
import { useGetSingleUserQuery } from '../../redux/api/userApi';
import { imageUrl } from '../../Utils/server';


const ActiveListings = ({ setIsModalOpen2, selectedUser }) => {
          const [isModalOpen, setIsModalOpen] = useState(false)
          const [selectedItem, setSelectedItem] = useState(null);
          console.log("selectedItem", selectedItem);
          // const { data: singleUser, isLoading } = useGetSingleUserQuery({ user: selectedUser?.key });
          // console.log("singleUser", singleUser?.data);


          const showModal = (record) => {
                    setSelectedItem(record);
                    setIsModalOpen(true);
                    setIsModalOpen2(false)
          };

          const handleCancel = () => {
                    setIsModalOpen(false);
                    setSelectedItem(null);
          };
          const dataSource = [
                    {
                              key: 1,
                              no: 1,
                              name: "John Doe",
                              price: "$100",
                              category_name: "Electronics",
                              img: img,
                              condition: "New",
                              description: "This is a sample description.",
                              status: "Active",
                              user: "John Doe",
                              user_id: "12345",
                    },
                    {
                              key: 2,
                              no: 2,
                              name: "Jane Smith",
                              price: "$200",
                              category_name: "Clothing",
                              img: img,
                              condition: "Used",
                              description: "This is another sample description.",
                              status: "Active",
                              user: "Jane Smith",
                              user_id: "67890",
                    },
          ];


          // const dataSource = singleUser?.data?.map((item, index) => ({
          //           key: index + 1,
          //           no: index + 1,
          //           name: item?.name || "No Name",
          //           price: item?.price || "N/A",
          //           category_name: item?.category_name || "N/A",
          //           img: item?.img || "N/A",
          //           condition: item?.condition || "N/A",
          //           description: item?.description || "N/A",
          //           status: item?.status || "N/A",
          //           user: item?.user_name || "N/A",
          //           user_id: item?.user_id || "N/A",

          // }));

          const columns = [
                    { title: "No", dataIndex: "no", key: "no" },
                    { title: "Name", dataIndex: "name", key: "name" },
                    { title: "Price", dataIndex: "price", key: "price" },
                    { title: "Category", dataIndex: "category_name", key: "category_name" },
                    {
                              title: "Action",
                              key: "action",
                              render: (_, record) => {
                                        return (
                                                  <div className="flex gap-2">
                                                            <button
                                                                      onClick={() => showModal(record)}
                                                                      className="border border-[#0091ff] rounded-lg p-1 bg-[#d3e8e6] text-[#0091ff]"
                                                            >
                                                                      <FaRegEye className="w-8 h-8 text-[#0091ff]" />
                                                            </button>
                                                  </div>
                                        );
                              },
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
                                        dataSource={dataSource}
                                        columns={columns}
                                        pagination={{ pageSize: 5 }}
                                        scroll={{ x: "max-content" }}
                                        // loading={isLoading}
                              />
                              <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
                                        <div className="container mx-auto px-4 py-8">
                                                  <div className="flex flex-col gap-5">
                                                            {/* Product Images */}
                                                            <div className="space-y-4">
                                                                      {selectedItem?.img?.length > 0 && (
                                                                                <div className="relative rounded-lg overflow-hidden">
                                                                                          <img
                                                                                                    // src={imageUrl(selectedItem.img[0])}
                                                                                                    src={img}
                                                                                                    alt="Profile avatar"
                                                                                                    className="w-full h-[300px] object-cover"
                                                                                          />
                                                                                </div>
                                                                      )}
                                                            </div>

                                                            {/* Product Info */}
                                                            <div className="space-y-6">
                                                                      <div>
                                                                                <h1 className="text-3xl font-bold">{selectedItem?.name}</h1>
                                                                                <div className="flex items-center mt-2">
                                                                                          <span className="text-2xl font-semibold">$ {selectedItem?.price}</span>
                                                                                          <p className="ml-2 text-green-500">In Stock</p>
                                                                                </div>
                                                                      </div>

                                                                      <div className="space-y-4">
                                                                                <div>
                                                                                          <h2 className="text-xl font-bold mb-2">Product Details</h2>
                                                                                          <p className="text-gray-600">
                                                                                                    {selectedItem?.description}
                                                                                          </p>
                                                                                </div>

                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                          <div>
                                                                                                    <h3 className="text-sm font-medium text-gray-500">Product Category</h3>
                                                                                                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">{selectedItem?.category_name || "N/A"}</p>
                                                                                          </div>
                                                                                          <div>
                                                                                                    <h3 className="text-sm font-medium text-gray-500">Product Type</h3>
                                                                                                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">{selectedItem?.type_name || "N/A"}</p>
                                                                                          </div>
                                                                                          <div>
                                                                                                    <h3 className="text-sm font-medium text-gray-500">Condition</h3>
                                                                                                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">{selectedItem?.condition || "N/A"}</p>
                                                                                          </div>
                                                                                          <div>
                                                                                                    <h3 className="text-sm font-medium text-gray-500">Material</h3>
                                                                                                    <p className="mt-1 bg-green-50 text-green-700 hover:bg-green-50">{selectedItem?.material || "N/A"}</p>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              </Modal>

                    </ConfigProvider>
          );
};

export default ActiveListings;