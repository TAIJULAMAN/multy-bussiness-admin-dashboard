import React, { useState, useMemo } from "react";
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
import { Select } from "antd";
import { useGetEarningQuery } from "../../redux/api/earningApi";
import Loader from "../../Components/Shared/Loaders/Loader";

const BookingChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years] = useState(() => {
    const startYear = 2023;
    const endYear = currentYear + 1;
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  });

  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  // Fetch earning data from API
  const { data: apiData, isLoading } = useGetEarningQuery({ year });

  const { monthlyData, maxEarning } = useMemo(() => {
    // Create an array with 12 months initialized to 0
    const monthlyValues = new Array(12).fill(0);

    if (apiData?.data?.monthWiseEarnings && Array.isArray(apiData.data.monthWiseEarnings)) {
      apiData.data.monthWiseEarnings.forEach((item) => {
        // Only process if month is valid
        if (item.month >= 1 && item.month <= 12) {
          monthlyValues[item.month - 1] = item.totalEarnings || 0;
        }
      });
    }

    const processedData = monthlyValues;
    const maxEarning =
      Math.max(...processedData) > 0 ? Math.max(...processedData) + 1000 : 5000;

    return {
      monthlyData: Object.keys(monthMap).map((month, index) => ({
        name: month.substring(0, 3), // Short month names
        totalEarning: processedData[index] || 0,
      })),
      maxEarning,
    };
  }, [apiData, year]);

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
          options={years.map((y) => ({ value: y, label: y }))}
        />
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0091FF" stopOpacity={1} />
              <stop offset="95%" stopColor="#0091FF" stopOpacity={0.8} />
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
            domain={[0, maxEarning]}
            tick={{ fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Total Earning"]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
            }}
            cursor={{ fill: "rgba(0, 145, 255, 0.1)" }}
          />
          <Legend wrapperStyle={{ fontSize: "13px", fontWeight: "bold" }} />
          <Bar
            dataKey="totalEarning"
            name="Total Earning"
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
