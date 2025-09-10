/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

// Helper function to get the auth token
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "admin",
    "dashboard",
    "user",
    "termsAndConditions",
    "faq",
    "privacy",
    "categories",
    "formation",
    "coupon",
    "earning",
  ],
});
