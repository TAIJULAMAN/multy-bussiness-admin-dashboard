import { baseApi } from "./baseApi";

const formationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get_all_formation: builder.query({
      query: () => ({
        url: "formation/get-all-format",
        method: "GET",
      }),
      providesTags: ["formation"],
    }),

    add_formation: builder.mutation({
      query: (data) => ({
        url: "/formation/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    update_formation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/formation/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    delete_formation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/formation/delete/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});
export const {
  useGet_all_formationQuery,
  useAdd_formationMutation,
  useUpdate_formationMutation,
  useDelete_formationMutation,
} = formationApis;
