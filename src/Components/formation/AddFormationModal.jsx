import { Modal, Form, Input, Upload, Button, Select } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useAdd_formationMutation } from "../../redux/api/formationApi";
import JoditComponent from "../Shared/JoditComponent";

export default function AddFormationModal({ open, onCancel, form, onDone }) {
  const [addFormation, { isLoading: isSubmitting }] = useAdd_formationMutation();
  const [detailContent, setDetailContent] = useState("");

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("detail", values.detail);
      formData.append("metaTitle", values.metaTitle || "");
      formData.append("metaDescription", values.metaDescription || "");
      formData.append("metaKeywords", JSON.stringify(values.metaKeywords || []));

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
      Swal.fire({ icon: "success", title: "Success", text: "Blog added successfully!" });
      form.resetFields();
      onDone?.();
      onCancel?.();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to add Blog. Please try again." });
    }
  };
  return (
    <Modal
      title="Add New Blog"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4">
        <Form.Item
          name="title"
          label="Title"
    
        >
          <Input placeholder="Enter Blog title" />
        </Form.Item>

        <Form.Item
          name="detail"
          label="Detail"
          rules={[{ required: true, message: "Please enter blog detail" }]}
        >
          <JoditComponent
            content={detailContent}
            setContent={(c) => {
              setDetailContent(c);
              form.setFieldsValue({ detail: c });
            }}
          />
        </Form.Item>

        <Form.Item
          name="metaTitle"
          label="Meta Title"
          rules={[{ required: true, message: "Please enter meta title" }]}
        >
          <Input placeholder="Enter meta title" />
        </Form.Item>

        <Form.Item
          name="metaDescription"
          label="Meta Description"
          rules={[{ required: true, message: "Please enter meta description" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter meta description" />
        </Form.Item>

        <Form.Item
          name="metaKeywords"
          label="Meta Keywords"
          rules={[{ required: true, message: "Please enter at least one keyword" }]}
        >
          <Select
            mode="tags"
            tokenSeparators={[","]}
            placeholder="Type and press Enter to add keywords"
          />
        </Form.Item>

        <Form.Item
          name="formation-image"
          label="blog Image"
          rules={[{ required: true, message: "Please upload an blog image" }]}
        >
          <Upload listType="picture" maxCount={1} beforeUpload={() => false} accept="image/*">
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting} className="bg-[#0091FF]">
            {isSubmitting ? "Adding..." : "Add Blog"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
