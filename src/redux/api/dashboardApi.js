import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboard: builder.query({
      query: (params) => ({
        url: "dashboard/dashboard-data",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
    getUserGrowth: builder.query({
      query: ({ year }) => ({
        url: "dashboard/dashboard-data",
        method: "GET",
        params: {
          year,
        },
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllDashboardQuery, useGetUserGrowthQuery } = dashboardApi;

export default dashboardApi;
