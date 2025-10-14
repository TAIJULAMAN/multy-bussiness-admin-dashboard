import { baseApi } from "./baseApi";

const formationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get_all_formation: builder.query({
      query: ({ page } = {}) => ({
        url: "formation/get-all-format",
        method: "GET",
        params: { page },
      }),
      providesTags: ["formation"],
    }),

    add_formation: builder.mutation({
      query: (data) => ({
        url: "formation/create-format",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["formation"],
    }),
    update_formation: builder.mutation({
      query: ({ formatId, data }) => ({
        url: `formation/update-format`,
        method: "PATCH",
        params: { formatId },
        body: data,
      }),
      invalidatesTags: ["formation"],
    }),
    delete_formation: builder.mutation({
      query: ({ formatId }) => ({
        url: `formation/delete-format`,
        method: "DELETE",
        params: { formatId },
      }),
      invalidatesTags: ["formation"],
    }),
  }),
});
export const {
  useGet_all_formationQuery,
  useAdd_formationMutation,
  useUpdate_formationMutation,
  useDelete_formationMutation,
} = formationApis;
