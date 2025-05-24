import { baseApi } from './baseApi';

const categoryApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get_all_categories: builder.query({
      query: () => ({
        url: '/category/get-all',
        method: 'GET',
      }),
      providesTags: ['categories'],
    }),
    get_all_sub_categories: builder.query({
      query: ({ id }) => ({
        url: `/service/get-all?category_id=${id}`,
        method: 'GET',
      }),
      providesTags: ['categories'],
    }),

    add_category: builder.mutation({
      query: (data) => ({
        url: '/category/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),
    delete_sub_category: builder.mutation({
      query: (id) => ({
        url: `/service/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),
    add_sub_category: builder.mutation({
      query: (data) => ({
        url: '/service/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),
    update_category: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),
    delete_category: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/delete/${id}`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),
  })
})
export const {
  useGet_all_categoriesQuery,
  useGet_all_sub_categoriesQuery,
  useAdd_categoryMutation,
  useDelete_sub_categoryMutation,
  useAdd_sub_categoryMutation,
  useUpdate_categoryMutation,
  useDelete_categoryMutation
} = categoryApis;