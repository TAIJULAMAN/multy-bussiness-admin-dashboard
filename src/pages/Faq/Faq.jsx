import { Modal, Form, Input } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import PageHeading from "../../Components/Shared/PageHeading";

const FAQ = () => {
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

          const faqData = {
                    'Buyer': [
                      {
                        question: "How do I find businesses for sale?",
                        answer: "You can browse our marketplace, use filters to narrow down your search, and contact sellers directly through our platform."
                      },
                      {
                        question: "What should I consider before buying a business?",
                        answer: "Consider factors like financial records, business valuation, market potential, and legal requirements. We recommend conducting due diligence."
                      },
                      {
                        question: "Can I get financing to buy a business?",
                        answer: "Yes, we partner with financial institutions to offer loan options. You can apply directly through our financing section."
                      },
                      {
                        question: "How long does the buying process usually take?",
                        answer: "Depending on the complexity, it can take from a few weeks to a few months. Due diligence and negotiations impact the timeline."
                      },
                      {
                        question: "Is there support available during the buying process?",
                        answer: "Yes, we offer buyer guides, consultation services, and legal templates to assist you every step of the way."
                      }
                    ],
                    'Seller': [
                      {
                        question: "How do I list my business for sale?",
                        answer: "Click on 'List Your Business', fill in the required details about your business, upload relevant documents, and set your asking price."
                      },
                      {
                        question: "What documents do I need to sell my business?",
                        answer: "You'll need financial statements, tax returns, business licenses, lease agreements, and other relevant legal documents."
                      },
                      {
                        question: "How do I attract serious buyers?",
                        answer: "Write a detailed listing, use professional images, and be responsive to inquiries. Transparency builds trust with buyers."
                      },
                      {
                        question: "Can I update my listing after publishing?",
                        answer: "Yes, you can edit your listing at any time from your seller dashboard."
                      },
                      {
                        question: "Is there a fee for listing my business?",
                        answer: "We offer both free and premium listing options, depending on the visibility and features you prefer."
                      }
                    ],
                    'Broker': [
                      {
                        question: "How do I manage my client listings?",
                        answer: "Access your broker dashboard to add, edit, or remove listings. You can also track inquiries and manage client communications."
                      },
                      {
                        question: "What commission rates are standard?",
                        answer: "Commission rates vary based on the deal size and complexity. You can set your rates and discuss them with clients."
                      },
                      {
                        question: "Can I represent both buyers and sellers?",
                        answer: "Yes, but ensure full transparency and avoid conflicts of interest by disclosing your representation to both parties."
                      },
                      {
                        question: "How do I get featured as a broker?",
                        answer: "Apply for a featured broker status in your profile settings to gain more visibility and attract more leads."
                      },
                      {
                        question: "What analytics tools are available to brokers?",
                        answer: "We provide listing performance stats, client engagement reports, and industry insights to help optimize your strategy."
                      }
                    ],
                    'Franchise Owner': [
                      {
                        question: "How do I expand my franchise network?",
                        answer: "List your franchise opportunity, specify territory requirements, and connect with potential franchisees through our platform."
                      },
                      {
                        question: "What support do you provide to franchise owners?",
                        answer: "We offer tools for managing franchise listings, connecting with qualified buyers, and tracking franchise applications."
                      },
                      {
                        question: "Can I advertise my franchise opportunities?",
                        answer: "Yes, you can promote your listings with featured ads and email campaigns targeting potential franchisees."
                      },
                      {
                        question: "How do I screen potential franchisees?",
                        answer: "You can request applications, conduct background checks, and use our qualification tools to ensure suitability."
                      },
                      {
                        question: "Is there a way to manage royalties and fees?",
                        answer: "We integrate with accounting tools to help you manage royalties, franchise fees, and ongoing payments efficiently."
                      }
                    ],
                    'Investor': [
                      {
                        question: "How do I find investment opportunities?",
                        answer: "Browse our investment section, filter by industry and investment size, and connect with business owners seeking funding."
                      },
                      {
                        question: "What due diligence tools are available?",
                        answer: "We provide financial analysis tools, market research data, and connection to verified business advisors."
                      },
                      {
                        question: "Can I invest in a business remotely?",
                        answer: "Yes, many deals allow for remote investment, and documentation can be handled securely through our platform."
                      },
                      {
                        question: "How do I evaluate a startup's potential?",
                        answer: "Review their pitch, team background, market opportunity, and financial projections. Use our evaluation checklist for guidance."
                      },
                      {
                        question: "Are there investment minimums?",
                        answer: "Minimum investment amounts vary by business. Some start as low as $1,000, while others require more substantial capital."
                      }
                    ],
                    'Business Idea Lister': [
                      {
                        question: "How do I protect my business idea?",
                        answer: "We offer NDA templates and secure communication channels. You can choose who sees your detailed business plan."
                      },
                      {
                        question: "What should my idea pitch include?",
                        answer: "Include your value proposition, market analysis, revenue model, required investment, and expected returns."
                      },
                      {
                        question: "Can I get feedback on my idea?",
                        answer: "Yes, you can request feedback from our community or schedule a session with a mentor or advisor."
                      },
                      {
                        question: "Is it possible to find co-founders here?",
                        answer: "Absolutely. You can indicate you're looking for co-founders and connect with interested individuals."
                      },
                      {
                        question: "How do I know if my idea is gaining interest?",
                        answer: "We provide view counts, engagement metrics, and inquiry notifications to help you track interest."
                      }
                    ],
                    'Business Asset Seller': [
                      {
                        question: "How do I list business assets?",
                        answer: "Use our asset listing form to detail your equipment, inventory, or other business assets. Include photos and condition reports."
                      },
                      {
                        question: "What types of assets can I sell?",
                        answer: "You can sell equipment, machinery, inventory, intellectual property, and other business-related assets."
                      },
                      {
                        question: "Can I bundle multiple assets in one listing?",
                        answer: "Yes, you can bundle items as a package deal and specify individual or total prices."
                      },
                      {
                        question: "Is there a valuation tool available?",
                        answer: "Yes, use our asset valuation calculator to get an estimated market value based on condition and type."
                      },
                      {
                        question: "What happens after someone expresses interest?",
                        answer: "You'll receive a message notification and can negotiate terms directly with the buyer through our messaging system."
                      }
                    ]
                  };
                  

          const handleClick = (index) => {
                    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
          };

          const FAQAccordion = ({ faqs }) => (
                    <div className="space-y-4">
                              {faqs.map((faq, index) => (
                                        <div key={index} className="border rounded-lg">
                                                  <div
                                                            className="flex items-center justify-between p-4 cursor-pointer"
                                                            onClick={() => handleClick(index)}
                                                  >
                                                            <div className="flex items-center gap-2">
                                                                      <FaRegQuestionCircle className="text-primary" />
                                                                      <h3 className="text-lg font-medium">{faq.question}</h3>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                      <div className="bg-[#0091FF] rounded  px-1.5 py-1">
                                                                                <button
                                                                                          onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    handleOpenEditModal(faq);
                                                                                          }}
                                                                                >
                                                                                          <CiEdit className="text-xl text-white font-bold" />
                                                                                </button>
                                                                      </div>
                                                                      <div className="bg-[#FECACA] border border-[#EF4444] rounded  px-1.5 py-1">
                                                                                <button
                                                                                          onClick={(e) => {
                                                                                                    e.stopPropagation();
                                                                                                    handleDeleteAdmin(faq);
                                                                                          }}
                                                                                >
                                                                                          <RiDeleteBin6Line className="text-xl text-[#EF4444] font-bold" />
                                                                                </button>
                                                                      </div>
                                                                      <FaChevronDown
                                                                                className={`transition-transform duration-300 ${isAccordionOpen === index ? "rotate-180" : ""
                                                                                          }`}
                                                                      />
                                                            </div>
                                                  </div>
                                                  {isAccordionOpen === index && (
                                                            <div className="p-4 pt-0">
                                                                      <p className="text-gray-600">{faq.answer}</p>
                                                            </div>
                                                  )}
                                        </div>
                              ))}
                    </div>
          );

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

          const handleAddFaq = async (values) => {
                    Swal.fire({
                              icon: "success",
                              title: "FAQ Added",
                              text: "New FAQ was added successfully!",
                    });
                    setIsAddModalVisible(false);
                    form.resetFields();
          };

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
                              <div className="flex items-center justify-between mb-5">
                                        <PageHeading title="FAQ Management" />
                                        <button
                                                  // type="submit"
                                                  onClick={() => setIsAddModalVisible(true)}
                                                  className="bg-[#0091FF] !text-white px-5 py-2 rounded"
                                        >
                                                  + Add FAQ
                                        </button>
                              </div>

                              {/* Custom Tab System */}
                              <div className="mb-5 border border-[#0091FF]">
                                        <div className="flex flex-wrap gap-2 bg-white">
                                                  {tabs.map((tab) => (
                                                            <button
                                                                      key={tab.key}
                                                                      onClick={() => setActiveTab(tab.key)}
                                                                      className={`px-10 py-2 text-sm font-medium transition-colors ${activeTab === tab.key
                                                                                ? 'bg-[#0091FF] text-white'
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
                                        <FAQAccordion faqs={faqData[activeTab] || []} />
                              </div>

                              {/* Add FAQ Modal */}
                              <Modal
                                        centered
                                        open={isAddModalVisible}
                                        onCancel={() => {
                                                  setIsAddModalVisible(false);
                                                  form.resetFields();
                                        }}
                                        footer={[
                                                  <div key="footer" className="grid grid-cols-2 gap-4 mt-6">
                                                            <button
                                                                      onClick={() => {
                                                                                setIsAddModalVisible(false);
                                                                                form.resetFields();
                                                                      }}
                                                                      className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
                                                            >
                                                                      Cancel
                                                            </button>
                                                            <button
                                                                      onClick={() => form.submit()}
                                                                      className="py-2 px-4 rounded-lg bg-[#0091FF] !text-white"
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

                              {/* Edit FAQ Modal */}
                              <Modal
                                        centered
                                        open={isEditModalVisible}
                                        onCancel={() => {
                                                  setIsEditModalVisible(false);
                                                  editForm.resetFields();
                                        }}
                                        footer={[
                                                  <div key="footer" className="grid grid-cols-2 gap-4 mt-6">
                                                            <button
                                                                      onClick={() => {
                                                                                setIsEditModalVisible(false);
                                                                                editForm.resetFields();
                                                                      }}
                                                                      className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
                                                            >
                                                                      Cancel
                                                            </button>
                                                            <button
                                                                      onClick={() => editForm.submit()}
                                                                      className="py-2 px-4 rounded-lg bg-[#0091FF] !text-white"
                                                            >
                                                                      Save
                                                            </button>
                                                  </div>
                                        ]}
                              >
                                        <div className="p-5">
                                                  <h2 className="text-2xl font-bold text-center mb-2">Edit FAQ</h2>
                                                  <p className="text-center mb-6 text-gray-700">
                                                            Fill out the details below to edit the FAQ. Ensure the answer provides clarity and helps users quickly
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
                    </div>
          );
};

export default FAQ;
