import { Modal, Form, Input, Upload, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { getImageBaseUrl } from "../../config/envConfig";
import Swal from "sweetalert2";
import { useUpdate_formationMutation } from "../../redux/api/formationApi";
import JoditComponent from "../Shared/JoditComponent";

export default function UpdateFormationModal({
  open,
  onCancel,
  form,
  onDone,
  selectedFormation,
}) {
  const [updateFormation, { isLoading: isUpdating }] =
    useUpdate_formationMutation();
  const [detailContent, setDetailContent] = useState("");

  useEffect(() => {
    if (open && selectedFormation?.detail) {
      setDetailContent(selectedFormation.detail);
      form.setFieldsValue({ detail: selectedFormation.detail });
    }
  }, [open, selectedFormation, form]);

  const handleFinish = async (values) => {
    try {
      const hasNewImage = values?.["formation-image"]?.fileList?.length > 0;

      if (hasNewImage) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("detail", values.detail);
        formData.append("metaTitle", values.metaTitle || "");
        formData.append("metaDescription", values.metaDescription || "");
        formData.append(
          "metaKeywords",
          JSON.stringify(values.metaKeywords || [])
        );
        const file = values["formation-image"].fileList[0].originFileObj;
        formData.append("formation-image", file);

        await updateFormation({
          formatId: selectedFormation?._id,
          data: formData,
        }).unwrap();
      } else {
        const updateData = {
          title: values.title,
          detail: values.detail,
          metaTitle: values.metaTitle || "",
          metaDescription: values.metaDescription || "",
          metaKeywords: values.metaKeywords || [],
        };
        await updateFormation({
          formatId: selectedFormation?._id,
          data: updateData,
        }).unwrap();
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "blog updated successfully!",
      });
      form.resetFields();
      onDone?.();
      onCancel?.();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update blog. Please try again.",
      });
    }
  };
  return (
    <Modal
      title="Update blog"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={1000}
      styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-4"
      >
        <Form.Item name="title" label="Title">
          <Input placeholder="Enter blog title" />
        </Form.Item>

        <Form.Item name="detail" label="Detail">
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
          rules={[
            { required: true, message: "Please enter at least one keyword" },
          ]}
        >
          <Select
            mode="tags"
            tokenSeparators={[","]}
            placeholder="Type and press Enter to add keywords"
          />
        </Form.Item>

        <Form.Item name="formation-image" label="blog Image (Optional)">
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload New Image</Button>
          </Upload>
        </Form.Item>

        {selectedFormation && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
            <img
              src={`${getImageBaseUrl()}/formation-image/${
                selectedFormation.image
              }`}
              alt={selectedFormation.title}
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdating}
            className="bg-[#0091FF]"
          >
            {isUpdating ? "Updating..." : "Update blog"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
