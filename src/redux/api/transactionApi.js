import { baseApi } from "./baseApi";

const transactionApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getTransactions: builder.query({
                              query: () => {
                                        console.log("Data being sent to the API:");
                                        return {
                                                  url: "payment/get-all",
                                                  method: "GET",
                                        };
                              },
                              invalidatesTags: ["transaction"],
                    }),
          }),
});

export const { useGetTransactionsQuery } = transactionApi;

export default transactionApi;