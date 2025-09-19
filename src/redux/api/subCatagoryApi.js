import { baseApi } from "./baseApi";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategory: builder.query({
      query: ({ categoryId, page }) => ({
        url: "category/get-all-subcategory",
        method: "GET",
        params: { categoryId, page },
      }),
      providesTags: ["category"],
    }),
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "category/create-sub-category",
        method: "POST",
        body: data, // expects { name, categoryId }
      }),
      invalidatesTags: ["category"],
    }),
    updateSubCategory: builder.mutation({
      query: ({ subCategoryId, data }) => ({
        url: "category/update-sub-category",
        method: "PATCH",
        params: { subCategoryId },
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteSubCategory: builder.mutation({
      query: ({ subCategoryId }) => ({
        url: "category/delete-sub-category",
        method: "DELETE",
        params: { subCategoryId },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllSubCategoryQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
