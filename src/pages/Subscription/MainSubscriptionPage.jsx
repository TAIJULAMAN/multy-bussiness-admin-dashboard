import { Form } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import PageHeading from "../../Components/Shared/PageHeading";
import SubscriptionManagement from "./Subscription";

const MainSubscriptionPage = () => {
          const [isAccordionOpen, setIsAccordionOpen] = useState(null);
          const [isAddModalVisible, setIsAddModalVisible] = useState(false);
          const [isEditModalVisible, setIsEditModalVisible] = useState(false);
          const [activeTab, setActiveTab] = useState('Buyer');
          const [form] = Form.useForm();
          const [editForm] = Form.useForm();

          const tabs = [
                    { key: 'Buyer', label: 'Buyer' },
                    { key: 'Seller', label: 'Seller' },
                    { key: 'Broker', label: 'Broker' },
                    { key: 'Franchise Owner', label: 'Franchise Owner' },
                    { key: 'Investor', label: 'Investor' },
                    { key: 'Business Idea Lister', label: 'Business Idea Lister' },
                    { key: 'Business Asset Seller', label: 'Business Asset Seller' },
          ];

          const handleClick = (index) => {
                    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
          };

          // const FAQAccordion = ({ faqs }) => (
          //           <div className="space-y-4">
          //                     {faqs.map((faq, index) => (
          //                               <div key={index} className="border rounded-lg">
          //                                         <div
          //                                                   className="flex items-center justify-between p-4 cursor-pointer"
          //                                                   onClick={() => handleClick(index)}
          //                                         >
          //                                                   <div className="flex items-center gap-2">
          //                                                             <FaRegQuestionCircle className="text-primary" />
          //                                                             <h3 className="text-lg font-medium">{faq.question}</h3>
          //                                                   </div>
          //                                                   <div className="flex items-center gap-4">
          //                                                             <div className="bg-[#0091FF] rounded  px-1.5 py-1">
          //                                                                       <button
          //                                                                                 onClick={(e) => {
          //                                                                                           e.stopPropagation();
          //                                                                                           handleOpenEditModal(faq);
          //                                                                                 }}
          //                                                                       >
          //                                                                                 <CiEdit className="text-xl text-white font-bold" />
          //                                                                       </button>
          //                                                             </div>
          //                                                             <div className="bg-[#FECACA] border border-[#EF4444] rounded  px-1.5 py-1">
          //                                                                       <button
          //                                                                                 onClick={(e) => {
          //                                                                                           e.stopPropagation();
          //                                                                                           handleDeleteAdmin(faq);
          //                                                                                 }}
          //                                                                       >
          //                                                                                 <RiDeleteBin6Line className="text-xl text-[#EF4444] font-bold" />
          //                                                                       </button>
          //                                                             </div>
          //                                                             <FaChevronDown
          //                                                                       className={`transition-transform duration-300 ${isAccordionOpen === index ? "rotate-180" : ""
          //                                                                                 }`}
          //                                                             />
          //                                                   </div>
          //                                         </div>
          //                                         {isAccordionOpen === index && (
          //                                                   <div className="p-4 pt-0">
          //                                                             <p className="text-gray-600">{faq.answer}</p>
          //                                                   </div>
          //                                         )}
          //                               </div>
          //                     ))}
          //           </div>
          // );

          // const handleDeleteAdmin = (faq) => {
          //           Swal.fire({
          //                     title: "Are you sure?",
          //                     text: "You are about to delete this FAQ",
          //                     icon: "warning",
          //                     showCancelButton: true,
          //                     confirmButtonColor: "#d33",
          //                     cancelButtonColor: "#3085d6",
          //                     confirmButtonText: "Yes, delete it!",
          //           });
          // };

          // const handleAddFaq = async (values) => {
          //           Swal.fire({
          //                     icon: "success",
          //                     title: "FAQ Added",
          //                     text: "New FAQ was added successfully!",
          //           });
          //           setIsAddModalVisible(false);
          //           form.resetFields();
          // };

          const handleOpenEditModal = (faq) => {
                    editForm.setFieldsValue({
                              _id: faq._id,
                              question: faq?.question,
                              answer: faq?.answer,
                    });
                    setIsEditModalVisible(true);
          };

          const handleEditFaq = async (values) => {
                    Swal.fire({
                              icon: "success",
                              title: "FAQ Updated",
                              text: "FAQ has been updated successfully!",
                    });
                    setIsEditModalVisible(false);
                    editForm.resetFields();
          };

          return (
                    <div className="p-5">
                              <div className="flex items-center justify-start mb-5">
                                        <PageHeading title="Subscription Management" />
                              </div>

                              {/* Custom Tab System */}
                              <div className="mb-5 border border-[#0091FF]">
                                        <div className="flex flex-wrap gap-2 bg-white">
                                                  {tabs.map((tab) => (
                                                            <button
                                                                      key={tab.key}
                                                                      onClick={() => setActiveTab(tab.key)}
                                                                      className={`px-10 py-2 text-sm font-medium transition-colors ${activeTab === tab.key
                                                                                ? 'bg-[#0091FF] !text-white'
                                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'

                                                                                }`}
                                                            >
                                                                      {tab.label}
                                                            </button>
                                                  ))}
                                        </div>
                              </div>

                              {/* FAQ Content */}
                              <div className="bg-white p-6 rounded-lg">
                                        <SubscriptionManagement />
                              </div>
                    </div>
          );
};

export default MainSubscriptionPage;
