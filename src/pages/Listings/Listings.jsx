import React, { useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import ListingTable from "./ListingTable";

const ListingsTabs = () => {
  const [activeTab, setActiveTab] = useState("allListings");

  const tabs = [
    { key: "allListings", label: "ALL Listings" },
    { key: "listingsUnderApproval", label: "Listings Under Approval" },
    { key: "Seller", label: "Business Listings" },
    { key: "Asset Seller", label: "Franchise Listings" },
    { key: "Francise Seller", label: "Business Asset Listings" },
    { key: "Business Idea Lister", label: "Business Idea Lister" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "allListings":
        return (
          <div className="p-4">
            <ListingTable businessRole="" />
          </div>
        );
      case "listingsUnderApproval":
        return (
          <div className="p-4">
            <ListingTable businessRole="not-approved" />
          </div>
        );
      case "Seller":
        return (
          <div className="p-4">
            <ListingTable businessRole="Seller" />
          </div>
        );
      case "Asset Seller":
        return (
          <div className="p-4">
            <ListingTable businessRole="Asset Seller" />
          </div>
        );
      case "Francise Seller":
        return (
          <div className="p-4">
            <ListingTable businessRole="Francise Seller" />
          </div>
        );
      case "Business Idea Lister":
        return (
          <div className="p-4">
            <ListingTable businessRole="Business Idea Lister" />
          </div>
        );
      default:
        return (
          <div className="p-4">
            <ListingTable businessRole="" />
          </div>
        );
    }
  };

  return (
    <div>
      <div className="flex items-start justify-start mb-5">
        <PageHeading title="Listings Management" />
      </div>

      {/* Tab Navigation */}
      <div className="mb-5 border border-[#0091FF]">
        <div className="flex flex-wrap gap-2 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-10 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-[#0091FF] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default ListingsTabs;
