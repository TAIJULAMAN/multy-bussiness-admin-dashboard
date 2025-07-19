import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, InputNumber, Upload, message, Image, Space } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { dataSource } from '../../data/Data';

const { Option } = Select;
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditListing = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [currentImages, setCurrentImages] = useState(['/bus1.png']); // Default image

  // Handle image upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
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
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    // In a real app, you would fetch the listing data from an API
    const foundListing = dataSource.find(item => item.key === '1'); 
    if (foundListing) {
      form.setFieldsValue({
        ...foundListing,
        date: foundListing.date ? new Date(foundListing.date) : null,
      });
      // Set current images if available
      if (foundListing.images && foundListing.images.length > 0) {
        setCurrentImages(foundListing.images);
      }
    } else {
      message.error('Listing not found');
      navigate('/listing-management');
    }
  }, [form, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // In a real app, you would upload the images to a server here
      const formData = new FormData();
      
      // Add new files to form data
      fileList.forEach(file => {
        formData.append('images', file.originFileObj);
      });
      
      // Add existing image URLs
      currentImages.forEach(imageUrl => {
        formData.append('existingImages', imageUrl);
      });
      
      // Simulate API call
      console.log('Updating listing with images:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('Listing updated successfully');
      navigate('/listing-management');
    } catch (error) {
      console.error('Error updating listing:', error);
      message.error('Failed to update listing');
    } finally {
      setLoading(false);
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">Current Images</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {currentImages.map((image, index) => (
                <div key={`current-${index}`} className="relative group">
                  <Image
                    src={image}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover border border-gray-200"
                    preview={{
                      src: image,
                    }}
                  />
                  <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newImages = [...currentImages];
                      newImages.splice(index, 1);
                      setCurrentImages(newImages);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Images</h3>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your upload endpoint
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              onRemove={handleRemove}
              multiple
              accept="image/*"
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <p className="text-sm text-gray-500 mt-2">
              Upload up to 8 images. Recommended size: 800x800px, max 2MB each.
            </p>
          </div>

          {previewImage && (
            <Image
              width={200}
              style={{ display: 'none' }}
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
                label="Product Name"
                name="productName"
                rules={[
                  {
                    required: true,
                    message: 'Please input the product name!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                label="Business Type"
                name="category"
                rules={[
                  {
                    required: true,
                    message: 'Please select a category!',
                  },
                ]}
              >
                <Select size="large" placeholder="Select category">
                  <Option value="Category 1">Business Type 1</Option>
                  <Option value="Category 2">Business Type 2</Option>
                  <Option value="Category 3">Business Type 3</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Price ($)"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please input the price!',
                  },
                ]}
              >
                <InputNumber 
                  size="large" 
                  className="w-full"
                  min={0}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                label="Industry"
                name="industry"
                rules={[
                  {
                    required: true,
                    message: 'Please select an industry!',
                  },
                ]}
              >
                <Select size="large" placeholder="Select industry">
                  <Option value="Active">Industry 1</Option>
                  <Option value="Inactive">Industry 2</Option>
                  <Option value="Pending Approval">Industry 3</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Business Location"
                name="businessLocation"
                rules={[
                  {
                    required: true,
                    message: 'Please select a business location!',
                  },
                ]}
              >
                <Select size="large" placeholder="Select business location">
                  <Option value="Active">Business Location 1</Option>
                  <Option value="Inactive">Business Location 2</Option>
                  <Option value="Pending Approval">Business Location 3</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Form.Item
                label="Ownership Type"
                name="ownershipType"
                rules={[
                  {
                    required: true,
                    message: 'Please input the ownership type!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter ownership type" />
              </Form.Item>

              <Form.Item
                label="Reason for listing"
                name="reasonForListing"
                rules={[
                  {
                    required: true,
                    message: 'Please input a reason for listing!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter reason for listing" />
              </Form.Item>

              <Form.Item
                label="Condition"
                name="condition"
                rules={[
                  {
                    required: true,
                    message: 'Please select the condition!',
                  },
                ]}
              >
                <Select size="large" placeholder="Select condition">
                  <Option value="New">New</Option>
                  <Option value="Used">Used</Option>
                  <Option value="Refurbished">Refurbished</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input the description!',
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
            <Button 
              onClick={() => navigate(-1)}
              className="px-6"
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
             
              loading={loading}
              className="px-6"
              size="large"
            >
              Save 
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditListing;