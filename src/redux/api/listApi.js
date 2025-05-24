import { baseApi } from "./baseApi";

const listApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAllListing: builder.query({
                              query: (params) => {
                                        console.log("Data being sent to the API:", params);
                                        return {
                                                  url: "product/admin-get-all",
                                                  method: "GET",
                                                  params: {
                                                            ...params,
                                                  },
                                        };
                              },
                              invalidatesTags: ["list"],
                    }),
                    updateListing: builder.mutation({
                              query: ({ _id, data }) => {
                                        console.log('Updating Listing:', { _id, data });
                                        return {
                                                  url: `product/status/${_id}`,
                                                  method: "PATCH",
                                                  body: data,
                                        };
                              },
                              invalidatesTags: ["list"],
                    }),
          }),
});

export const { useGetAllListingQuery, useUpdateListingMutation } = listApi;

export default listApi;