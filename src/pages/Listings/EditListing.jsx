import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, InputNumber, DatePicker, message } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { dataSource } from '../../data/Data';

const { Option } = Select;
const { TextArea } = Input;

const EditListing = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the listing data from an API
    const foundListing = dataSource.find(item => item.key === '1'); 
    if (foundListing) {
      setListing(foundListing);
      form.setFieldsValue({
        ...foundListing,
        // Format date for DatePicker if needed
        date: foundListing.date ? new Date(foundListing.date) : null,
      });
    } else {
      message.error('Listing not found');
      navigate('/listing-management');
    }
  }, [form, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call to update the listing
      console.log('Updating listing:', values);
      
      // Simulate API call
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="space-y-6"
          initialValues={{
            remember: true,
          }}
        >
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
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: 'Please select a category!',
                  },
                ]}
              >
                <Select size="large" placeholder="Select category">
                  <Option value="Category 1">Category 1</Option>
                  <Option value="Category 2">Category 2</Option>
                  <Option value="Category 3">Category 3</Option>
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
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: 'Please select a status!',
                  },
                ]}
              >
                <Select size="large" placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="Pending Approval">Pending Approval</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Form.Item
                label="User Name"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: 'Please input the user name!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter user name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please input a valid email!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter email" />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message: 'Please select a country!',
                  },
                ]}
              >
                <Select size="large" showSearch placeholder="Select country">
                  <Option value="Bangladesh">Bangladesh</Option>
                  <Option value="USA">USA</Option>
                  <Option value="UK">UK</Option>
                  <Option value="Canada">Canada</Option>
                  <Option value="Australia">Australia</Option>
                  <Option value="Germany">Germany</Option>
                  <Option value="Japan">Japan</Option>
                </Select>
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

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
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
              icon={<SaveOutlined />}
              loading={loading}
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