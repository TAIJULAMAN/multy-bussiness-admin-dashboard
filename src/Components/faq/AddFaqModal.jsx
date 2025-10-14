import { Modal, Form, Input, Select } from "antd";
import Swal from "sweetalert2";
import { useCreateFaqMutation } from "../../redux/api/faqApi";

export default function AddFaqModal({ open, onCancel, form, onDone, tabs, activeTab }) {
  const [createFaq, { isLoading }] = useCreateFaqMutation();

  const handleFinish = async (values) => {
    try {
      await createFaq(values).unwrap();
      Swal.fire({ icon: "success", title: "FAQ Added", text: "New FAQ was added successfully!" });
      form.resetFields();
      onDone?.();
      onCancel?.();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to add FAQ. Please try again." });
    }
  };
  return (
    <Modal
      centered
      open={open}
      onCancel={onCancel}
      footer={[
        <div key="footer" className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={onCancel}
            className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
          >
            Cancel
          </button>
          <button
            onClick={() => form.submit()}
            className="py-2 px-4 rounded-lg bg-[#0091FF] !text-white"
            disabled={isLoading}
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
        <Form requiredMark={false} form={form} onFinish={handleFinish} layout="vertical">
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
              { max: 200, message: "Question cannot be longer than 200 characters" },
            ]}
          >
            <Input placeholder="Enter question" />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[
              { required: true, message: "Please enter the answer" },
              { max: 1000, message: "Answer cannot be longer than 1000 characters" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter answer" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
