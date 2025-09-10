import { baseApi } from "./baseApi";

const couponApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get_all_coupon: builder.query({
      query: () => ({
        url: "coupon/get-all-coupon",
        method: "GET",
      }),
      providesTags: ["coupon"],
    }),

    add_coupon: builder.mutation({
      query: (data) => ({
        url: "coupon/create-coupon",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coupon"],
    }),
    update_coupon: builder.mutation({
      query: ({ couponId, data }) => ({
        url: `coupon/update-coupon`,
        method: "PUT",
        params: { couponId },
        body: data,
      }),
      invalidatesTags: ["coupon"],
    }),
    delete_coupon: builder.mutation({
      query: ({ couponId }) => ({
        url: `coupon/delete-coupon`,
        method: "DELETE",
        params: { couponId },
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});
export const {
  useGet_all_couponQuery,
  useAdd_couponMutation,
  useUpdate_couponMutation,
  useDelete_couponMutation,
} = couponApis;
