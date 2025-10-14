import React, { useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import NDATable from "./NDATable";
import { useGetAllNDAQuery } from "../../redux/api/NDAApi";
import Loader from "../../Components/Loaders/Loader";

const NDA = () => {
  const [activeTab, setActiveTab] = useState("sellerNDA");
  const [page, setPage] = useState(1);

  const { data: ndaData, isLoading } = useGetAllNDAQuery({ page });
  // console.log(ndaData);
  const getFilteredNDAData = () => {
    if (!ndaData?.data) return [];

    switch (activeTab) {
      case "sellerNDA":
        return ndaData?.data?.filter((nda) => nda?.userRole === "Seller");
      case "buyerNDA":
        return ndaData?.data?.filter((nda) => nda?.userRole === "Buyer");
      case "businessAssetSellerNDA":
        return ndaData?.data?.filter((nda) => nda?.userRole === "Asset Seller");
      case "investorNDA":
        return ndaData?.data?.filter((nda) => nda?.userRole === "Investor");
      case "brokerNDA":
        return ndaData?.data?.filter((nda) => nda?.userRole === "Broker");
      case "franchisorNDA":
        return ndaData?.data?.filter(
          (nda) => nda?.userRole === "Business Idea Lister"
        );
      default:
        return (
          <div className="p-4 flex justify-center items-center">
            <div className="text-lg">No data available</div>
          </div>
        );
    }
  };

  const renderContent = () => {
    const filteredData = getFilteredNDAData();
    // console.log(filteredData);
    return (
      <div className="p-4">
        <NDATable data={filteredData} ndaData={ndaData} page={page} setPage={setPage} />
      </div>
    );
  };

  const tabStyle = (tabKey) =>
    `px-4 py-2 rounded-t-md font-semibold transition-all duration-200 ${
      activeTab === tabKey
        ? "bg-[#0091ff] !text-white border border-[#0091ff] !border-b-0"
        : "text-[#0091ff] hover:bg-[#0091ff]"
    }`;

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex items-start justify-start mb-5">
        <PageHeading title="NDA Management" />
      </div>
      {/* Tab  */}
      <div className="border-b-2 border-[#0091ff] flex space-x-2 gap-2">
        <button
          onClick={() => setActiveTab("sellerNDA")}
          className={tabStyle("sellerNDA")}
        >
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

         <button
          onClick={() => setActiveTab("brokerNDA")}
          className={tabStyle("brokerNDA")}
        >
          Broker NDA
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default NDA;
