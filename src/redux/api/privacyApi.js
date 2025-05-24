import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getPrivacy: builder.query({
                              query: () => ({
                                        url: 'setting/privacy',
                                        method: 'GET',
                              }),
                              providesTags: ['privacy'],
                    }),
                    updatePrivacy: builder.mutation({
                              query: ({ requestData }) => ({
                                        url: 'setting/create',
                                        method: 'PATCH',
                                        body: requestData,
                              }),
                              invalidatesTags: ['privacy'],
                    }),
          }),
});

export const {
          useGetPrivacyQuery,
          useUpdatePrivacyMutation
} = privacyApi;