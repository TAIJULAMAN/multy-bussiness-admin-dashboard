import { baseApi } from "./baseApi";

const ndaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNDA: builder.query({
      query: () => ({
        url: "agreement/get-all-agreement",
        method: "GET",
      }),
      providesTags: ["NDA"],
    }),
  }),
});

export const { useGetAllNDAQuery } = ndaApi;

export default ndaApi;
