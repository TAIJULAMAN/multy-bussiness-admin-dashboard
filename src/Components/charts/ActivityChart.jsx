import React from "react";
import { Cell, Pie, PieChart } from "recharts";
// import { useGetAllDashboardQuery } from "../../redux/api/dashboard";

const ActivityStatisticsChart = () => {
  // const { data: dashboardData } = useGetAllDashboardQuery();

  const data = [
    { name: "Active User", value: 2458 },
    { name: "Active Listings", value: 1879 },
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-3xl font-bold text-gray-800">{totalValue}</p>
          <p className="text-sm text-gray-600">Total Activities</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-4 mt-8">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm font-medium text-gray-700">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStatisticsChart;
