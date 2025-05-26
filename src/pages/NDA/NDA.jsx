import React, { useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import ListingTable from "../Listings/ListingTable";

const NDA = () => {
          const [activeTab, setActiveTab] = useState("allListings");

          const renderContent = () => {
                    switch (activeTab) {
                              case "sellerNDA":
                                        return <div className="p-4"><ListingTable /></div>;
                              case "buyerNDA":
                                        return <div className="p-4"><ListingTable /></div>;
                              case "businessAssetSellerNDA":
                                        return <div className="p-4"><ListingTable /></div>;
                              case "InvestorNDA":
                                        return <div className="p-4"><ListingTable /></div>;
                              case "FranchisorNDA":
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
                                        <PageHeading title="NDA Management" />
                              </div>
                              {/* Tab  */}
                              <div className="border-b-2 border-[#0091ff] flex space-x-2 gap-2">
                                        <button onClick={() => setActiveTab("sellerNDA")} className={tabStyle("sellerNDA")}>
                                                  Seller NDA
                                        </button>
                                        <button
                                                  onClick={() => setActiveTab("buyerNDA")}
                                                  className={tabStyle("buyerNDA")}
                                        >
                                                  Buyer NDA
                                        </button>
                                        <button
                                                  onClick={() => setActiveTab("businessAssetSellerNDA")}
                                                  className={tabStyle("businessAssetSellerNDA")}
                                        >
                                                  Business Asset Seller NDA
                                        </button>
                                        <button
                                                  onClick={() => setActiveTab("investorNDA")}
                                                  className={tabStyle("investorNDA")}
                                        >
                                                  Investor NDA
                                        </button>
                                        <button
                                                  onClick={() => setActiveTab("franchisorNDA")}
                                                  className={tabStyle("franchisorNDA")}
                                        >
                                                  Franchisor NDA
                                        </button>
                              </div>

                              {/* content */}
                              {renderContent()}
                    </div>
          );
};

export default NDA;