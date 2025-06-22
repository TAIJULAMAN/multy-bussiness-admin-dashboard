import React from "react";
import earn from "../../assets/icons/earn.png";
import { FaDollarSign } from "react-icons/fa6";
// import { useGetAllDashboardQuery } from "../../redux/api/dashboard";
// import Loader from "../../Components/Shared/Loaders/Loader";

function EarningManage() {
  // const { data: dashboardData, isLoading } = useGetAllDashboardQuery();
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <div>
      <div className="relative w-full flex z-[999] overflow-hidden h-[250px] items-center justify-between bg-gradient-to-tr from-white via-white to-[#0091FF]/70 p-10 rounded-xl">
        <div className="absolute top-0 -z-1 left-32 w-full h-full">
          <img className="w-[80%] h-full object-cover" src={earn} alt="" />
        </div>
        <div className="flex flex-col items-start">
          <div className="bg-[#0091FF] rounded-md p-4 ">
            <FaDollarSign className="text-white border border-white p-[2px] rounded-full" />
          </div>
          <h2 className="text-xl font-semibold !mt-5 text-gray-800 leading-none">
            Total Earnings
          </h2>
          <h1 className="text-3xl leading-none text-[#0091FF]">$20000</h1>
        </div>
      </div>
    </div>
  );
}

export default EarningManage;
