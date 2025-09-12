import { baseApi } from "./baseApi";

const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: (params) => ({
        url: "dashboard/listed-business",
        method: "GET",
        params,
      }),
      providesTags: ["listings"],
    }),
    updateListing: builder.mutation({
      query: ({ businessId, data }) => {
        // console.log("Updating FAQ:", { _id, data });
        return {
          url: `business/update-business`,
          method: "PATCH",
          params: { businessId },
          body: data,
        };
      },
      invalidatesTags: ["listings"],
    }),
  }),
});

export const { useGetAllListingsQuery, useUpdateListingMutation } = listingApi;

export default listingApi;

// deleteFaq: builder.mutation({
//     query: ({ _id }) => ({
//       url: `faq/delete-faq`,
//       method: "DELETE",
//       params: { faqId: _id },
//     }),
//     invalidatesTags: ["faq"],
//   }),
//   createFaq: builder.mutation({
//     query: (data) => ({
//       url: "faq/create-faq",
//       method: "POST",
//       body: data,
//     }),
//     invalidatesTags: ["faq"],
//   }),
