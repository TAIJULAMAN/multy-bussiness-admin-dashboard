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
    deleteAgreement: builder.mutation({
      query: (id) => ({
        url: `agreement/delete-agreement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NDA"],
    }),
  }),
});

export const { useGetAllNDAQuery, useDeleteAgreementMutation } = ndaApi;

export default ndaApi;
