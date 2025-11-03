import React, { useState } from "react";
import { Card, Form, Input, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";

const { Dragger } = Upload;
const { TextArea } = Input;

export default function AddFormation() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      return false;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log("Form values:", { ...values, imageUrl });

      message.success("blog added successfully");
      navigate("/categories");
    } catch (error) {
      message.error("Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeading title="Add New blog" />
      <Card className="mt-6 shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Image Upload */}
          <Form.Item
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Dragger {...uploadProps} className="bg-gray-50">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="uploaded"
                  className="max-h-[200px] object-contain mx-auto"
                />
              ) : (
                <div className="p-8">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined className="text-[#0091FF]" />
                  </p>
                  <p className="ant-upload-text text-lg">
                    + Upload Business blog Image
                  </p>
                  <p className="ant-upload-hint text-gray-500">
                    Click or drag file to this area to upload.
                  </p>
                </div>
              )}
            </Dragger>
          </Form.Item>

          {/* Title */}
          <Form.Item
            label="Business blog Title"
            name="title"
            rules={[{ required: true, message: "Please enter blog title" }]}
          >
            <Input placeholder="Enter blog title" className="h-12" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Describe In Detail"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea
              placeholder="Enter description"
              rows={6}
              className="resize-none"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-[#0091FF] h-12 px-8 w-full sm:w-auto"
            >
              Add Now
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
