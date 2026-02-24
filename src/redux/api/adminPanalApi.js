import { baseApi } from "./baseApi";

const admin = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query({
      query: (params) => ({
        url: "faq/get-all-faq",
        method: "GET",
        params,
      }),
      providesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: ({ _id }) => ({
        url: `faq/delete-faq`,
        method: "DELETE",
        params: { faqId: _id },
      }),
      invalidatesTags: ["faq"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/create-new-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    updateFaq: builder.mutation({
      query: ({ _id, data }) => {
        // console.log("Updating FAQ:", { _id, data });
        return {
          url: `faq/update-faq`,
          method: "PATCH",
          params: { faqId: _id },
          body: data,
        };
      },
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useCreateAdminMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = admin;

export default admin;
