import { Modal, Form, Input, Select } from "antd";
import Swal from "sweetalert2";
import { useUpdateFaqMutation } from "../../redux/api/faqApi";

export default function EditFaqModal({ open, onCancel, form, onDone, tabs }) {
  const [updateFaq, { isLoading }] = useUpdateFaqMutation();

  const handleFinish = async (values) => {
    try {
      const { _id, ...data } = values;
      await updateFaq({ _id, data }).unwrap();
      Swal.fire({ icon: "success", title: "FAQ Updated", text: "FAQ has been updated successfully!" });
      form.resetFields();
      onDone?.();
      onCancel?.();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to update FAQ. Please try again." });
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
        <h2 className="text-2xl font-bold text-center mb-2">Edit FAQ</h2>
        <p className="text-center mb-6 text-gray-700">
          Fill out the details below to edit the FAQ. Ensure the answer
          provides clarity and helps users quickly resolve their queries.
        </p>
        <Form requiredMark={false} form={form} onFinish={handleFinish} layout="vertical">
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
