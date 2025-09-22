import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, InputNumber, Upload, message, Image } from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useUpdateListingDetailsMutation } from "../../redux/api/listingApi";
import { getImageBaseUrl } from "../../config/envConfig";
import Swal from "sweetalert2";

const { TextArea } = Input;

// helper to get filename from url
const extractFileName = (path) => {
  if (!path) return null;
  try {
    const url = typeof path === "string" ? path : "";
    const idx = url.lastIndexOf("/");
    return idx >= 0 ? url.substring(idx + 1) : url;
  } catch (e) {
    return path;
  }
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [currentImages, setCurrentImages] = useState([]);

  // Get listing data from navigation state
  const listingData = location.state?.listing;
  // console.log("listingData from edit list", listingData);

  // Update listing details mutation
  const [updateListingDetails, { isLoading }] =
    useUpdateListingDetailsMutation();

  // Handle image upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }
    return isImage && isLt2M;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // Initialize form with listing data
  useEffect(() => {
    if (listingData) {
      form.setFieldsValue({
        title: listingData?.title || "",
        category: listingData.category || "",
        subCategory: listingData.subCategory || "",
        businessType: listingData.businessType || "",
        ownerShipType: listingData?.ownerShipType || "No OwnerShip Type",
        askingPrice: listingData.askingPrice || 0,
        price: listingData.price || 0,
        country: listingData.country || "",
        countryName: listingData.countryName || "",
        state: listingData.state || "",
        city: listingData.city || "",
        reason: listingData.reason || "",
        business_image: listingData.data?.image || "",
        description: listingData.description || "",
        image: listingData?.image || "",
      });
    } else {
      message.error("No listing data found. Please select a listing to edit.");
      navigate("/listing-management");
    }
  }, [form, navigate, listingData]);

  const onFinish = async (values) => {
    try {
      // Prepare update data
      const businessImageFromUI = extractFileName(currentImages);
      const updateData = {
        title: values.title,
        category: values.category,
        country: values.country,
        image: values.image,
        reason: values.reason,
        subCategory: values.subCategory,
        state: values.state,
        city: values.city,
        countryName: values.countryName,
        askingPrice: values.askingPrice,
        price: values.price,
        ownerShipType: values.ownerShipType,
        businessType: values.businessType,
        description: values.description,
      };

      // Call update mutation
      await updateListingDetails({
        businessId: listingData._id,
        user: listingData?.user?._id,
        data: updateData,
      }).unwrap();

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Listing updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Navigate back to listings
      navigate("/listing-management");
    } catch (error) {
      console.error("Error updating listing:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error?.data?.message || "Failed to update listing. Please try again.",
        confirmButtonColor: "#0091FF",
      });
    }
  };

  const handleRemove = (file) => {
    // In a real app, you might want to mark the image for deletion
    // or remove it from the fileList state
    return true;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Listing</h1>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        <div className="mt-2">
          <img
            src={
              (listingData?.image &&
                `${getImageBaseUrl()}/business-image/${listingData.image}`) ||
              "default-image.jpg"
            }
            width={80}
            height={80}
            alt="current Product Image"
            className="bg-slate-100 border cursor-pointer"
          />
        </div>

        <Form
          form={form}
          name="editListing"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="space-y-6"
        >
          {/* Current Images Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Current Images
            </h3>
          </div>

          {/* Image Upload Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Upload New Images
            </h3>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your upload endpoint
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              onRemove={handleRemove}
              multiple={false}
              maxCount={1}
              accept="image/*"
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <p className="text-sm text-gray-500 mt-2">
              Upload one image. Recommended size: 800x800px, max 2MB.
            </p>
          </div>

          {previewImage && (
            <Image
              width={200}
              style={{ display: "none" }}
              src={previewImage}
              preview={{
                visible: previewOpen,
                title: previewTitle,
                onVisibleChange: (visible) => !visible && setPreviewOpen(false),
              }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input the listing title!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter listing name" />
              </Form.Item>

              <Form.Item
                label="Price ($)"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input the price!",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  className="w-full"
                  min={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input the category!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter category" />
              </Form.Item>

              <Form.Item label="Sub Category" name="subCategory">
                <Input size="large" placeholder="Enter sub category" />
              </Form.Item>

              <Form.Item label="Business Type" name="businessType">
                <Input size="large" placeholder="Enter business type" />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Form.Item label="Ownership Type" name="ownerShipType">
                <Input size="large" placeholder="Enter ownership type" />
              </Form.Item>

              <Form.Item label="Asking Price ($)" name="askingPrice">
                <InputNumber
                  size="large"
                  className="w-full"
                  min={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item label="Country" name="country">
                <Input size="large" placeholder="Enter country code" />
              </Form.Item>

              <Form.Item label="Country Name" name="countryName">
                <Input size="large" placeholder="Enter country name" />
              </Form.Item>

              <Form.Item label="State" name="state">
                <Input size="large" placeholder="Enter state" />
              </Form.Item>

              <Form.Item label="City" name="city">
                <Input size="large" placeholder="Enter city" />
              </Form.Item>

              <Form.Item label="Reason" name="reason">
                <Input size="large" placeholder="Enter selling reason" />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the description!",
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter detailed description about the product"
              className="resize-none"
            />
          </Form.Item>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 gap-5">
            <Button onClick={() => navigate(-1)} className="px-6" size="large">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="px-6"
              size="large"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditListing;
