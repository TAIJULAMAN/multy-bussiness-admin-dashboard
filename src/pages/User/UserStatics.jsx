import React from "react";

const UserStats = ({ selectedUser }) => {
  console.log("selected user", selectedUser);
  return (
    <div className="grid grid-cols-2">
      <div className="pb-6 pr-6 text-center border-b border-r">
        <div className="text-2xl font-bold">{selectedUser?.totalListings || 10}</div>
        <div className="text-gray-500 text-sm">Total Listings</div>
      </div>
      <div className="pb-6 pl-6 text-center border-b">
        <div className="text-2xl font-bold">{selectedUser?.soldListing || 20}</div>
        <div className="text-gray-500 text-sm">Sold Listings</div>
      </div>
      <div className="pt-6 pr-6 text-center border-r">
        <div className="text-2xl font-bold">
          {selectedUser?.approvedListings || 30}
        </div>
        <div className="text-gray-500 text-sm">Approved Listings</div>
      </div>
      <div className="pt-6 pl-6 text-center">
        <div className="text-2xl font-bold">
          {selectedUser?.rejectedListings || 40}
        </div>
        <div className="text-gray-500 text-sm">Rejected Listings</div>
      </div>
    </div>
  );
};

export default UserStats;
