import { ConfigProvider, Modal, Button, Form, Input } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
// import { useCreateFaqMutation, useDeleteFaqMutation, useGetAllFaqQuery, useUpdateFaqMutation } from "../../redux/api/faqApi";
import PageHeading from "../../Components/Shared/PageHeading";
// import Loader from '../../Components/Shared/Loaders/Loader';

const FAQ = () => {
          const [isAccordionOpen, setIsAccordionOpen] = useState(null);
          const [isAddModalVisible, setIsAddModalVisible] = useState(false);
          const [isEditModalVisible, setIsEditModalVisible] = useState(false);
          const [form] = Form.useForm();
          const [editForm] = Form.useForm();

          // const { data: faqData, isLoading, isFaqLoading, refetch } = useGetAllFaqQuery();
          // const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
          // const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
          // const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

          const handleClick = (index) => {
                    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
          };

          // delete faq
          const handleDeleteAdmin = (faq) => {
                    // Swal.fire({
                    //           title: "Are you sure?",
                    //           text: "You are about to delete this FAQ",
                    //           icon: "warning",
                    //           showCancelButton: true,
                    //           confirmButtonColor: "#d33",
                    //           cancelButtonColor: "#3085d6",
                    //           confirmButtonText: "Yes, delete it!",
                    // }).then(async (result) => {
                    //           if (result.isConfirmed) {
                    //                     try {
                    //                               await deleteFaq(faq?._id).unwrap();
                    //                               Swal.fire({
                    //                                         icon: "success",
                    //                                         title: "Deleted!",
                    //                                         text: "FAQ has been deleted successfully.",
                    //                               });
                    //                               refetch();
                    //                     } catch (error) {
                    //                               Swal.fire({
                    //                                         icon: "error",
                    //                                         title: "Error",
                    //                                         text: error?.data?.message || "Failed to delete FAQ",
                    //                               });
                    //                     }
                    //           }
                    // });
          };

          // add faq
          const handleAddFaq = async (values) => {
                    // try {
                    //           await createFaq(values).unwrap();
                    //           Swal.fire({
                    //                     icon: "success",
                    //                     title: "FAQ Added",
                    //                     text: "New FAQ was added successfully!",
                    //           });
                    //           setIsAddModalVisible(false);
                    //           form.resetFields();
                    //           refetch();
                    // } catch (error) {
                    //           Swal.fire({
                    //                     icon: "error",
                    //                     title: "Error",
                    //                     text: error?.data?.message || "Failed to add FAQ",
                    //           });
                    // }
          };

          // edit faq
          const handleOpenEditModal = (faq) => {
                    editForm.setFieldsValue({
                              _id: faq._id,
                              question: faq?.question,
                              answer: faq?.answer,
                    });
                    setIsEditModalVisible(true);
          };

          const handleEditFaq = async (values) => {
                    // try {
                    //           await updateFaq({
                    //                     _id: values._id,
                    //                     data: {
                    //                               question: values.question,
                    //                               answer: values.answer,
                    //                     },
                    //           }).unwrap();

                    //           Swal.fire({
                    //                     icon: "success",
                    //                     title: "FAQ Updated",
                    //                     text: "FAQ has been updated successfully!",
                    //           });
                    //           setIsEditModalVisible(false);
                    //           editForm.resetFields();
                    //           refetch();
                    // } catch (error) {
                    //           Swal.fire({
                    //                     icon: "error",
                    //                     title: "Error",
                    //                     text: error?.data?.message || "Failed to update FAQ",
                    //           });
                    // }
          };

          // if (isLoading || isFaqLoading) {
          //           return <Loader />;
          // }
          const faqData = [
                    {
                              question: "What is your return policy?",
                              answer: "You can return any item within 30 days of purchase for a full refund."
                    },
                    {
                              question: "Do you offer international shipping?",
                              answer: "Yes, we ship to most countries worldwide. Shipping fees apply."
                    },
                    {
                              question: "How can I track my order?",
                              answer: "Once your order ships, you will receive an email with the tracking number."
                    },
                    {
                              question: "Can I change or cancel my order?",
                              answer: "Orders can be changed or canceled within 2 hours of placing them."
                    },
                    {
                              question: "What payment methods do you accept?",
                              answer: "We accept credit cards, PayPal, and Apple Pay."
                    }
          ];


          return (
                    <>
                              <div className="flex justify-between items-center mb-5">
                                        <PageHeading title="FAQ" />
                                        <div className="text-white">
                                                  <button
                                                            onClick={() => setIsAddModalVisible(true)}
                                                            className="bg-[#0091FF] text-white font-semibold px-5 py-2 rounded transition duration-200"
                                                  >
                                                            + Add FAQ
                                                  </button>
                                        </div>
                              </div>
                              <div className="relative p-5 z-0 bg-white">
                                        <div className="flex gap-2 flex-col w-[90%] mt-5">
                                                  {faqData?.map((faq, index) => (
                                                            <section
                                                                      key={index}
                                                                      className="border-b border-[#e5eaf2] rounded py-3"
                                                            >
                                                                      <div
                                                                                className="flex gap-2 cursor-pointer items-center justify-between w-full"
                                                                                onClick={() => handleClick(index)}
                                                                      >
                                                                                <h2 className="text-base font-normal md:font-bold md:text-2xl flex gap-2 items-center">
                                                                                          <FaRegQuestionCircle className="w-5 h-5 hidden md:flex" />
                                                                                          {faq.question}
                                                                                </h2>
                                                                                <div className="flex gap-2 md:gap-4 items-center">
                                                                                          <FaChevronDown
                                                                                                    className={`w-5 h-5 text-[#0D0D0D] transition-all duration-300 ${isAccordionOpen === index &&
                                                                                                              "rotate-[180deg] !text-[#FF0000]"
                                                                                                              }`}
                                                                                          />
                                                                                          <div className="flex gap-2">
                                                                                                    <div className="border-2 px-1.5 py-1 rounded border-[#0091FF] bg-[#f0fcf4]">
                                                                                                              <button onClick={() => handleOpenEditModal(faq)}>
                                                                                                                        <CiEdit className="text-2xl cursor-pointer text-[#0091FF] font-bold transition-all" />
                                                                                                              </button>
                                                                                                    </div>
                                                                                                    <div className="border-2 px-1.5 py-1 rounded border-[#0091FF] bg-[#f0fcf4]">
                                                                                                              <button
                                                                                                                        onClick={() => handleDeleteAdmin(faq)}
                                                                                                                        // disabled={isDeleting}
                                                                                                              >
                                                                                                                        <RiDeleteBin6Line className="text-2xl cursor-pointer text-red-500 transition-all" />
                                                                                                              </button>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                                      <div
                                                                                className={`grid transition-all duration-300 overflow-hidden ease-in-out ${isAccordionOpen === index
                                                                                          ? "grid-rows-[1fr] opacity-100 mt-4"
                                                                                          : "grid-rows-[0fr] opacity-0"
                                                                                          }`}
                                                                      >
                                                                                <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                                                                                          {faq?.answer}
                                                                                </p>
                                                                      </div>
                                                            </section>
                                                  ))}

                                                  <ConfigProvider
                                                            theme={{
                                                                      "components": {
                                                                                "InputNumber": {
                                                                                          "activeBorderColor": "rgb(19,194,194)"
                                                                                },
                                                                                "Pagination": {
                                                                                          "colorPrimaryBorder": "rgb(19,194,194)",
                                                                                          "colorBorder": "rgb(19,194,194)"
                                                                                },
                                                                                "Input": {
                                                                                          "activeBorderColor": "rgb(82,196,26)",
                                                                                          "colorPrimaryHover": "rgb(82,196,26)",
                                                                                          "paddingXS": 12,
                                                                                          "paddingXXS": 12
                                                                                }
                                                                      }
                                                            }}
                                                  >
                                                            <Modal
                                                                      centered
                                                                      open={isAddModalVisible}
                                                                      onCancel={() => {
                                                                                setIsAddModalVisible(false);
                                                                                form.resetFields();
                                                                      }}
                                                                      footer={[
                                                                                <div className="grid grid-cols-2 gap-4 mt-6">
                                                                                          <button

                                                                                                    key="cancel"
                                                                                                    onClick={() => {
                                                                                                              setIsAddModalVisible(false);
                                                                                                              form.resetFields();
                                                                                                    }}
                                                                                                    className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
                                                                                          >
                                                                                                    Cancel
                                                                                          </button>

                                                                                          <button
                                                                                                    key="submit"
                                                                                                    // loading={isCreating}
                                                                                                    onClick={() => form.submit()}
                                                                                                    className="py-2 px-4 rounded-lg bg-green-600 !text-white"
                                                                                          >
                                                                                                    Save
                                                                                          </button>
                                                                                </div>
                                                                      ]}
                                                            >
                                                                      <div className="p-5">
                                                                                <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>

                                                                                <p className="text-center mb-6 text-gray-700">
                                                                                          Fill out the details below to add a new FAQ. Ensure the answer provides clarity and helps users quickly
                                                                                          resolve their queries.
                                                                                </p>
                                                                                <Form
                                                                                          requiredMark={false}
                                                                                          form={form}
                                                                                          onFinish={handleAddFaq}
                                                                                          layout="vertical"
                                                                                >
                                                                                          <Form.Item
                                                                                                    name="question"
                                                                                                    label="Question"
                                                                                                    rules={[
                                                                                                              { required: true, message: 'Please enter the question' },
                                                                                                              { max: 200, message: 'Question cannot be longer than 200 characters' }
                                                                                                    ]}
                                                                                          >
                                                                                                    <Input placeholder="Enter question" />
                                                                                          </Form.Item>
                                                                                          <Form.Item
                                                                                                    name="answer"
                                                                                                    label="Answer"
                                                                                                    rules={[
                                                                                                              { required: true, message: 'Please enter the answer' },
                                                                                                              { max: 1000, message: 'Answer cannot be longer than 1000 characters' }
                                                                                                    ]}
                                                                                          >
                                                                                                    <Input.TextArea rows={4} placeholder="Enter answer" />
                                                                                          </Form.Item>
                                                                                </Form>
                                                                      </div>
                                                            </Modal>
                                                            <Modal
                                                                      centered
                                                                      open={isEditModalVisible}
                                                                      onCancel={() => {
                                                                                setIsEditModalVisible(false);
                                                                                editForm.resetFields();
                                                                      }}
                                                                      footer={[
                                                                                <div className="grid grid-cols-2 gap-4 mt-6">
                                                                                          <button

                                                                                                    key="cancel"
                                                                                                    onClick={() => {
                                                                                                              setIsEditModalVisible(false);
                                                                                                              editForm.resetFields();
                                                                                                    }}
                                                                                                    className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
                                                                                          >
                                                                                                    Cancel
                                                                                          </button>

                                                                                          <button
                                                                                                    key="submit"
                                                                                                    // loading={isCreating}
                                                                                                    onClick={() => editForm.submit()}
                                                                                                    className="py-2 px-4 rounded-lg bg-green-600 !text-white"
                                                                                          >
                                                                                                    Save
                                                                                          </button>
                                                                                </div>

                                                                      ]}
                                                            >
                                                                      <div className="p-5">
                                                                                <h2 className="text-2xl font-bold text-center mb-2">Edit FAQ</h2>

                                                                                <p className="text-center mb-6 text-gray-700">
                                                                                          Fill out the details below to edit a new FAQ. Ensure the answer provides clarity and helps users quickly
                                                                                          resolve their queries.
                                                                                </p>
                                                                                <Form
                                                                                          requiredMark={false}
                                                                                          form={editForm}
                                                                                          onFinish={handleEditFaq}
                                                                                          layout="vertical"
                                                                                >
                                                                                          <Form.Item name="_id" hidden>
                                                                                                    <Input />
                                                                                          </Form.Item>
                                                                                          <Form.Item
                                                                                                    name="question"
                                                                                                    label="Question"
                                                                                                    rules={[
                                                                                                              { required: true, message: 'Please enter the question' },
                                                                                                              { max: 200, message: 'Question cannot be longer than 200 characters' }
                                                                                                    ]}
                                                                                          >
                                                                                                    <Input placeholder="Enter question" />
                                                                                          </Form.Item>
                                                                                          <Form.Item
                                                                                                    name="answer"
                                                                                                    label="Answer"
                                                                                                    rules={[
                                                                                                              { required: true, message: 'Please enter the answer' },
                                                                                                              { max: 1000, message: 'Answer cannot be longer than 1000 characters' }
                                                                                                    ]}
                                                                                          >
                                                                                                    <Input.TextArea rows={4} placeholder="Enter answer" />
                                                                                          </Form.Item>
                                                                                </Form>
                                                                      </div>
                                                            </Modal>
                                                  </ConfigProvider>
                                        </div>
                              </div>
                    </>
          );
};

export default FAQ;
