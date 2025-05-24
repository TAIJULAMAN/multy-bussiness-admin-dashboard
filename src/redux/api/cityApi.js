import { baseApi } from "./baseApi";

const cityApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAllCity: builder.query({
                              query: ({ division }) => ({
                                        url: "city/get-all",
                                        method: "GET",
                                        params: { division },
                              }),
                              providesTags: ["city"],
                    }),
                    deleteCity: builder.mutation({
                              query: (_id) => ({
                                        url: `city/delete/${_id}`,
                                        method: "DELETE",
                              }),
                              invalidatesTags: ["city"],
                    }),
                    createCity: builder.mutation({
                              query: (data) => ({
                                        url: "city/create",
                                        method: "POST",
                                        body: data,
                              }),
                              invalidatesTags: ["city"],
                    }),
                    updateCity: builder.mutation({
                              query: ({ _id, data }) => {
                                        console.log('Updating City:', { _id, data });
                                        return {
                                                  url: `city/update/${_id}`,
                                                  method: "PATCH",
                                                  body: data,
                                        };
                              },
                              invalidatesTags: ["city"],
                    }),
          }),
});

export const {
          useGetAllCityQuery,
          useCreateCityMutation,
          useDeleteCityMutation,
          useUpdateCityMutation,
} = cityApi;

export default cityApi;