import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: ({ year, page }) => ({
        url: "payment/get-all-payment",
        method: "GET",
        params: {
          year,
          page,
        },
      }),
      providesTags: ["earning"],
    }),
  }),
});

export const { useGetEarningQuery } = earningApi;

export default earningApi;
