import React from "react";
import { ConfigProvider, Modal, Table, Form, Input, Select, Button, DatePicker } from "antd";
import { useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

function Coupon() {
          const [isModalOpen, setIsModalOpen] = useState(false);
          const [page, setPage] = useState(1);
          const [dataSource, setDataSource] = useState([
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
          ]);

          const [form] = Form.useForm();
          const [editingRecord, setEditingRecord] = useState(null);
          const { Option } = Select;

          const handleCancel = () => {
                    setIsModalOpen(false);
                    form.resetFields();
                    setEditingRecord(null);
          };

          const handleDeleteAdmin = (record) => {
                    Swal.fire({
                              title: "Are you sure?",
                              text: `You are about to delete the coupon: ${record.code}`,
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                              if (result.isConfirmed) {
                                        setDataSource(prevData =>
                                                  prevData.filter(item => item.key !== record.key)
                                        );
                                        Swal.fire(
                                                  'Deleted!',
                                                  'Your coupon has been deleted.',
                                                  'success'
                                        );
                              }
                    });
          };

          const handleAdd = () => {
                    setIsModalOpen(true);
                    setEditingRecord(null);
          };

          const handleEdit = (record) => {
                    setIsModalOpen(true);
                    setEditingRecord(record);
                    form.setFieldsValue({
                              code: record.code,
                              reason: record.reason,
                              discount: parseInt(record.discount.replace('%', '')),
                              validFrom: dayjs(record.startDate),
                              validTo: dayjs(record.endDate),
                              status: record.status,
                    });
          };

          const onFinish = async (values) => {
                    try {
                              const newRecord = {
                                        key: editingRecord ? editingRecord.key : (dataSource.length + 1).toString(),
                                        no: editingRecord ? editingRecord.no : dataSource.length + 1,
                                        code: values.code,
                                        reason: values.reason,
                                        discount: `${values.discount}%`,
                                        startDate: values.validFrom.format('YYYY-MM-DD'),
                                        endDate: values.validTo.format('YYYY-MM-DD'),
                                        status: values.status,
                              };

                              if (editingRecord) {
                                        setDataSource(prevData =>
                                                  prevData.map(item =>
                                                            item.key === editingRecord.key ? newRecord : item
                                                  )
                                        );
                              } else {
                                        setDataSource(prevData => [...prevData, newRecord]);
                              }

                              setIsModalOpen(false);
                              form.resetFields();
                              setEditingRecord(null);
                              Swal.fire(
                                        'Success!',
                                        editingRecord ? 'Coupon updated successfully' : 'Coupon added successfully',
                                        'success'
                              );
                    } catch (error) {
                              console.error('Error saving coupon:', error);
                              Swal.fire(
                                        'Error!',
                                        'Failed to save coupon',
                                        'error'
                              );
                    }
          };

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
                              title: "Discount (%)",
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
                                        <div className="flex gap-2 justify-center item-center items-center">

                                                  <button
                                                            onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      handleEdit(record);
                                                            }}
                                                            className="bg-[#0091FF] rounded-lg  p-2"
                                                  >
                                                            <CiEdit className="text-xl text-white font-bold leading-none cursor-pointer" />
                                                  </button>

                                                  <button
                                                            onClick={(e) => {
                                                                      e.stopPropagation();
                                                                      handleDeleteAdmin(record);
                                                            }}
                                                            className="bg-[#FEE2E2] rounded-lg  p-2"
                                                  >
                                                            <RiDeleteBin6Line className="text-xl text-[#EF4444] font-bold leading-none cursor-pointer" />
                                                  </button>
                                        </div>
                              ),
                    },
          ];

          return (
                    <div className="p-5">
                              <div className="flex items-center justify-between mb-5">
                                        <PageHeading title="Coupon Management" />
                                        <button
                                                  onClick={handleAdd}
                                                  className="bg-[#0091FF] !text-white px-5 py-3 rounded"
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

                              <Modal
                                        open={isModalOpen}
                                        onCancel={handleCancel}
                                        footer={false}
                                        width={700}
                              >


                                        <div className="flex flex-col gap-2">
                                                  <h1 className="text-2xl font-bold text-[#000000] mb-5 mt-10 text-center ">{editingRecord ? "Edit Coupon" : "Add New Coupon"}</h1>
                                                  <p className="text-gray-500 text-sm text-center mb-5"> {editingRecord ? "Update your existing coupon details below." : "Create a new promotional coupon to offer discounts and boost engagement."}</p>
                                        </div>
                                        <Form
                                                  form={form}
                                                  layout="vertical"
                                                  onFinish={onFinish}
                                                  initialValues={{
                                                            status: "Active",
                                                  }}
                                        >
                                                  <Form.Item
                                                            label="Coupon Code"
                                                            name="code"
                                                            rules={[{ required: true, message: 'Please enter coupon code' }]}
                                                  >
                                                            <Input placeholder="Enter coupon code" />
                                                  </Form.Item>

                                                  <Form.Item
                                                            label="Reason"
                                                            name="reason"
                                                            rules={[{ required: true, message: 'Please enter reason' }]}
                                                  >
                                                            <Input.TextArea
                                                                      placeholder="Enter reason for coupon"
                                                                      rows={2}
                                                            />
                                                  </Form.Item>

                                                  <Form.Item
                                                            label="Discount (%)"
                                                            name="discount"
                                                            rules={[{ required: true, message: 'Please enter discount' }]}
                                                  >
                                                            <Input
                                                                      type="number"
                                                                      placeholder="Enter discount percentage"
                                                                      addonAfter="%"
                                                            />
                                                  </Form.Item>

                                                  <div className="flex gap-2 w-full">
                                                            <Form.Item
                                                                      name="validFrom"
                                                                      label="Valid From"
                                                                      rules={[
                                                                                { required: true, message: 'Please select valid from date' },
                                                                      ]}
                                                                      className="!w-1/2"

                                                            >
                                                                      <DatePicker
                                                                                placeholder="Select valid from date"

                                                                      />
                                                            </Form.Item>

                                                            <Form.Item
                                                                      name="validTo"
                                                                      label="Valid To"
                                                                      rules={[
                                                                                { required: true, message: 'Please select valid to date' },
                                                                      ]}
                                                                      className="!w-1/2"

                                                            >
                                                                      <DatePicker
                                                                                placeholder="Select valid to date"

                                                                      />
                                                            </Form.Item>
                                                  </div>

                                                  <Form.Item
                                                            label="Status"
                                                            name="status"
                                                  >
                                                            <Select
                                                                      placeholder="Select status"
                                                                      allowClear
                                                            >
                                                                      <Option value="Active">Active</Option>
                                                                      <Option value="Expired">Expired</Option>
                                                            </Select>
                                                  </Form.Item>

                                        </Form>
                                        <div className="flex gap-2 mt-5 w-full">
                                                  <button

                                                            onClick={handleCancel}
                                                            className="bg-[#FEF2F2] rounded  py-3 w-1/2  !text-[#EF4444] border-[1px] border-[#EF4444]"
                                                  >Cancel</button>
                                                  <button htmlType="submit" className="bg-[#0091FF] !text-white rounded  py-3 w-1/2">
                                                            {editingRecord ? "Update" : "Add"}
                                                  </button>
                                        </div>

                              </Modal>
                    </div>
          );
}

export default Coupon;
