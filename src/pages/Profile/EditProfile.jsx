import React, { useEffect, useState } from "react";
import { useGetAdminProfileQuery, useUpdateProfileMutation } from "../../redux/api/profileApi";
import Swal from "sweetalert2";

function EditProfile() {
          const [formData, setFormData] = useState({
                    name: "",
                    email: "",

          });

          const { data: AdminProfileData } = useGetAdminProfileQuery()

          useEffect(() => {
                    if (AdminProfileData) {
                              setFormData({
                                        name: AdminProfileData?.data?.name || "",
                                        email: AdminProfileData?.data?.email || "",
                              });

                    }
          }, [AdminProfileData]);

          const [updateProfile] = useUpdateProfileMutation();

          const handleChange = (e) => {
                    setFormData({ ...formData, [e.target.name]: e.target.value });
          };

          const handleSubmit = async (e) => {
                    e.preventDefault();

                    if (!AdminProfileData?.data?._id) {
                              Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        text: "User information is missing. Please log in again.",
                              });
                              return;
                    }

                    try {
                              const formDataToSend = new FormData();
                              formDataToSend.append("name", formData.name);
                              await updateProfile(formDataToSend).unwrap();

                              Swal.fire({
                                        icon: "success",
                                        title: "Profile Updated",
                                        text: "Your profile has been updated successfully!",
                              });
                    } catch (error) {
                              Swal.fire({
                                        icon: "error",
                                        title: "Error updating profile",
                                        text: error?.data?.message || "Something went wrong!",
                              });
                    }
          };

          return (
                    <div className="bg-white px-20 w-[715px] py-5 rounded-md">
                              <p className="text-gray-800 text-center font-bold text-2xl mb-5">
                                        Edit Your Profile
                              </p>
                              <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                                  <label className="text-xl text-gray-800 mb-2">
                                                            Admin Name
                                                  </label>
                                                  <input
                                                            type="text"
                                                            name="name"
                                                            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                                                            placeholder="Enter Admin Name"
                                                            required
                                                            value={formData?.name}
                                                            onChange={handleChange}
                                                  />
                                        </div>

                                        <div>
                                                  <label className="text-xl text-gray-800 mb-2">Email</label>
                                                  <input
                                                            type="text"
                                                            name="email"
                                                            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
                                                            placeholder="Enter Email"
                                                            readOnly
                                                            value={formData?.email}
                                                  />
                                        </div>
                                        <div className="text-center py-5 text-white">
                                                  <button className="bg-[#14803c] text-white font-semibold w-full py-3 rounded-lg">
                                                            Save Changes
                                                  </button>
                                        </div>
                              </form>
                    </div>
          );
}

export default EditProfile;
