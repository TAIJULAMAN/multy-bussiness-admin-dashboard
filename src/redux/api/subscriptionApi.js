import { baseApi } from "./baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAllSubscription: builder.query({
                              query: () => ({
                                        url: "package/get-all",
                                        method: "GET",
                              }),
                              providesTags: ["subscription"],
                    }),
                    addFeature: builder.mutation({
                              query: (data) => ({
                                        url: "package/create",
                                        method: "POST",
                                        body: data
                              }),
                              invalidatesTags: ["subscription"],
                    }),
          }),
});

export const {
          useGetAllSubscriptionQuery,
          useAddFeatureMutation,
} = subscriptionApi;