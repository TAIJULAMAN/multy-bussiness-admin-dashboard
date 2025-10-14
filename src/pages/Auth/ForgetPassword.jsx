import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import Swal from "sweetalert2";
import { useForgotPasswordMutation } from "../../redux/api/authApi";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email!",
      });
      return;
    }

    forgotPassword({ email })
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "The OTP has been sent to your email successfully!",
        });
        navigate(`/otp?email=${email}`);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.data?.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-5 py-20 w-full max-w-xl text-center">
        <div className="flex mb-5 flex-col items-center justify-center w-full">
          <h2 className="text-gray-800 text-2xl font-bold text-center mb-5">
            Forgot password?
          </h2>
          <p className="text-gray-800 text-base text-center mb-5">
            Please enter your email to get verification code
          </p>
        </div>
        <form className="space-y-5">
          <div>
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="nahidhossain@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-gray-400 rounded-md outline-none mt-5 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="flex justify-center items-center text-white">
            <button
              onClick={handleSendCode}
              disabled={isLoading}
              type="button"
              className="whitespace-nowrap w-full bg-[#0091ff] text-white font-semibold py-3 rounded-lg shadow-lg cursor-pointer mt-5"
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


