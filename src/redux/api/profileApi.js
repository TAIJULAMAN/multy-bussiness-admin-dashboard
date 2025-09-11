import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (params) => ({
        url: "user/user-detail",
        method: "GET",
        params,
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (file) => ({
        url: "user/update-profile",
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: ["profile"],
    }),
    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: "dashboard/admin-change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    getUserDetails: builder.query({
      query: (params) => ({
        url: "user/user-detail",
        method: "GET",
        params,
      }),
      providesTags: ["profile"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useChangeAdminPasswordMutation,
  useGetUserProfileQuery,
  useGetUserDetailsQuery,
} = profileApi;
