import React, { useEffect, useState } from "react";
import { useGetUserProfileQuery, useUpdateProfileMutation } from "../../redux/api/profileApi";
import { useSelector } from "react-redux";
import { decodeAuthToken } from "../../Utils/decode-access-token";
import { message } from "antd";

function EditProfile() {
          const [formData, setFormData] = useState({
                    name: "",
                    email: "",
          });

          const token = useSelector((state) => state.auth.token);
          const decodedToken = decodeAuthToken(token);
          const { data: userProfileData } = useGetUserProfileQuery({
            userId: decodedToken?.userId,
          });
          const [updateProfile, { isLoading }] = useUpdateProfileMutation();

          useEffect(() => {
                    if (userProfileData?.data) {
                              setFormData({
                                        name: userProfileData.data.name || "",
                                        email: userProfileData.data.email || "",
                              });
                    }
          }, [userProfileData]);

          const handleChange = (e) => {
                    setFormData({ ...formData, [e.target.name]: e.target.value });
          };

          const handleSubmit = async (e) => {
                    e.preventDefault();

                    if (!formData.name.trim()) {
                              message.error("Name is required");
                              return;
                    }

                    try {
                              const formDataToSend = new FormData();
                              formDataToSend.append("name", formData.name);
                              const response = await updateProfile(formDataToSend).unwrap();

                              if (response?.success) {
                                        message.success("Profile updated successfully!");
                              } else {
                                        message.error("Failed to update profile");
                              }
                    } catch (error) {
                              console.error("Profile update error:", error);
                              message.error(error?.data?.message || "Failed to update profile");
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
                                                            Name
                                                  </label>
                                                  <input
                                                            type="text"
                                                            name="name"
                                                            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl focus:border-[#0091FF]"
                                                            placeholder="Enter Your Name"
                                                            required
                                                            value={formData?.name}
                                                            onChange={handleChange}
                                                  />
                                        </div>

                                        <div>
                                                  <label className="text-xl text-gray-800 mb-2">Email</label>
                                                  <input
                                                            type="email"
                                                            name="email"
                                                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-md outline-none mt-5 placeholder:text-xl bg-gray-100 cursor-not-allowed"
                                                            placeholder="Email Address"
                                                            readOnly
                                                            disabled
                                                            value={formData?.email}
                                                  />
                                        </div>
                                        <div className="text-center py-5 text-white">
                                                  <button 
                                                            type="submit"
                                                            disabled={isLoading}
                                                            className="bg-[#0091FF] text-white font-semibold w-full py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                  >
                                                            {isLoading ? "Saving..." : "Save Changes"}
                                                  </button>
                                        </div>
                              </form>
                    </div>
          );
}

export default EditProfile;
