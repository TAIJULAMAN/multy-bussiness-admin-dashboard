import React, { useEffect } from "react";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  useChangeAdminPasswordMutation,
  useGetUserProfileQuery,
} from "../../redux/api/profileApi";
import { useSelector } from "react-redux";
import { decodeAuthToken } from "../../Utils/decode-access-token";
import { message } from "antd";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = useSelector((state) => state.auth.token);
  const decodedToken = decodeAuthToken(token);
  const { data: userProfileData } = useGetUserProfileQuery({
    userId: decodedToken?.userId,
  });
  const [changeAdminPassword, { isLoading }] = useChangeAdminPasswordMutation();

  useEffect(() => {
    if (userProfileData?.data?.email) {
      setFormValues((prev) => ({
        ...prev,
        email: userProfileData?.data?.email,
      }));
    }
  }, [userProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, currentPassword, newPassword, confirmPassword } = formValues;

    // Validation
    if (!currentPassword.trim()) {
      message.error("Current password is required");
      return;
    }

    if (!newPassword.trim()) {
      message.error("New password is required");
      return;
    }

    if (newPassword.length < 6) {
      message.error("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match");
      return;
    }

    if (!email) {
      message.error("Email is required. Please try refreshing the page.");
      return;
    }

    try {
      const response = await changeAdminPassword({
        email,
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      if (response?.success) {
        message.success("Password updated successfully!");
        setFormValues({
          email: email, // Keep email
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        message.error("Failed to update password");
      }
    } catch (error) {
      console.error("Password change error:", error);
      message.error(error?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="bg-white px-20 w-[715px] pt-10 py-5 rounded-md">
      <p className="text-gray-800 text-center font-bold text-2xl mb-5">
        Change Password
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full">
          <label
            htmlFor="currentPassword"
            className="text-xl text-gray-800 mb-2"
          >
            Current Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl focus:border-[#0091FF]"
              required
              value={formValues.currentPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOutline className="w-5 h-5" />
              ) : (
                <IoEyeOffOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="newPassword" className="text-xl text-gray-800 mb-2">
            New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl focus:border-[#0091FF]"
              required
              value={formValues.newPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOutline className="w-5 h-5" />
              ) : (
                <IoEyeOffOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="confirmPassword"
            className="text-xl text-[#0D0D0D] mb-2"
          >
            Confirm New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl focus:border-[#0091FF]"
              required
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOutline className="w-5 h-5" />
              ) : (
                <IoEyeOffOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="text-center py-5 text-white">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#0091FF] text-white font-semibold w-full py-3 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Changing Password..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
