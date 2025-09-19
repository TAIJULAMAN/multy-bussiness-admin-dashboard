import { baseApi } from "./baseApi";

const ndaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNDA: builder.query({
      query: ({ page }) => ({
        url: "agreement/get-all-agreement",
        method: "GET",
        params: { page },
      }),
      providesTags: ["NDA"],
    }),
  }),
});

export const { useGetAllNDAQuery } = ndaApi;

export default ndaApi;
