import { useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import Subscription from "./Subscription";

const MainSubscriptionPage = () => {
  const [activeTab, setActiveTab] = useState("Buyer");

  const tabs = [
    { key: "Buyer", label: "Buyer" },
    { key: "Seller", label: "Seller" },
    { key: "Broker", label: "Broker" },
    { key: "Francise Seller", label: "Francise Seller" },
    { key: "Investor", label: "Investor" },
    { key: "Business Idea Lister", label: "Business Idea Lister" },
    { key: "Asset Seller", label: "Asset Seller" },
  ];

  return (
    <div className="p-5">
      <div className="flex items-center justify-start mb-5">
        <PageHeading title="Subscription Management" />
      </div>

      <div className="mb-5 border border-[#0091FF]">
        <div className="flex flex-wrap gap-2 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-10 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-[#0091FF] !text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg">
        <Subscription role={activeTab} />
      </div>
    </div>
  );
};

export default MainSubscriptionPage;
