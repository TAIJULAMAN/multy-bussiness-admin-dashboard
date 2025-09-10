import { baseApi } from "./baseApi";

export const allSubscriberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriber: builder.query({
      query: (params) => ({
        url: "subscriber/retrieve-subscriber",
        method: "GET",
        params: {
          ...params,
        },
      }),
      providesTags: ["subscriber"],
    }),
  }),
});

export const { useGetAllSubscriberQuery } = allSubscriberApi;
