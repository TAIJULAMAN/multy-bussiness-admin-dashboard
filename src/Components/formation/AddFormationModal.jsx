import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useAdd_formationMutation } from "../../redux/api/formationApi";

export default function AddFormationModal({ open, onCancel, form, onDone }) {
  const [addFormation, { isLoading: isSubmitting }] = useAdd_formationMutation();

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("detail", values.detail);

      if (
        values?.["formation-image"] &&
        values?.["formation-image"]?.fileList &&
        values?.["formation-image"]?.fileList?.length > 0
      ) {
        const file = values["formation-image"].fileList[0].originFileObj;
        formData.append("formation-image", file);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Please select an image file." });
        return;
      }

      await addFormation(formData).unwrap();
      Swal.fire({ icon: "success", title: "Success", text: "Formation added successfully!" });
      form.resetFields();
      onDone?.();
      onCancel?.();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to add formation. Please try again." });
    }
  };
  return (
    <Modal
      title="Add New Formation"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter formation title" },
            
          ]}
        >
          <Input placeholder="Enter formation title" />
        </Form.Item>

        <Form.Item
          name="detail"
          label="Detail"
          rules={[
            { required: true, message: "Please enter formation detail" },
           
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter formation detail" />
        </Form.Item>

        <Form.Item
          name="formation-image"
          label="Formation Image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload listType="picture" maxCount={1} beforeUpload={() => false} accept="image/*">
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting} className="bg-[#0091FF]">
            {isSubmitting ? "Adding..." : "Add Formation"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
