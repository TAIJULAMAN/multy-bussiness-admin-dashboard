import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (arg) => {
        const page = arg?.page;
        return {
          url: "category/get-category-dashboard",
          method: "GET",
          params: page ? { page } : {},
        };
      },
      providesTags: ["category"],
    }),
    // fetch all categories (no pagination)
    getAllCategoryList: builder.query({
      query: () => ({
        url: "category/get-all-category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "category/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, data }) => ({
        url: `category/update-category`,
        method: "PATCH",
        params: { categoryId },
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `category/delete-category`,
        method: "DELETE",
        params: { categoryId },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useGetAllCategoryListQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
