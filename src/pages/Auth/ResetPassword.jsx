import React, { useState } from "react";
import "antd/dist/reset.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPasswordMutation } from "../../redux/api/authApi";
import Swal from "sweetalert2";
import BrandLogo from "../../Components/Shared/BrandLogo";

// import { getResetToken } from "../../services/auth.service";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [resetPassword] = useResetPasswordMutation();

  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords do not match. Please try again.",
      });
      return;
    }

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Invalid Request",
        text: "Missing required fields.",
      });
      return;
    }

    // const resetToken = getResetToken();
    // console.log("resetToken from reset password", resetToken);
    // if (!resetToken) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invalid Request",
    //     text: "The password reset token is invalid. Please try again.",
    //   });
    //   return;
    // }

    try {
      await resetPassword({
        email,
        confirm_password: confirmPassword,
        password: newPassword,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been successfully updated.",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Password Reset Failed",
        text: error?.message || "Please try again.",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-start">
        <BrandLogo
          status="Set a new password"
          information="Create a new password. Ensure it differs from previous ones for security."
        />
        <form className="space-y-5" onSubmit={handleUpdatePassword}>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-gray-400 rounded-md outline-none mt-5 placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 bottom-4 flex items-center text-gray-400"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Confirm Password
            </label>
            <div className="w-full relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-gray-400 rounded-md outline-none mt-5 placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 bottom-4 flex items-center text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center text-white">
            <button
              type="submit"
              className="w-full bg-[#0091ff] font-semibold py-3 px-6 rounded-lg shadow-lg cursor-pointer mt-5"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
