import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAllNotification: builder.query({
                              query: (params) => ({
                                        url: "notification/get-all",
                                        method: "GET",
                                        params,
                              }),
                              providesTags: ["notification"],
                    }),
                    deleteNotification: builder.mutation({
                              query: (_id) => ({
                                        url: `notification/delete/${_id}`,
                                        method: "DELETE",
                              }),
                              invalidatesTags: ["notification"],
                    }),
                    updateNotification: builder.mutation({
                              query: ({ _id, data }) => {
                                        console.log('Updating Notification:', { _id, data });
                                        return {
                                                  url: `notification/read/${_id}`,
                                                  method: "PATCH",
                                                  body: data,
                                        };
                              },
                              invalidatesTags: ["notification"],
                    }),
          }),
});

export const {
          useGetAllNotificationQuery,
          useDeleteNotificationMutation,
          useUpdateNotificationMutation,
} = notificationApi;

export default notificationApi;