import React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../../redux/api/authApi";
import Swal from "sweetalert2";

function VerificationCode() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [searchParams] = useSearchParams();
  const [verifyEmail] = useVerifyEmailMutation();

  const email = searchParams.get("email");
  console.log("email", email);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 6) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };
  const enteredCode = code.join("");
  const otpData = {
    email,
    code: enteredCode,
  };

  const handleVerifyCode = async () => {
    if (enteredCode.length === 6) {
      await verifyEmail(otpData)
        .unwrap()
        .then((response) => {
          console.log("response from verify email", response);
          // localStorage.setItem("resetToken", response?.data?.resetToken);
          Swal.fire({
            icon: "success",
            title: "Verification successful!",
            text: "Your email has been successfully verified.",
          });
          navigate("/reset-password");
        })
        .catch((err) => {
          console.error("Verification error:", err);
          const errorMessage =
            err?.data?.message ||
            err.message ||
            "Invalid code. Please try again.";
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: errorMessage,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid 6-digit code.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-10 py-20 w-full max-w-xl text-center">
        <div className="flex mb-5 flex-col items-center justify-center w-full">
          <h2 className="text-gray-800 text-2xl font-bold text-center mb-5">
            Check your email
          </h2>
          <p className="text-gray-800 text-base text-center mb-5">
            Please enter your email to get verification code.
          </p>
        </div>
        <form className="space-y-5">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="shadow-xs w-12 h-12 text-2xl text-center border border-[#0091ff] text-[#0091ff] rounded-lg focus:outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col gap-5 justify-center items-center text-white">
            <button
              onClick={handleVerifyCode}
              type="button"
              className="whitespace-nowrap w-full bg-[#0091ff] text-white font-semibold py-3 rounded-lg shadow-lg cursor-pointer my-5"
            >
              Continue
            </button>
            {/* <p className="text-[#6A6D76] text-center mt-10">
              You have not received the email?{" "}
              <span className="text-[#00B047]"> Resend</span>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerificationCode;
