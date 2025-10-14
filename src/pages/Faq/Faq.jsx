import { Form } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import PageHeading from "../../Components/Shared/PageHeading";
import AddFaqModal from "../../Components/faq/AddFaqModal";
import EditFaqModal from "../../Components/faq/EditFaqModal";
import DeleteFaqButton from "../../Components/faq/DeleteFaqButton";
import { useGetAllFaqQuery, useDeleteFaqMutation } from "../../redux/api/faqApi";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Buyer");
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const { data: faqData } = useGetAllFaqQuery({ role: activeTab });
  const [deleteFaq] = useDeleteFaqMutation();

  const tabs = [
    { key: "Buyer", label: "Buyer" },
    { key: "Seller", label: "Seller" },
    { key: "Investor", label: "Investor" },
    { key: "Broker", label: "Broker" },
    { key: "Asset Seller", label: "Asset Seller" },
    { key: "Francise Seller", label: "Francise Seller" },
    { key: "Business Idea Lister", label: "Business Idea Lister" },
  ];

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
              <DeleteFaqButton faq={faq} />
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  isAccordionOpen === index ? "rotate-180" : ""
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

  const handleOpenEditModal = (faq) => {
    editForm.setFieldsValue({
      _id: faq._id,
      role: faq?.role,
      question: faq?.question,
      answer: faq?.answer,
    });
    setIsEditModalVisible(true);
  };

  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <PageHeading title="FAQ Management" />
        <button
          onClick={() => setIsAddModalVisible(true)}
          className="py-2 px-4 rounded-lg bg-[#0091FF] !text-white"
        >
          Add FAQ for {activeTab}
        </button>
      </div>

      <div className="mb-5 border border-[#0091FF]">
        <div className="flex flex-wrap gap-2 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-10 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-[#0091FF] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {faqData?.data && faqData.data.length > 0 ? (
          <FAQAccordion faqs={faqData?.data} />
        ) : (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-gray-600">
              No FAQ data available for {activeTab}
            </div>
          </div>
        )}
      </div>

      <AddFaqModal
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
        form={form}
        onDone={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
        tabs={tabs}
        activeTab={activeTab}
      />

      <EditFaqModal
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
        }}
        form={editForm}
        onDone={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
        }}
        tabs={tabs}
      />
    </>
  );
};

export default FAQ;
