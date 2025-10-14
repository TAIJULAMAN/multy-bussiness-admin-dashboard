import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getImageBaseUrl } from "../../config/envConfig";
import Swal from "sweetalert2";
import { useUpdate_formationMutation } from "../../redux/api/formationApi";

export default function UpdateFormationModal({ open, onCancel, form, onDone, selectedFormation }) {
  const [updateFormation, { isLoading: isUpdating }] = useUpdate_formationMutation();

  const handleFinish = async (values) => {
    try {
      const hasNewImage = values?.["formation-image"]?.fileList?.length > 0;

      if (hasNewImage) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("detail", values.detail);
        const file = values["formation-image"].fileList[0].originFileObj;
        formData.append("formation-image", file);

        await updateFormation({ formatId: selectedFormation?._id, data: formData }).unwrap();
      } else {
        const updateData = { title: values.title, detail: values.detail };
        await updateFormation({ formatId: selectedFormation?._id, data: updateData }).unwrap();
      }

      Swal.fire({ icon: "success", title: "Success", text: "Formation updated successfully!" });
      form.resetFields();
      onDone?.();
      onCancel?.();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to update formation. Please try again." });
    }
  };
  return (
    <Modal title="Update Formation" open={open} onCancel={onCancel} footer={null} centered>
      <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter formation title" },
            { max: 100, message: "Title cannot exceed 100 characters" },
          ]}
        >
          <Input placeholder="Enter formation title" />
        </Form.Item>

        <Form.Item
          name="detail"
          label="Detail"
          rules={[
            { required: true, message: "Please enter formation detail" },
            { max: 500, message: "Detail cannot exceed 500 characters" },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter formation detail" />
        </Form.Item>

        <Form.Item name="formation-image" label="Formation Image (Optional)">
          <Upload listType="picture" maxCount={1} beforeUpload={() => false} accept="image/*">
            <Button icon={<UploadOutlined />}>Upload New Image</Button>
          </Upload>
        </Form.Item>

        {selectedFormation && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <img
              src={`${getImageBaseUrl()}/formation-image/${selectedFormation.image}`}
              alt={selectedFormation.title}
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isUpdating} className="bg-[#0091FF]">
            {isUpdating ? "Updating..." : "Update Formation"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
