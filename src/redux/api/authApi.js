import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        console.log("Data being sent to the API:", data);
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["admin"],
    }),
    // forgotPassword: builder.mutation({
    //   query: (data) => ({
    //     url: "verification/create",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // verifyEmail: builder.mutation({
    //   query: (data) => ({
    //     url: "verification/verify",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // resetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: "auth/reset-password",
    //     method: "POST",
    //     body: data,
    //     headers: {
    //       Authorization: localStorage.getItem("resetToken"),
    //     },
    //   }),

    //   invalidatesTags: ["admin"],
    // }),
  }),
});

export const { useLogInMutation } = authApi;

export default authApi;
