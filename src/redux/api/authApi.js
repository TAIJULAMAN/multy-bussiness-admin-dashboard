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
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "auth/forget-password-check-otp",
        method: "PATCH",
        body: data,
      }),
    }),
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

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} = authApi;

export default authApi;
