import { Modal, Form, Input, Upload, Button } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import PageHeading from "../../Components/Shared/PageHeading";
import Loader from "../../Components/Shared/Loaders/Loader";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Category_delete_modal from "../Categories/Category_delete_modal";
import {
  useGet_all_formationQuery,
  useAdd_formationMutation,
  useUpdate_formationMutation,
} from "../../redux/api/formationApi";
import { getImageBaseUrl } from "../../config/envConfig";
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";

export default function Formation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data: formationData, isLoading } = useGet_all_formationQuery();
  const [addFormation, { isLoading: isSubmitting }] =
    useAdd_formationMutation();
  const [updateFormation, { isLoading: isUpdating }] =
    useUpdate_formationMutation();
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [selectedFormation, setSelectedFormation] = useState(null);
  console.log("selectedFormation", selectedFormation);

  const handleAddFormation = async (values) => {
    try {
      //   console.log("Form values:", values);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("detail", values.detail);

      // Handle file upload properly
      if (
        values?.["formation-image"] &&
        values?.["formation-image"]?.fileList &&
        values?.["formation-image"]?.fileList?.length > 0
      ) {
        const file = values["formation-image"].fileList[0].originFileObj;
        // console.log("File to upload:", file);
        formData.append("formation-image", file);
      } else {
        // console.log("No image file found");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please select an image file.",
        });
        return;
      }

      await addFormation(formData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Formation added successfully!",
      });
      setAddModalOpen(false);
      form.resetFields();
    } catch (error) {
      //   console.error("Error adding formation:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add formation. Please try again.",
      });
    }
  };

  const handleUpdateFormation = async (values) => {
    try {
      // Check if image is being updated
      const hasNewImage = values?.["formation-image"]?.fileList?.length > 0;
      
      if (hasNewImage) {
        // Use FormData if new image is uploaded
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("detail", values.detail);
        const file = values["formation-image"].fileList[0].originFileObj;
        formData.append("formation-image", file);
        
        await updateFormation({
          formatId: selectedFormation?._id,
          data: formData,
        }).unwrap();
      } else {
        // Use JSON if only text fields are updated
        const updateData = {
          title: values.title,
          detail: values.detail,
        };
        
        await updateFormation({
          formatId: selectedFormation?._id,
          data: updateData,
        }).unwrap();
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Formation updated successfully!",
      });
      setUpdateModalOpen(false);
      updateForm.resetFields();
      setSelectedFormation(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update formation. Please try again.",
      });
    }
  };

  const handleOpenUpdateModal = (formation) => {
    setSelectedFormation(formation);
    updateForm.setFieldsValue({
      title: formation.title,
      detail: formation.detail,
    });
    setUpdateModalOpen(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageHeading title="Catagories Management" />
        <div className="text-white">
          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-[#0091FF] px-6 py-3 rounded cursor-pointer"
          >
            + Add New Formation
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {formationData?.data && formationData?.data?.length > 0 ? (
          formationData?.data?.map((formation) => (
            <div
              key={formation._id}
              className="max-w-md w-full mx-auto border border-gray-300 rounded-lg p-5 bg-white"
            >
              <div className="space-y-4">
                <img
                  src={
                    formation.image
                      ? `${getImageBaseUrl()}/formation-image/${
                          formation?.image
                        }`
                      : "https://avatar.iran.liara.run/public/23"
                  }
                  alt={formation.title}
                  className="w-full h-[200px] object-cover rounded-lg bg-gray-100"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    {formation.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center text-sm text-gray-600">
                      {formation.detail}
                    </span>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-4">
                  <button
                    onClick={() => handleOpenUpdateModal(formation)}
                    className="p-2 text-green-600 hover:text-green-800"
                  >
                    <FiEdit size={24} className="text-[#0091FF]" />
                  </button>

                  <div className="h-6 w-px bg-gray-200"></div>

                  <button
                    onClick={() => {
                      setCategory(formation);
                      setDeleteModalOpen(true);
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-8">
            <div className="text-lg text-gray-600">No formations found</div>
          </div>
        )}
        {/* Add Formation Modal */}
        <Modal
          title="Add New Formation"
          open={addModalOpen}
          onCancel={() => {
            setAddModalOpen(false);
            form.resetFields();
          }}
          footer={null}
          centered
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddFormation}
            className="mt-4"
          >
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

            <Form.Item
              name="formation-image"
              label="Formation Image"
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                onClick={() => {
                  setAddModalOpen(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="bg-[#0091FF]"
              >
                {isSubmitting ? "Adding..." : "Add Formation"}
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Update Formation Modal */}
        <Modal
          title="Update Formation"
          open={updateModalOpen}
          onCancel={() => {
            setUpdateModalOpen(false);
            updateForm.resetFields();
            setSelectedFormation(null);
          }}
          footer={null}
          centered
        >
          <Form
            form={updateForm}
            layout="vertical"
            onFinish={handleUpdateFormation}
            className="mt-4"
          >
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

            <Form.Item
              name="formation-image"
              label="Formation Image (Optional)"
            >
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
              <Button
                onClick={() => {
                  setUpdateModalOpen(false);
                  updateForm.resetFields();
                  setSelectedFormation(null);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isUpdating}
                className="bg-[#0091FF]"
              >
                {isUpdating ? "Updating..." : "Update Formation"}
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Delete Formation Modal */}
        <Modal
          open={deleteModalOpen}
          centered
          footer={null}
          onCancel={() => {
            setCategory(null);
            setDeleteModalOpen(false);
          }}
        >
          <Category_delete_modal
            category={category}
            onclose={() => {
              setCategory(null);
              setDeleteModalOpen(false);
            }}
          />
        </Modal>
      </div>
    </>
  );
}
