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
      query: ({ businessId }) => {
        // console.log("Updating FAQ:", { _id, data });
        return {
          url: `dashboard/approve-business`,
          method: "PATCH",
          params: { businessId },
        };
      },
      invalidatesTags: ["listings"],
    }),
    // Update listing details (title, price, category, etc.)
    updateListingDetails: builder.mutation({
      query: ({ businessId, user, data }) => ({
        url: "business/update-business",
        method: "PATCH",
        params: { businessId, user },
        body: data,
      }),
      invalidatesTags: ["listings"],
    }),
  }),
});

export const {
  useGetAllListingsQuery,
  useUpdateListingMutation,
  useUpdateListingDetailsMutation,
} = listingApi;

export default listingApi;
