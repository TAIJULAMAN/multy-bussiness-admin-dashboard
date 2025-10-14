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
import { useMemo, useState } from "react";
import { Select } from "antd";
import { useGetUserGrowthQuery } from "../../redux/api/dashboardApi";
import Loader from "../Loaders/Loader";

export default function UserGrowthChart() {
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

  const { data: apiData, isLoading } = useGetUserGrowthQuery({ year });

  const { monthlyData, maxUsers } = useMemo(() => {
    const monthlyValues = new Array(12).fill(0);
    if (apiData?.data?.result && Array.isArray(apiData.data.result)) {
      apiData.data.result.forEach((item) => {
        let itemYear = null;
        if (item.year) {
          itemYear = item.year;
        } else if (item.createdAt) {
          itemYear = new Date(item.createdAt).getFullYear();
        }

        if (item.month >= 1 && item.month <= 12) {
          if (year === 2025) {
            monthlyValues[item.month - 1] = item.totalBusinesses || 0;
          } else if (itemYear === year) {
            monthlyValues[item.month - 1] = item.totalBusinesses || 0;
          }
        }
      });
    }

    const processedData = monthlyValues;
    const maxUsers =
      Math.max(...processedData) > 0 ? Math.max(...processedData) + 5 : 50;

    return {
      monthlyData: Object.keys(monthMap).map((month, index) => ({
        name: month,
        totalUser: processedData[index] || 0,
      })),
      maxUsers,
    };
  }, [apiData, year]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex justify-between items-center">
        <h3
          style={{
            textAlign: "left",
            marginBottom: "15px",
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          📈 Business Growth
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
              <stop offset="5%" stopColor="#0091ff" stopOpacity={1} />
              <stop offset="95%" stopColor="#0091ff" stopOpacity={1} />
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
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #0091ff",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              color: "#333",
            }}
            labelStyle={{ color: "#333", fontWeight: "600" }}
            formatter={(value, name) => [
              `${value} businesses`,
              "Total Businesses",
            ]}
            cursor={{ fill: "rgba(0, 145, 255, 0.1)" }}
          />
          <Legend wrapperStyle={{ fontSize: "13px", fontWeight: "bold" }} />
          <Bar
            dataKey="totalUser"
            fill="url(#colorUv)"
            barSize={75}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
