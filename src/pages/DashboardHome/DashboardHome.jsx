import React from "react";
import GrowthChart from "../../Components/charts/UserGrowthChart";
import ActivityChart from "../../Components/charts/ActivityChart";
import RecentlyJoinedUsers from "../User/RecentlyJoinedUsers";
import user from "../../assets/icons/user.png";
import list from "../../assets/icons/list.png";
import category from "../../assets/icons/category.png";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";
import Loader from "../../Components/Shared/Loaders/Loader";

function DashboardHome() {
  const { data: dashboardData, isLoading } = useGetAllDashboardQuery();
  if (isLoading) {
    return <Loader />;
  }
  const cardData = [
    {
      title: "Total Users",
      value: isLoading ? <Loader /> : dashboardData?.data?.totalUser || 110,
      icon: <img src={user} alt="Driver Icon" />,
    },
    {
      title: "Total Business",
      value: isLoading ? <Loader /> : dashboardData?.data?.totalBusiness || 20,
      icon: <img src={list} alt="User Icon" />,
    },
    {
      title: "Total Category",
      value: isLoading ? <Loader /> : dashboardData?.data?.totalCategory || 30,
      icon: <img src={category} alt="Car Icon" />,
    },
  ];

  return (
    <div>
      {/* Card Section */}
      <div className="flex items-center justify-between bg-gradient-to-tr from-[#ffffff] via-white to-[#0091FF] p-12 rounded-xl">
        {cardData.map((card, index) => (
          <div
            className={`w-full ${
              index !== cardData.length - 1
                ? "border-r-2 border-gray-800 pr-6"
                : "pl-6"
            }`}
            key={index}
          >
            <div className="flex items-center gap-3">
              <h1>{card.icon}</h1>
              <div>
                <h1 className="text-3xl font-semibold">{card.title}</h1>
                <h1 className="text-3xl font-semibold text-[#0091ff]">
                  {card.value}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-4 gap-4 mt-4 xl:h-[450px]">
        <div className="w-full col-span-4 xl:col-span-3 h-full">
          <GrowthChart />
        </div>
        <div className="xl:col-span-1 col-span-4 shadow-lg">
          <ActivityChart />
        </div>
      </div>

      {/* Recently Joined Users Section */}
      <div className="mt-4">
        <h1 className="text-2xl font-semibold mb-4">Recently Joined Users</h1>
        <RecentlyJoinedUsers />
      </div>
    </div>
  );
}

export default DashboardHome;
