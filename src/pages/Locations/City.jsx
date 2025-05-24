import React from "react";
import { useDeleteCityMutation, useGetAllCityQuery } from "../../redux/api/cityApi";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../Components/Shared/Loaders/Loader";

const Cities = ({ location }) => {
          const { data: citiesData, refetch } = useGetAllCityQuery({ division: location?._id });
          const [deleteCity, { isLoading: isDeleting }] = useDeleteCityMutation();
          const handleDeleteAdmin = async (city) => {
                    try {
                              const confirmResult = await Swal.fire({
                                        title: 'Are you sure?',
                                        text: `You are about to delete ${city?.name}`,
                                        icon: 'warning',
                                        confirmButtonColor: '#14803c',
                                        showCancelButton: true,
                                        confirmButtonText: 'Yes, delete it!',
                                        cancelButtonText: 'Cancel',
                              });

                              if (confirmResult.isConfirmed) {
                                        await deleteCity(city?._id).unwrap();
                                        Swal.fire({
                                                  icon: 'success',
                                                  title: 'Deleted!',
                                                  text: 'City has been deleted successfully.',
                                                  confirmButtonColor: '#14803c'
                                        });
                                        refetch();
                              }
                    } catch (error) {
                              Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: error?.data?.message || 'Failed to delete city',
                                        confirmButtonColor: '#14803c'
                              });
                    }
          };
          if (isDeleting) {
                    return <Loader />;
          }

          return (
                    <div className="mb-4">
                              <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-medium text-gray-800">Cities</h3>
                              </div>
                              <div className="grid gap-2">
                                        {citiesData?.data?.map(city => (
                                                  <div key={city?._id} className="flex items-center justify-between w-full p-2 bg-white rounded-lg shadow-sm">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-green-50 text-green-700 border border-green-300">
                                                                      {city.name}
                                                            </span>
                                                            <div className="flex items-center">
                                                                      <button
                                                                                onClick={() => handleDeleteAdmin(city)}
                                                                                className="p-2 text-red-500 hover:text-red-700"
                                                                      >
                                                                                <FaTrashAlt size={18} className="text-red-500" />
                                                                      </button>
                                                            </div>
                                                  </div>
                                        ))}
                              </div>
                    </div>
          );
};

export default Cities;
