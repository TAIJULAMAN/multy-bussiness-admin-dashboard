import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (params) => ({
        url: "dashboard/get-all-user",
        method: "GET",
        params: {
          ...params,
        },
      }),
      providesTags: ["user"],
    }),

    getSingleUser: builder.query({
      query: ({ userId }) => ({
        url: "dashboard/users-business-statistics",
        method: "GET",
        params: {
          userId,
        },
      }),
      providesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (userId) => {
        // console.log("updateUser API - userId:", userId);
        return {
          url: `dashboard/block-user?userId=${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAllUserQuery, useGetSingleUserQuery, useUpdateUserMutation } = userApi;