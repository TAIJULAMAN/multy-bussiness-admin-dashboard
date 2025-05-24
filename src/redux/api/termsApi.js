import { baseApi } from "./baseApi";

const termsAndConditionsApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getTermsAndConditions: builder.query({
                              query: () => ({
                                        url: 'setting/term',
                                        method: 'GET',
                              }),
                              providesTags: ['termsAndConditions'],
                    }),
                    updateTermsAndConditions: builder.mutation({
                              query: ({ requestData }) => ({
                                        url: 'setting/create',
                                        method: 'PATCH',
                                        body: requestData,
                              }),
                              invalidatesTags: ['termsAndConditions'],
                    }),
          }),
});

export const {
      useGetTermsAndConditionsQuery,
      useUpdateTermsAndConditionsMutation
} = termsAndConditionsApi;