import React from "react";
import { useGetSingleUserQuery } from "../../redux/api/userApi";

const UserStats = ({ selectedUser }) => {
  // console.log("selected user from user stat", selectedUser);
  const { data: singleUserData } = useGetSingleUserQuery({
    userId: selectedUser?._id,
  });
  console.log("singleUserData of user stat", singleUserData);
  return (
    <div className="grid grid-cols-2">
      <div className="pb-6 pr-6 text-center border-b border-r">
        <div className="text-2xl font-bold">
          {singleUserData?.data?.totalListed || "0"}
        </div>
        <div className="text-gray-500 text-sm">Total Listings</div>
      </div>
      <div className="pb-6 pl-6 text-center border-b">
        <div className="text-2xl font-bold">
          {singleUserData?.data?.totalSold || "0"}
        </div>
        <div className="text-gray-500 text-sm">Sold Listings</div>
      </div>
      <div className="pt-6 pr-6 text-center border-r">
        <div className="text-2xl font-bold">
          {singleUserData?.data?.totalApproved || "0"}
        </div>
        <div className="text-gray-500 text-sm">Approved Listings</div>
      </div>
      <div className="pt-6 pl-6 text-center">
        <div className="text-2xl font-bold">
          {singleUserData?.data?.totalRejected || "0"}
        </div>
        <div className="text-gray-500 text-sm">Rejected Listings</div>
      </div>
    </div>
  );
};

export default UserStats;
