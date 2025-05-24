import React from "react";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useChangeAdminPasswordMutation, useGetAdminProfileQuery } from "../../redux/api/profileApi";
import Swal from "sweetalert2";

function ChangePassword() {
          const [showPassword, setShowPassword] = useState(false);
          const [formValues, setFormValues] = useState({
                    old_password: "",
                    password: "",
                    confirm_password: "",
          });
          const { data: AdminProfileData } = useGetAdminProfileQuery()
          console.log("admin profile data", AdminProfileData)
          const [changeAdminPassword] = useChangeAdminPasswordMutation();

          const handleChange = (e) => {
                    const { name, value } = e.target;
                    setFormValues((prev) => ({
                              ...prev,
                              [name]: value,
                    }));
          };
          const handleSubmit = (e) => {
                    e.preventDefault();

                    const { old_password, password, confirm_password } = formValues;

                    // Password validation
                    if (password !== confirm_password) {
                              Swal.fire({
                                        icon: "error",
                                        title: "Password Mismatch",
                                        text: "The passwords do not match. Please try again.",
                              });
                              return;
                    }

                    if (!AdminProfileData?.data?.email) {
                              Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        text: "User information is missing. Please log in again.",
                              });
                              return;
                    }

                    // Submit the password change request

                    changeAdminPassword({
                              old_password,
                              password,
                              confirm_password,
                    })
                              .unwrap()
                              .then(() => {
                                        Swal.fire({
                                                  icon: "success",
                                                  title: "Password Updated",
                                                  text: "Your password has been updated successfully.",
                                        });
                                        setFormValues({
                                                  old_password: "",
                                                  password: "",
                                                  confirm_password: "",
                                        });
                              })
                              .catch((error) => {
                                        Swal.fire({
                                                  icon: "error",
                                                  title: "Error",
                                                  text: error?.data?.message || "An error occurred. Please try again.",
                                        });
                              });
          };

          return (
                    <div className="bg-white px-20 w-[715px] pt-10 py-5 rounded-md">
                              <p className="text-gray-800 text-center font-bold text-2xl mb-5">
                                        Change Password
                              </p>
                              <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="w-full">
                                                  <label
                                                            htmlFor="password"
                                                            className="text-xl text-gray-800 mb-2"
                                                  >
                                                            Current Password
                                                  </label>
                                                  <div className="w-full relative">
                                                            <input
                                                                      type={showPassword ? "text" : "password"}
                                                                      name="old_password"
                                                                      placeholder="**********"
                                                                      className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
                                                                      required
                                                                      value={formValues.old_password}
                                                                      onChange={handleChange}
                                                            />
                                                            <button
                                                                      type="button"
                                                                      onClick={() => setShowPassword(!showPassword)}
                                                                      className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
                                                            >
                                                                      {showPassword ? (
                                                                                <IoEyeOffOutline className="w-5 h-5" />
                                                                      ) : (
                                                                                <IoEyeOutline className="w-5 h-5" />
                                                                      )}
                                                            </button>
                                                  </div>
                                        </div>
                                        <div className="w-full">
                                                  <label
                                                            htmlFor="password"
                                                            className="text-xl text-gray-800 mb-2"
                                                  >
                                                            New Password
                                                  </label>
                                                  <div className="w-full relative">
                                                            <input
                                                                      type={showPassword ? "text" : "password"}
                                                                      name="password"
                                                                      placeholder="**********"
                                                                      className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
                                                                      required
                                                                      value={formValues.password}
                                                                      onChange={handleChange}
                                                            />
                                                            <button
                                                                      type="button"
                                                                      onClick={() => setShowPassword(!showPassword)}
                                                                      className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
                                                            >
                                                                      {showPassword ? (
                                                                                <IoEyeOffOutline className="w-5 h-5" />
                                                                      ) : (
                                                                                <IoEyeOutline className="w-5 h-5" />
                                                                      )}
                                                            </button>
                                                  </div>
                                        </div>
                                        <div className="w-full">
                                                  <label
                                                            htmlFor="password"
                                                            className="text-xl text-[#0D0D0D] mb-2"
                                                  >
                                                            Confirm New Password
                                                  </label>
                                                  <div className="w-full relative">
                                                            <input
                                                                      type={showPassword ? "text" : "password"}
                                                                      name="confirm_password"
                                                                      placeholder="**********"
                                                                      className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
                                                                      required
                                                                      value={formValues.confirm_password}
                                                                      onChange={handleChange}
                                                            />
                                                            <button
                                                                      type="button"
                                                                      onClick={() => setShowPassword(!showPassword)}
                                                                      className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
                                                            >
                                                                      {showPassword ? (
                                                                                <IoEyeOffOutline className="w-5 h-5" />
                                                                      ) : (
                                                                                <IoEyeOutline className="w-5 h-5" />
                                                                      )}
                                                            </button>
                                                  </div>
                                        </div>
                                        <div className="text-center py-5 text-white">
                                                  <button className="bg-[#14803c] text-white font-semibold w-full py-3 rounded-md">
                                                            Save Changes
                                                  </button>
                                        </div>
                              </form>
                    </div>
          );
}

export default ChangePassword;
