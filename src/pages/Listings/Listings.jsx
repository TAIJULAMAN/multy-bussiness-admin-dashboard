import React from "react";
import ListingTable from "./ListingTable";
import PageHeading from "../../Components/Shared/PageHeading";

const ListingsTabs = () => {
  return (
    <div>
      <div className="flex items-start justify-start mb-5">
        <PageHeading title="Listings Management" />
      </div>

      {/* content */}
      <ListingTable />
    </div>
  );
};

export default ListingsTabs;
