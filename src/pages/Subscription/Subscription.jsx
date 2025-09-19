import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { CheckIcon, PlusIcon, XMarkIcon, PencilIcon } from "./icons.jsx";
import toast from "react-hot-toast";
import { useGetSubscriptionPlansQuery, useUpdateSubscriptionPlanMutation } from "../../redux/api/subscriptionApi";

export default function Subscription({ role }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  console.log("selectedPlan", selectedPlan);
  const [plans, setPlans] = useState({});

  const { data: plansResponse } = useGetSubscriptionPlansQuery({ role });

  console.log("plansResponse", plansResponse);
  console.log("role", role);

  // Normalize API data shape into local plans object
  const apiPlans = useMemo(() => {
    if (!plansResponse) return null;
    const list = plansResponse?.data || plansResponse?.plans || plansResponse;
    if (!Array.isArray(list)) return null;
    const mapped = {};
    list.forEach((item, idx) => {
      const key = (item?.subscriptionPlanType || item?.name || item?._id || item?.id || `plan_${idx}`)
        ?.toString()
        .toLowerCase();
      // Normalize price to an array of numbers
      let prices = [];
      if (Array.isArray(item?.price)) {
        prices = item.price
          .map((p) => (typeof p === "object" && p !== null ? Number(p?.price ?? 0) : Number(p ?? 0)))
          .filter((n) => !Number.isNaN(n));
      } else if (typeof item?.price === "object" && item?.price !== null) {
        prices = [Number(item.price?.price ?? 0)].filter((n) => !Number.isNaN(n));
      } else if (item?.price != null) {
        prices = [Number(item.price)].filter((n) => !Number.isNaN(n));
      }
      mapped[key] = {
        // Persist the actual backend id for updates
        id: item?._id || item?.id || key,
        subscriptionId: item?._id || item?.id || null,
        name: item?.subscriptionPlanType || key,
        displayName:
          item?.subscriptionPlanType ||
          item?.title ||
          item?.name ||
          `Plan ${idx + 1}`,
        prices,
        features: Array.isArray(item?.features)
          ? item.features.map((f, i) => ({
              id: f?.id || i + 1,
              text: f?.text || String(f),
            }))
          : [],
      };
    });
    return mapped;
  }, [plansResponse]);

  // Apply API plans when available
  useEffect(() => {
    if (apiPlans && Object.keys(apiPlans).length > 0) {
      setPlans(apiPlans);
      // Ensure selectedPlan is valid among API keys
      const firstKey = Object.keys(apiPlans)[0];
      if (!apiPlans[selectedPlan]) {
        setSelectedPlan(firstKey);
      }
    }
  }, [apiPlans]);

  // Modals state
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);

  // Form states
  const [newPrices, setNewPrices] = useState([""]); // separate numeric inputs (no add/remove)
  const [newFeature, setNewFeature] = useState("");
  const [tempFeatures, setTempFeatures] = useState([]);

  // Update mutation
  const [updateSubscriptionPlan, { isLoading: isUpdating }] = useUpdateSubscriptionPlanMutation();

  // Update form values when selected plan changes
  useEffect(() => {
    if (selectedPlan && plans[selectedPlan]) {
      const arr = plans[selectedPlan].prices || [];
      setNewPrices(arr.length ? arr.map((p) => String(p)) : [""]);
    }
  }, [selectedPlan, plans]);

  // Open price update modal for a specific plan
  const handleOpenPriceModal = (planKey) => {
    setSelectedPlan(planKey);
    const list = plans[planKey].prices || [];
    setNewPrices(list.length ? list.map((p) => String(p)) : [""]);
    setIsPriceModalOpen(true);
  };

  // Save updated price -> calls API then updates local state
  const handleSavePrice = async () => {
    if (!selectedPlan || !plans[selectedPlan]) return;
    const sub = plans[selectedPlan];
    try {
      // Build number array from individual inputs
      const priceArray = newPrices
        .map((s) => Number(String(s).trim()))
        .filter((n) => !Number.isNaN(n));
      if (priceArray.length === 0) {
        toast.error("Please add at least one valid price");
        return;
      }
      const res = await updateSubscriptionPlan({
        subscriptionId: sub.subscriptionId || sub.id,
        role,
        data: { price: priceArray },
      }).unwrap();

      // Use server response to ensure UI reflects backend truth
      const serverPrices = Array.isArray(res?.data?.price)
        ? res.data.price.map((n) => Number(n)).filter((n) => !Number.isNaN(n))
        : priceArray;
      setPlans((prev) => ({
        ...prev,
        [selectedPlan]: { ...prev[selectedPlan], prices: serverPrices },
      }));
      setIsPriceModalOpen(false);
      toast.success("Subscription price updated");
    } catch (e) {
      toast.error("Failed to update price");
      console.error(e);
    }
  };

  // Open feature management modal for a specific plan
  const handleOpenFeatureModal = (planKey) => {
    setSelectedPlan(planKey);
    setTempFeatures([...plans[planKey].features]);
    setIsFeatureModalOpen(true);
  };

  // Add a new feature
  const handleAddFeature = () => {
    if (newFeature.trim() === "")
      return toast.error("please add a valid feature");
    if (tempFeatures.length >= 8) {
      return toast.error("Feature limit reached.");
    }
    const newId =
      tempFeatures.length > 0
        ? Math.max(...tempFeatures.map((f) => f.id)) + 1
        : 1;

    setTempFeatures([...tempFeatures, { id: newId, text: newFeature }]);
    setNewFeature("");
  };

  // Remove a feature
  const handleRemoveFeature = (id) => {
    setTempFeatures(tempFeatures.filter((feature) => feature.id !== id));
  };

  // Save updated features -> calls API then updates local state
  function handleSaveFeatures() {
    if (!selectedPlan || !plans[selectedPlan]) return;
    const sub = plans[selectedPlan];
    const featurePayload = tempFeatures.map((f) => (typeof f === "string" ? f : f.text));
    updateSubscriptionPlan({
      subscriptionId: sub.id,
      role,
      data: { features: featurePayload },
    })
      .unwrap()
      .then(() => {
        setPlans((prev) => ({
          ...prev,
          [selectedPlan]: { ...prev[selectedPlan], features: [...tempFeatures] },
        }));
        setIsFeatureModalOpen(false);
        toast.success("Features updated");
      })
      .catch((e) => {
        toast.error("Failed to update features");
        console.error(e);
      });
  }

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {role ? `${role} Subscription Plans` : "Subscription Plans"}
        </h1>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(plans || {}).map((planKey) => (
            <div key={planKey} className="mt-0">
              <div className="border-2 border-[#0091FF] rounded-lg shadow-sm h-full flex flex-col">
                <div className="p-6 border-b">
                  <div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {plans[planKey].displayName}
                        </h2>
                      </div>
                      <button
                        onClick={() => handleOpenPriceModal(planKey)}
                        className="bg-[#0091FF] cursor-pointer text-sm !text-white px-4 py-2 rounded-md flex items-center"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                    {role !== "Broker" && (
                      <div className="mb-6">
                        {(() => {
                          const priceList = Array.isArray(plans[planKey].prices) && plans[planKey].prices.length
                            ? plans[planKey].prices
                            : Array.isArray(plans[planKey].priceItems)
                            ? plans[planKey].priceItems.map((r) => r?.price).filter((n) => typeof n === "number")
                            : [];
                          return priceList.length ? (
                            <span className="text-[#0091FF] text-xl font-semibold">
                              ${""}{priceList.join(", $")}
                            </span>
                          ) : (
                            <span className="text-gray-500">No prices</span>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
                {/* Content section */}
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-2xl font-bold">Features</h3>
                    <button
                      onClick={() => handleOpenFeatureModal(planKey)}
                      className="border border-[#022C22] text-[#022C22] cursor-pointer hover:bg-[#022C22] hover:!text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Manage Features
                    </button>
                  </div>
                  <ul className="space-y-3 mt-4">
                    {plans[planKey].features.map((feature) => (
                      <li key={feature.id} className="flex items-center gap-2">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-transparent border-1 border-[#022C22] flex items-center justify-center">
                          <CheckIcon className="h-3 w-3 text-[#022C22]" />
                        </div>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Update Modal */}
      <Modal
        title="Update Subscription Price"
        open={isPriceModalOpen}
        onCancel={() => setIsPriceModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSavePrice} className="mt-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Prices</label>
            {newPrices.map((val, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={val}
                  onChange={(e) => {
                    const v = e.target.value;
                    setNewPrices((prev) => prev.map((p, i) => (i === idx ? v : p)));
                  }}
                  placeholder={`Price #${idx + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={() => setIsPriceModalOpen(false)} disabled={isUpdating}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500" loading={isUpdating}>
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
                disabled={newFeature.trim() === "" || tempFeatures.length >= 8}
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
            <Button onClick={() => setIsFeatureModalOpen(false)} disabled={isUpdating}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleSaveFeatures}
              className="bg-[#0091FF] hover:bg-[#0073CC]"
              loading={isUpdating}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
