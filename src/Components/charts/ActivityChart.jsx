import React from "react";
import { Cell, Pie, PieChart } from "recharts";
import { useGetAllDashboardQuery } from "../../redux/api/dashboard";

const ActivityStatisticsChart = () => {
  const { data: dashboardData } = useGetAllDashboardQuery();

  const data = [
    { name: "Active User", value: dashboardData?.user || 0 },
    { name: "Active Listings", value: dashboardData?.active_listing || 0 },
  ];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const COLORS = ["#166635", "#059668"];

  return (
    <div className="bg-gradient-to-tr from-[#ffffff] via-white to-[#62e391] rounded-xl p-6 w-full h-[450px]">
      <h1 className="!text-sm xl:!text-2xl font-bold text-purple-950 mb-6">
        Activity Statistics
      </h1>

      <div className="relative h-64 flex justify-center">
        {/* PieChart Component */}
        <PieChart width={240} height={240}>
          <Pie
            data={data}
            cx={120}
            cy={120}
            startAngle={90}
            endAngle={-270}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={0}
              />
            ))}
          </Pie>
        </PieChart>

        {/* Center Total Value */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-xl xl:text-3xl font-bold text-gray-800">
            {totalValue}
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="mt-6 space-y-4">
        {data.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-xl text-gray-800">{entry.name}</span>
            </div>
            <div className="bg-[#bcf7d1] rounded-lg px-4 py-1 text-xl text-[#14803c]">
              {entry.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStatisticsChart;
