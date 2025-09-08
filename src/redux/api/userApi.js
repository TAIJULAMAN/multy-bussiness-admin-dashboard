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
    // updateUser: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/auth/block/${id}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: ["user", "reports"],
    // }),
    // getSingleUser: builder.query({
    //   query: ({ user }) => ({
    //     url: `product/admin-get-all`,
    //     method: "GET",
    //     params: {
    //       user,
    //     },
    //   }),
    //   providesTags: ["user"],
    // }),
  }),
});

export const { useGetAllUserQuery } = userApi;
