import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: ({ year }) => ({
        url: "payment/get-all-payment",
        method: "GET",
        params: {
          year,
        },
      }),
      providesTags: ["earning"],
    }),
  }),
});

export const { useGetEarningQuery } = earningApi;

export default earningApi;
