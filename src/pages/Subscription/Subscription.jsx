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
    if (tempFeatures.length >= 8) {
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
        <div className="grid grid-cols-3 mb-8 border border-[#0091FF] rounded-md overflow-hidden">
          {Object.keys(plans).map((planKey) => (
            <button
              key={planKey}
              onClick={() => setSelectedPlan(planKey)}
              className={`py-3 px-4 text-center transition-colors ${selectedPlan === planKey
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
            <div className="border-2 border-[#0091FF] rounded-lg shadow-sm">
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
        title={
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">Manage Features</span>
            <span className="text-sm text-gray-500">
              {tempFeatures.length}/8 Features
            </span>
          </div>
        }
        open={isFeatureModalOpen}
        onCancel={() => setIsFeatureModalOpen(false)}
        footer={null}
        width={600}
      >
        <div className="space-y-4">
          {/* New Feature Input */}
          <div className="rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter new feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1"
              />
              <Button
                type="primary"
                onClick={handleAddFeature}
                icon={<PlusIcon className="w-4 h-4" />}
                disabled={newFeature.trim() === '' || tempFeatures.length >= 8}
              >
                Add Feature
              </Button>
            </div>
            {tempFeatures.length >= 8 && (
              <div className="mt-2 text-sm text-red-500">
                Maximum feature limit reached
              </div>
            )}
          </div>

          {/* Existing Features List */}
          <div className="space-y-3">
            {tempFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#022C22] flex items-center justify-center">
                    <CheckIcon className="h-3 w-3 text-white" />
                  </div>
                  <Input
                    value={feature.text}
                    onChange={(e) =>
                      setTempFeatures(
                        tempFeatures.map((feat) =>
                          feat.id === feature.id
                            ? { ...feat, text: e.target.value }
                            : feat
                        )
                      )
                    }
                    placeholder="Feature description"
                    className="flex-1"
                  />
                </div>
                <button
                  type="text"
                  onClick={() => handleRemoveFeature(feature.id)}
                  danger
                >
                  <XMarkIcon className="w-4 h-4 text-red-500 ml-2" />
                </button>
              </div>
            ))}
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => setIsFeatureModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSaveFeatures}
              className="bg-[#0091FF] hover:bg-[#0073CC]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
