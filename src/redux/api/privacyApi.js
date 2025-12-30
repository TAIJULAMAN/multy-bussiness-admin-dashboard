import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "home/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    updatePrivacy: builder.mutation({
      query: ({ requestData }) => ({
        url: "home/update-privacy-policy",
        method: "PATCH",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),


getRefundPolicy: builder.query({
      query: () => ({
        url: "home/get-refund-policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    updateRefundPolicy: builder.mutation({
      query: ({ requestData }) => ({
        url: "home/update-refund-policy",
        method: "PATCH",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),


  }),
});

export const { useGetPrivacyQuery, useUpdatePrivacyMutation, useGetRefundPolicyQuery, useUpdateRefundPolicyMutation } = privacyApi;
