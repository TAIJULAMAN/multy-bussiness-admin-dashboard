import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query({
      query: ({ role }) => ({
        url: "subscription/get-subscription-plan",
        method: "GET",
        params: { role },
      }),
      providesTags: ["subscription"],
    }),
  }),
});

export const { useGetSubscriptionPlansQuery } = subscriptionApi;

export default subscriptionApi;
