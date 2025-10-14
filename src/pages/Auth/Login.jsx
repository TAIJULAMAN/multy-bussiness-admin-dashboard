import { useState } from "react";
import "antd/dist/reset.css";
import { Link, useNavigate } from "react-router";
import BrandLogo from "../../Components/Shared/BrandLogo";
import Logo from "../../assets/icons/logo.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { setUser } from "../../redux/Slice/authSlice";
import { useDispatch } from "react-redux";
import { useLogInMutation } from "../../redux/api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: !email ? "Email is required!" : "Password is required!",
      });
      return;
    }
    const loginData = { email, password, role: "Admin" };

    try {
      const response = await logIn(loginData).unwrap();
      console.log("response", response);
      console.log("response from login", response?.data?.accessToken);
      if (response?.data?.accessToken) {
        dispatch(
          setUser({
            user: response?.data?.user || {},
            token: response?.data?.accessToken,
          })
        );
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: "You are now logged in.",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f6ff] p-5">
      <div className="bg-white shadow-lg relative rounded-2xl px-5 py-20 w-full max-w-xl text-center">
        <BrandLogo
          img={Logo}
          status="Login to your account"
          information="please enter your email and password to continue"
        />
        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your mail"
              className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-gray-400 rounded-md outline-none mt-5 placeholder:text-gray-400"
              required
            />
          </div>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-gray-400 rounded-md outline-none mt-5 placeholder:text-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-4 flex items-center text-gray-400"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm my-5">
            <label className="flex items-center gap-[10px] cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              {rememberMe ? (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 335">
                    <rect
                      id="Rectangle 331"
                      x="-0.00012207"
                      y="6.10352e-05"
                      width="21"
                      height="21"
                      rx="4"
                      className="fill-[#0091ff]"
                      stroke="#0091ff"
                    ></rect>
                    <path
                      id="Vector"
                      d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                      fill="white"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 335">
                    <rect
                      id="Rectangle 331"
                      x="-0.00012207"
                      y="6.10352e-05"
                      width="21"
                      height="21"
                      rx="4"
                      className="fill-transparent"
                      stroke="#0091ff"
                    ></rect>
                  </g>
                </svg>
              )}

              <span className="text-xl text-gray-600">Remember Password</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-[#0091ff] text-xl hover:text-[#0091ff]/80"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-center items-center text-white">
            <button
              type="submit"
              className="w-full bg-[#0091ff] font-semibold py-3 px-6 rounded-lg shadow-lg cursor-pointer mt-5"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
