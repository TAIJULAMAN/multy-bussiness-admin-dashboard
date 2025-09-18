import { baseApi } from "./baseApi";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategory: builder.query({
      query: () => ({
        url: "category/get-all-category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllSubCategoryQuery } = subCategoryApi;

// createCategory: builder.mutation({
//     query: (data) => ({
//       url: "category/create-category",
//       method: "POST",
//       body: data,
//     }),
//     invalidatesTags: ["category"],
//   }),
//   updateCategory: builder.mutation({
//     query: ({ categoryId, data }) => ({
//       url: `category/update-category`,
//       method: "PATCH",
//       params: { categoryId },
//       body: data,
//     }),
//     invalidatesTags: ["category"],
//   }),
//   deleteCategory: builder.mutation({
//     query: (categoryId) => ({
//       url: `category/delete-category`,
//       method: "DELETE",
//       params: { categoryId },
//     }),
//     invalidatesTags: ["category"],
//   }),
