import React, { useState } from "react";
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

const BookingChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const demoData = {
    2025: [
      { name: "Jan", totalEarning: 4000 },
      { name: "Feb", totalEarning: 5500 },
      { name: "Mar", totalEarning: 4800 },
      { name: "Apr", totalEarning: 6000 },
      { name: "May", totalEarning: 7200 },
      { name: "Jun", totalEarning: 8500 },
      { name: "Jul", totalEarning: 9700 },
      { name: "Aug", totalEarning: 8900 },
      { name: "Sep", totalEarning: 9100 },
      { name: "Oct", totalEarning: 10500 },
      { name: "Nov", totalEarning: 11200 },
      { name: "Dec", totalEarning: 12000 },
    ],
    2024: [
      { name: "Jan", totalEarning: 3000 },
      { name: "Feb", totalEarning: 4200 },
      { name: "Mar", totalEarning: 3800 },
      { name: "Apr", totalEarning: 5000 },
      { name: "May", totalEarning: 6100 },
      { name: "Jun", totalEarning: 7300 },
      { name: "Jul", totalEarning: 8200 },
      { name: "Aug", totalEarning: 7800 },
      { name: "Sep", totalEarning: 8500 },
      { name: "Oct", totalEarning: 9300 },
      { name: "Nov", totalEarning: 10000 },
      { name: "Dec", totalEarning: 11000 },
    ],
    2023: [
      { name: "Jan", totalEarning: 2000 },
      { name: "Feb", totalEarning: 3100 },
      { name: "Mar", totalEarning: 2800 },
      { name: "Apr", totalEarning: 4000 },
      { name: "May", totalEarning: 5000 },
      { name: "Jun", totalEarning: 6200 },
      { name: "Jul", totalEarning: 7100 },
      { name: "Aug", totalEarning: 6800 },
      { name: "Sep", totalEarning: 7500 },
      { name: "Oct", totalEarning: 8200 },
      { name: "Nov", totalEarning: 9000 },
      { name: "Dec", totalEarning: 9800 },
    ],
  };

  const years = Object.keys(demoData).map(Number).sort((a, b) => b - a);
  const currentYearData = demoData[year] || [];
  const maxEarning = Math.max(...currentYearData.map(item => item.totalEarning));

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
          data={currentYearData}
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
            domain={[0, maxEarning + 1000]}
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
