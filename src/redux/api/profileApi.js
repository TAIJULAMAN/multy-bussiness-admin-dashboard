import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useUpdateProfileMutation, useChangeAdminPasswordMutation } =
  profileApi;
