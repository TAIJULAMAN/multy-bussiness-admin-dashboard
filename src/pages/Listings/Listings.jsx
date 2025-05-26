import React, { useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import ListingTable from "./ListingTable";

const ListingsTabs = () => {
  const [activeTab, setActiveTab] = useState("allListings");

  const renderContent = () => {
    switch (activeTab) {
      case "allListings":
        return <div className="p-4"><ListingTable /></div>;
      case "businessListings":
        return <div className="p-4"><ListingTable /></div>;
      case "franchiseListings":
        return <div className="p-4"><ListingTable /></div>;
      case "businessAssetListings":
        return <div className="p-4"><ListingTable /></div>;
      case "businessIdeaListings":
        return <div className="p-4"><ListingTable /></div>;
      default:
        return null;
    }
  };

  const tabStyle = (tabKey) =>
    `px-4 py-2 rounded-t-md font-semibold transition-all duration-200 ${activeTab === tabKey
      ? "bg-[#0091ff] !text-white border border-[#0091ff] !border-b-0"
      : "text-[#0091ff] hover:bg-[#0091ff]"
    }`;


  return (
    <div>

      <div className="flex items-start justify-start mb-5">
        <PageHeading title="Listings Management" />
      </div>

      {/* Tab  */}
      <div className="border-b-2 border-[#0091ff] flex space-x-2 gap-2">
        <button onClick={() => setActiveTab("allListings")} className={tabStyle("allListings")}>
          ALL Listings
        </button>
        <button
          onClick={() => setActiveTab("businessListings")}
          className={tabStyle("businessListings")}
        >
          business Listings
        </button>
        <button
          onClick={() => setActiveTab("franchiseListings")}
          className={tabStyle("franchiseListings")}
        >
          Franchise Listings
        </button>
        <button
          onClick={() => setActiveTab("businessAssetListings")}
          className={tabStyle("businessAssetListings")}
        >
          Business Asset Listings
        </button>
        <button
          onClick={() => setActiveTab("businessIdeaListings")}
          className={tabStyle("businessIdeaListings")}
        >
          Business Idea Listings
        </button>
      </div>

      {/* content */}
      {renderContent()}
    </div>
  );
};

export default ListingsTabs;



