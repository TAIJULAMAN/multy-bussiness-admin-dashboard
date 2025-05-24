import { baseApi } from "./baseApi";

const locationApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAllLocation: builder.query({
                              query: (params) => ({
                                        url: "division/get-all",
                                        method: "GET",
                                        params,
                              }),
                              providesTags: ["location"],
                    }),
                    deleteLocation: builder.mutation({
                              query: ({data,_id}) => ({
                                        url: `division/delete/${_id}`,
                                        method: "DELETE",
                                        body: data,
                              }),
                              invalidatesTags: ["location"],
                    }),
                    createLocation: builder.mutation({
                              query: (data) => ({
                                        url: "division/create",
                                        method: "POST",
                                        body: data,
                              }),
                              invalidatesTags: ["location"],
                    }),
                    updateLocation: builder.mutation({
                              query: ({ _id, data }) => {
                                        console.log('Updating Location:', { _id, data });
                                        return {
                                                  url: `division/update/${_id}`,
                                                  method: "PATCH",
                                                  body: data,
                                        };
                              },
                              invalidatesTags: ["location"],
                    }),
          }),
});

export const {
          useGetAllLocationQuery,
          useCreateLocationMutation,
          useDeleteLocationMutation,
          useUpdateLocationMutation,
} = locationApi;

export default locationApi;