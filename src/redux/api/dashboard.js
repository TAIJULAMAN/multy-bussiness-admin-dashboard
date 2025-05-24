import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboard: builder.query({
      query: (params) => ({
        url: "dashboard/get-overview",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
    }),
    getDashboardUser: builder.query({
      query: ({ year_user }) => ({
        url: "dashboard/get-overview",
        method: "GET",
        params: {
          year_user,
        },
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllDashboardQuery,useGetDashboardUserQuery } = dashboardApi;

export default dashboardApi;
