import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAllFaq: builder.query({
                              query: (params) => ({
                                        url: "faq/get-all",
                                        method: "GET",
                                        params,
                              }),
                              providesTags: ["faq"],
                    }),
                    deleteFaq: builder.mutation({
                              query: (_id) => ({
                                        url: `faq/delete/${_id}`,
                                        method: "DELETE",
                              }),
                              invalidatesTags: ["faq"],
                    }),
                    createFaq: builder.mutation({
                              query: (data) => ({
                                        url: "faq/create",
                                        method: "POST",
                                        body: data,
                              }),
                              invalidatesTags: ["faq"],
                    }),
                    updateFaq: builder.mutation({
                              query: ({ _id, data }) => {
                                        console.log('Updating FAQ:', { _id, data });
                                        return {
                                                  url: `faq/update/${_id}`,
                                                  method: "PATCH",
                                                  body: data,
                                        };
                              },
                              invalidatesTags: ["faq"],
                    }),
          }),
});

export const {
          useGetAllFaqQuery,
          useCreateFaqMutation,
          useDeleteFaqMutation,
          useUpdateFaqMutation,
} = faqApi;

export default faqApi;