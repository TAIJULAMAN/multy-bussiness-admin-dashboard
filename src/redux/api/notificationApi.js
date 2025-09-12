import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: (params) => ({
        url: "notification/get-all-notification",
        method: "GET",
        params,
      }),
      providesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: (params) => ({
        url: `notification/delete-notification`,
        method: "DELETE",
        params,
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationQuery, useDeleteNotificationMutation } =
  notificationApi;

export default notificationApi;
