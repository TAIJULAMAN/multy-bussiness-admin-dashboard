import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import React, { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import { useGetAllDashboardQuery } from "../../redux/api/dashboard";
import Loader from "../../Components/Shared/Loaders/Loader";

const BookingChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState([]);
  const { data: dashboardData, isLoading } = useGetAllDashboardQuery();
  console.log(dashboardData?.earningGrowth);

  useEffect(() => {
    if (dashboardData?.payment_year) {
      const yearsArray = dashboardData?.payment_year.map((year) => year);
      setYears(yearsArray);
    }
  }, [dashboardData]);

  const { monthlyData, maxUsers } = useMemo(() => {
    const monthMap = dashboardData?.earningGrowth?.monthNames || {};
    const userGrowthData = dashboardData?.earningGrowth?.data || [];

    const maxUsers = Math.max(...Object.values(monthMap), 0) + 4;

    return {
      monthlyData: Object.keys(monthMap).map((month) => ({
        name: monthMap,
        totalEarning: userGrowthData[month],
      })),
      maxUsers,
    };
  }, [dashboardData]);

  if (isLoading) {
    return <Loader />;
  }






  return (
    <div
      style={{
        width: "100%",
        height: "250px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          style={{
            textAlign: "left",
            marginBottom: "15px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          📈 Earning Growth Chart
        </h3>
        <Select
          className="min-w-32"
          value={year}
          placeholder="Select year"
          onChange={setYear}
          style={{
            marginBottom: "15px",
            width: "150px",
            fontWeight: "500",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
          options={years.map((item) => ({ value: item, label: item }))}
        />
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#21c45d" stopOpacity={1} />
              <stop offset="95%" stopColor="#21c45d" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="name"
            stroke="#333"
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            stroke="#333"
            domain={[0, maxUsers]}
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
            }}
            cursor={{ fill: "rgba(76, 175, 80, 0.1)" }}
          />
          <Legend wrapperStyle={{ fontSize: "13px", fontWeight: "bold" }} />
          <Bar
            dataKey="totalEarning"
            fill="url(#colorUv)"
            barSize={30}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingChart;
