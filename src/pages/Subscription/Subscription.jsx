import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import { useAddFeatureMutation, useGetAllSubscriptionQuery } from "../../redux/api/subscriptionApi";
import { Modal, message } from "antd";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

export default function Subscription() {
  const [type, setType] = useState("MONTHLY");
  const { data: subscriptionData } = useGetAllSubscriptionQuery();
  const [addFeature] = useAddFeatureMutation();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    features: []
  });
  const [formErrors, setFormErrors] = useState({});

  // Filter plans
  const currentPlans = subscriptionData?.data?.filter(plan => plan.type === type) || [];

  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.price || formData.price <= 0) {
      errors.price = "Valid price is required";
    }
    if (!formData.type) {
      errors.type = "Type is required";
    }
    const validFeatures = formData.features.filter(f => f.trim());
    if (validFeatures.length === 0) {
      errors.features = "At least one feature is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleUpdatePlan = async () => {
    try {
      // Validate form before submission
      if (!validateForm()) {
        return; // Stop if validation fails
      }

      // Filter out empty features
      const validFeatures = formData.features.filter(f => f.trim());

      // Make API call with validated data
      await addFeature({
        name: formData.name.trim(),
        price: Number(formData.price),
        type: formData.type,
        features: validFeatures
      }).unwrap();

      message.success("Plan updated successfully");
      setUpdateModalOpen(false);
      setFormData({
        name: "",
        price: "",
        type: "",
        features: [""]
      });
      setFormErrors({});
    } catch (error) {
      console.error("Failed to update plan:", error);
      const errorMessage = error.data?.message || "Failed to update plan";
      message.error(errorMessage);
      
      // Update form errors if server returns validation errors
      if (error.data?.error?.statusCode === 400) {
        setFormErrors(prev => ({
          ...prev,
          name: error.data.message
        }));
      }
    }
  };

  const openUpdateModal = (plan) => {
    setFormData({
      name: plan.name || "",
      price: plan.price?.toString() || "",
      type: plan.type || "MONTHLY",
      features: plan.features?.length ? [...plan.features] : [""]
    });
    setFormErrors({});
    setUpdateModalOpen(true);
  };

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="flex items-center justify-start mb-5">
        <PageHeading title="Subscription Management" />
      </div>
      <div className="flex justify-center items-center bg-[#ebfcf4] p-5">
        <div className="bg-white shadow-lg relative rounded-2xl px-5 py-20 w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold text-center mb-6">
            Your Subscription Plan
          </h1>

          {/* Plan Toggle */}
          <div className="flex bg-green-50 p-1 rounded-full mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${type === "MONTHLY" ? "bg-white shadow-sm" : ""
                }`}
              onClick={() => setType("MONTHLY")}
            >
              Monthly
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${type === "YEARLY" ? "bg-white shadow-sm" : ""
                }`}
              onClick={() => setType("YEARLY")}
            >
              Yearly
            </button>
          </div>

          {/* Plan Details */}
          <div className="p-5">
            {currentPlans.length > 0 ? (
              currentPlans.map((plan) => (
                <div key={plan._id} className="mb-8">
                  <h2 className="text-xl font-bold mb-4">{plan.name}</h2>

                  <div className="mb-6">
                    <span className="text-green-500 text-3xl font-bold">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500">/{plan.type === "MONTHLY" ? "month" : "year"}</span>
                  </div>

                  {plan.features?.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold mb-4">Features</h3>
                      <ul className="space-y-4 mb-6">
                        {plan.features.slice(0, 5).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <FaCheck className="h-5 w-5 text-green-500 mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.features.length > 5 && (
                          <li className="text-gray-500 text-sm mt-2">
                            +{plan.features.length - 5} more features
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                  <button
                    onClick={() => openUpdateModal(plan)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md transition-colors"
                  >
                    Update Plan
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No plans available for {type.toLowerCase()} subscription</div>
            )}

            {/* Action Button */}
            {/* <div className="text-white w-full">
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md transition-colors"
              >
                Update Now
              </button>
            </div> */}
          </div>
        </div>
        {/* Update Modal */}
        <Modal
          open={updateModalOpen}
          centered
          onCancel={() => setUpdateModalOpen(false)}
          footer={null}
        >
          <div className="p-5 h-[80vh] overflow-y-auto">
            <h2 className="text-center text-2xl font-bold">
              Update Subscription Plan
            </h2>
            <p className="text-center text-gray-500 mt-2">
              Update plan details and features
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Plan Name:
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="p-2 block w-full border border-gray-400 rounded-md"
                  placeholder="Enter plan name"
                />
                {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Price ($):
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="p-2 block w-full border border-gray-400 rounded-md"
                  placeholder="Enter price"
                />
                {formErrors.price && <p className="text-red-500">{formErrors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Plan Type:
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="p-2 block w-full border border-gray-400 rounded-lg"
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
                {formErrors.type && <p className="text-red-500">{formErrors.type}</p>}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-800">Features:</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 p-2 border rounded-md"
                      placeholder="Enter feature"
                    />
                    <button
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <RxCross2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {formErrors.features && <p className="text-red-500">{formErrors.features}</p>}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddFeature}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                  <GoPlus className="h-5 w-5" />
                  Add Feature
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <button
                onClick={() => setUpdateModalOpen(false)}
                className="px-4 py-2 border border-red-200 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePlan}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
