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
  }),
});

export const {
  useGetAllListingsQuery,
} = listingApi;

export default listingApi;

// deleteFaq: builder.mutation({
//     query: ({ _id }) => ({
//       url: `faq/delete-faq`,
//       method: "DELETE",
//       params: { faqId: _id },
//     }),
//     invalidatesTags: ["faq"],
//   }),
//   createFaq: builder.mutation({
//     query: (data) => ({
//       url: "faq/create-faq",
//       method: "POST",
//       body: data,
//     }),
//     invalidatesTags: ["faq"],
//   }),
//   updateFaq: builder.mutation({
//     query: ({ _id, data }) => {
//       // console.log("Updating FAQ:", { _id, data });
//       return {
//         url: `faq/update-faq`,
//         method: "PATCH",
//         params: { faqId: _id },
//         body: data,
//       };
//     },
//     invalidatesTags: ["faq"],
//   }),
