import { Modal, Form, Input, Select } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import PageHeading from "../../Components/Shared/PageHeading";
import {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "../../redux/api/faqApi";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Buyer");
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const { data: faqData } = useGetAllFaqQuery({ role: activeTab });
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  // console.log("faqData of faq page", faqData);

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

  const handleAddFaq = async (values) => {
    try {
      await createFaq(values).unwrap();
      Swal.fire({
        icon: "success",
        title: "FAQ Added",
        text: "New FAQ was added successfully!",
      });
      setIsAddModalVisible(false);
      form.resetFields();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add FAQ. Please try again.",
      });
    }
  };

  const handleOpenEditModal = (faq) => {
    editForm.setFieldsValue({
      _id: faq._id,
      role: faq?.role,
      question: faq?.question,
      answer: faq?.answer,
    });
    setIsEditModalVisible(true);
  };

  const handleEditFaq = async (values) => {
    try {
      const { _id, ...data } = values;
      await updateFaq({ _id, data }).unwrap();
      Swal.fire({
        icon: "success",
        title: "FAQ Updated",
        text: "FAQ has been updated successfully!",
      });
      setIsEditModalVisible(false);
      editForm.resetFields();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update FAQ. Please try again.",
      });
    }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFaq({ _id: faq?._id }).unwrap();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "FAQ has been deleted successfully!",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete FAQ. Please try again.",
          });
        }
      }
    });
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
          </div>,
        ]}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>
          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to add a new FAQ. Ensure the answer
            provides clarity and helps users quickly resolve their queries.
          </p>
          <Form
            requiredMark={false}
            form={form}
            onFinish={handleAddFaq}
            layout="vertical"
          >
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
              initialValue={activeTab}
            >
              <Select placeholder="Select role">
                {tabs.map((tab) => (
                  <Select.Option key={tab.key} value={tab.key}>
                    {tab.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="question"
              label="Question"
              rules={[
                { required: true, message: "Please enter the question" },
                {
                  max: 200,
                  message: "Question cannot be longer than 200 characters",
                },
              ]}
            >
              <Input placeholder="Enter question" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[
                { required: true, message: "Please enter the answer" },
                {
                  max: 1000,
                  message: "Answer cannot be longer than 1000 characters",
                },
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
          </div>,
        ]}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Edit FAQ</h2>
          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to edit the FAQ. Ensure the answer
            provides clarity and helps users quickly resolve their queries.
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
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select role">
                {tabs.map((tab) => (
                  <Select.Option key={tab.key} value={tab.key}>
                    {tab.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="question"
              label="Question"
              rules={[
                { required: true, message: "Please enter the question" },
                {
                  max: 200,
                  message: "Question cannot be longer than 200 characters",
                },
              ]}
            >
              <Input placeholder="Enter question" />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Answer"
              rules={[
                { required: true, message: "Please enter the answer" },
                {
                  max: 1000,
                  message: "Answer cannot be longer than 1000 characters",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter answer" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default FAQ;
