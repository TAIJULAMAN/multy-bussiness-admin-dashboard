/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Swal from "sweetalert2";
import Loader from "../../Components/Loaders/Loader.jsx";
import {
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} from "../../redux/api/privacyApi.js";
import PageHeading from "../../Components/Shared/PageHeading.jsx";
import JoditComponent from "../../Components/Shared/JoditComponent.jsx";

export default function PrivacyPolicy() {
  const [content, setContent] = useState("");
  const { data, isLoading } = useGetPrivacyQuery({});
  const [updatePrivacy, { isLoading: isSubmitting }] =
    useUpdatePrivacyMutation();

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const handleUpdatePrivacy = async () => {
    try {
      const requestData = {
        description: content,
      };
      console.log("requestData of privacy", requestData);

      const res = await updatePrivacy({ requestData }).unwrap();
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.message || "Privacy policy updated successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update privacy policy. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeading title="Privacy Policy" />
      <JoditComponent setContent={setContent} content={content} />
      <Button
        onClick={handleUpdatePrivacy}
        disabled={isSubmitting}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
        className="max-w-48 sidebar-button-black"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </>
  );
}
