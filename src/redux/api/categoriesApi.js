import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiBaseUrl } from "../../config/envConfig";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
  }),
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    get_all_categories: builder.query({
      query: () => "category/get-all-category",
      providesTags: ["categories"],
    }),
    add_category: builder.mutation({
      query: (data) => ({
        url: "category/add-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    update_category: builder.mutation({
      query: ({ categoryId, data }) => ({
        url: `category/update-category?categoryId=${categoryId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    delete_category: builder.mutation({
      query: (categoryId) => ({
        url: `category/delete-category?categoryId=${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGet_all_categoriesQuery,
  useAdd_categoryMutation,
  useUpdate_categoryMutation,
  useDelete_categoryMutation,
} = categoriesApi;
