/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import PageHeading from "../../Components/Shared/PageHeading.jsx";
import JoditComponent from "../../Components/Shared/JoditComponent.jsx";
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/api/termsApi.js";
import Swal from "sweetalert2";
import Loader from "../../Components/Shared/Loaders/Loader.jsx";

const TermsCondition = () => {
  const [content, setContent] = useState("");
  const { data, isLoading } = useGetTermsAndConditionsQuery({});
  const [updateTermsAndConditions, { isLoading: isSubmitting }] =
    useUpdateTermsAndConditionsMutation();

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data?.data?.description);
    }
  }, [data]);

  const handleUpdateTerms = async () => {
    try {
      const requestData = {
        description: content,
      };
      console.log("requestData of terms", requestData);

      const res = await updateTermsAndConditions({ requestData }).unwrap();
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.message || "Terms and conditions updated successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update terms and conditions. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeading title="Terms & Condition" />
      <JoditComponent setContent={setContent} content={content} />
      <Button
        onClick={handleUpdateTerms}
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
};

export default TermsCondition;
