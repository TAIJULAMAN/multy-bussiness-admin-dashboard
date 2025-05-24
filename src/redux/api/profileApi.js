import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getProfile: builder.query({
                              query: ({ _id }) => ({
                                        url: `auth/details/${_id}`,
                                        method: 'GET',
                              }),
                              providesTags: ['profile'],
                    }),
                    getAdminProfile: builder.query({
                              query: () => ({
                                        url: "auth/profile",
                                        method: 'GET',
                              }),
                              providesTags: ['profile'],
                    }),
                    updateProfile: builder.mutation({
                              query: (file) => ({
                                        url: 'auth/update-profile',
                                        method: 'PATCH',
                                        body: file,
                              }),
                              invalidatesTags: ['profile'],
                    }),
                    changeAdminPassword: builder.mutation({
                              query: (data) => ({
                                        url: "auth/change-password",
                                        method: "POST",
                                        body: data,
                              }),
                    }),
          }),
});

export const {
          useGetProfileQuery,
          useGetAdminProfileQuery,
          useUpdateProfileMutation,
          useChangeAdminPasswordMutation
} = profileApi;
