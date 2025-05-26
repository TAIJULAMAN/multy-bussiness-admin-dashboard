import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { CheckIcon, PlusIcon, XMarkIcon, PencilIcon } from './icons.jsx';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';

export default function SubscriptionManagement() {
  const initialPlans = {
    bronze: {
      id: 'bronze',
      name: 'bronze',
      displayName: 'Bronze Plan',
      price: '2.99',
      period: 'month',
      features: [
        { id: 1, text: 'Priority listing' },
        { id: 2, text: 'Customer messaging' },
        { id: 3, text: 'Basic analytics' },
        { id: 4, text: 'Email support' },
      ],
    },
    silver: {
      id: 'silver',
      name: 'silver',
      displayName: 'Silver Plan',
      price: '24.99',
      period: 'month',
      features: [
        { id: 1, text: 'Priority listing' },
        { id: 2, text: 'Customer messaging' },
        { id: 3, text: 'Advanced analytics' },
        { id: 4, text: 'Premium support' },
        { id: 5, text: 'Unlimited listings' },
      ],
    },
    gold: {
      id: 'gold',
      name: 'gold',
      displayName: 'Gold Plan',
      price: '232.99',
      period: 'year',
      features: [
        { id: 1, text: 'Priority listing' },
        { id: 2, text: 'Customer messaging' },
        { id: 3, text: 'Advanced analytics' },
        { id: 4, text: 'Premium support' },
        { id: 5, text: 'Unlimited listings' },
        { id: 6, text: 'Dedicated account manager' },
      ],
    },
  };

  const [selectedPlan, setSelectedPlan] = useState('bronze');
  const [plans, setPlans] = useState(initialPlans);

  // Modals state
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  // Form states
  const [newPrice, setNewPrice] = useState('');
  const [newPeriod, setNewPeriod] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [tempFeatures, setTempFeatures] = useState([]);

  // Update form values when selected plan changes
  useEffect(() => {
    if (plans[selectedPlan]) {
      setNewPrice(plans[selectedPlan].price);
      setNewPeriod(plans[selectedPlan].period);
    }
  }, [selectedPlan, plans]);

  // Open price update modal
  const handleOpenPriceModal = () => {
    setNewPrice(plans[selectedPlan].price);
    setNewPeriod(plans[selectedPlan].period);
    setIsPriceModalOpen(true);
  };

  // Save updated price
  const handleSavePrice = () => {
    const updatedPlans = {
      ...plans,
      [selectedPlan]: {
        ...plans[selectedPlan],
        price: newPrice,
        period: newPeriod,
      },
    };

    setPlans(updatedPlans);
    setIsPriceModalOpen(false);

    // Log data for backend integration
    console.log('Updated price data:', {
      planId: selectedPlan,
      price: newPrice,
      period: newPeriod,
    });
  };

  // Open feature management modal
  const handleOpenFeatureModal = () => {
    setTempFeatures([...plans[selectedPlan].features]);
    setIsFeatureModalOpen(true);
  };

  // Add a new feature
  const handleAddFeature = () => {
    if (newFeature.trim() === '')
      return toast.error('please add a valid feature');
    if (tempFeatures.length >= 6) {
      return toast.error('Feature limit reached.');
    }
    const newId =
      tempFeatures.length > 0
        ? Math.max(...tempFeatures.map((f) => f.id)) + 1
        : 1;

    setTempFeatures([...tempFeatures, { id: newId, text: newFeature }]);
    setNewFeature('');
  };

  // Remove a feature
  const handleRemoveFeature = (id) => {
    setTempFeatures(tempFeatures.filter((feature) => feature.id !== id));
  };

  // Save updated features
  function handleSaveFeatures() {
    const updatedPlans = {
      ...plans,
      [selectedPlan]: {
        ...plans[selectedPlan],
        features: [...tempFeatures],
      },
    };

    setPlans(updatedPlans);
    setIsFeatureModalOpen(false);

    // Log data for backend integration
    console.log('Updated features data:', {
      planId: selectedPlan,
      features: tempFeatures,
    });
  }

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Buyers Subscription Plan</h1>
       
      </div>

      {/* Plan Tabs */}
      <div className="w-full">
        <div className="grid grid-cols-3 mb-8 border rounded-md overflow-hidden">
          {Object.keys(plans).map((planKey) => (
            <button
              key={planKey}
              onClick={() => setSelectedPlan(planKey)}
              className={`py-3 px-4 text-center transition-colors ${
                selectedPlan === planKey
                  ? 'bg-[#0091FF] !text-white'
                  : 'bg-white hover:bg-gray-50'
              } cursor-pointer`}
            >
              {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
            </button>
          ))}
        </div>

        {/* Plan Content */}
        {Object.keys(plans).map((planKey) => (
          <div
            key={planKey}
            className={`mt-0 ${selectedPlan !== planKey ? 'hidden' : ''}`}
          >
            <div className="border-2 rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {plans[planKey].displayName}
                      </h2>
                      <p className="text-gray-500">
                        Subscription details and features
                      </p>
                    </div>
                    <button
                      onClick={handleOpenPriceModal}
                      className="bg-[#0091FF] cursor-pointer !text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Update Price
                    </button>
                  </div>
                  <div className="mb-6">
                    <span className="text-[#0091FF] text-4xl font-bold">
                      $ {plans[planKey].price}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{plans[planKey].period}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Features</h3>
                    <button
                      onClick={handleOpenFeatureModal}
                      className="border border-[#022C22] text-[#022C22]  cursor-pointer hover:bg-[#022C22] hover:!text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Manage Features
                    </button>
                  </div>

                  <ul className="space-y-3 mt-4">
                    {plans[planKey].features.map((feature) => (
                      <li key={feature.id} className="flex items-center gap-2">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-transparent border-1 bortder-[#022C22] flex items-center justify-center">
                          <CheckIcon className="h-3 w-3 text-[#022C22]" />
                        </div>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Update Modal */}
      <Modal
        title="Update Subscription Price"
        open={isPriceModalOpen}
        onCancel={() => setIsPriceModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSavePrice}
          className="mt-4"
        >
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input
              type="number"
              step="0.01"
              min="0"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            name="period"
            label="Billing Period"
            rules={[{ required: true, message: 'Please select billing period' }]}
          >
            <Select
              value={newPeriod}
              onChange={(e) => setNewPeriod(e.target.value)}
            >
              <Select.Option value="month">Monthly</Select.Option>
              <Select.Option value="year">Yearly</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={() => setIsPriceModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Feature Management Modal */}
      <Modal
        title="Manage Features"
        open={isFeatureModalOpen}
        onCancel={() => setIsFeatureModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSaveFeatures}
          className="mt-4"
        >
          <Form.List
            name="features"
            rules={[{ required: true, message: 'Please add at least one feature' }]}
          >
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <Form.Item
                    required={false}
                    key={field.key}
                    className="flex items-center gap-2"
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          message: 'Please input feature or delete this field',
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Enter feature"
                        className="flex-1"
                        value={tempFeatures[index].text}
                        onChange={(e) =>
                          setTempFeatures(
                            tempFeatures.map((feature, i) =>
                              i === index
                                ? { ...feature, text: e.target.value }
                                : feature
                            )
                          )
                        }
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        onClick={() => remove(field.name)}
                        icon={<XMarkIcon className="w-5 h-5 text-red-500" />}
                      />
                    )}
                  </Form.Item>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusIcon className="w-5 h-5" />}
                  className="w-full"
                >
                  Add Feature
                </Button>
              </div>
            )}
          </Form.List>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={() => setIsFeatureModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Save Features
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
