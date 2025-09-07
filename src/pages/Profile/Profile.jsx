import React from "react";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import PageHeading from "../../Components/Shared/PageHeading";
// import { useSelector } from "react-redux";
// import { decodeAuthToken } from "../../Utils/decode-access-token";
// import { useGetProfileQuery, useUpdateProfileMutation } from "../../redux/api/profileApi";
// import { imageUrl } from "../../Utils/server";
// import { message } from "antd";

function Profile() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [profilePic, setProfilePic] = useState();
  // const token = useSelector((state) => state.auth.token);
  // console.log(token);
  // const decodedToken = decodeAuthToken(token);
  // console.log(decodedToken?.id);
  // const { data: profileData } = useGetProfileQuery({ _id: decodedToken?.id });
  // console.log("profileData", profileData);

  // const [updateProfile] = useUpdateProfileMutation();
  // const handleProfilePicUpload = async (e) => {
  //   const formData = new FormData();
  //   formData.append("img", e.target.files[0]);
  //   const response = await updateProfile(formData).unwrap();

  //   if (response?.success) {
  //     message.success(`Profile Picture Updated Successfully`);
  //     setProfilePic(URL.createObjectURL(e.target.files[0]));
  //   } else {
  //     message.error(`Failed to update Profile Picture`);
  //   }
  // };

  return (
    <div className="overflow-y-auto">
      <div className="px-5 pb-5 h-full">
        <PageHeading title="Profile Setting" />

        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex flex-col justify-center items-center mt-5 w-[900px] mx-auto p-5 gap-5 rounded-lg">
            <div className="relative">
              <div className="w-[122px] h-[122px] bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center">
                <img
                  src="https://avatar.iran.liara.run/public/46"
                  className=" object-cover rounded-full"
                  alt="User Avatar"
                />
                {/* Upload Icon */}
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <FaCamera className="text-[#0091FF]" />
                  </label>
                  <input type="file" id="profilePicUpload" className="hidden" />
                  {/* <input onChange={(e) => handleProfilePicUpload(e)} type="file" id="profilePicUpload" className="hidden" /> */}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-center">
              <span className="text-xl text-gray-800 md:text-3xl font-bold">
                Shah Aman
              </span>
              <span className="text-xl font-semibold text-gray-600">Admin</span>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "editProfile"
                  ? "text-[#0091FF] border-b-2 border-[#0091FF]"
                  : "text-[#6A6D76]"
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer pb-1 ${
                activeTab === "changePassword"
                  ? "text-[#0091FF] border-b-2 border-[#0091FF]"
                  : "text-[#6A6D76]"
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center p-5 rounded-md">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
