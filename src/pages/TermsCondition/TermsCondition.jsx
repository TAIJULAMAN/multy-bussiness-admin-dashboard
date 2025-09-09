/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import PageHeading from "../../Components/Shared/PageHeading.jsx";
import JoditComponent from "../../Components/Shared/JoditComponent.jsx";
import { useGetTermsAndConditionsQuery } from "../../redux/api/termsApi.js";
// import toast from 'react-hot-toast';
// import Loader from '../../Components/Shared/Loaders/Loader.jsx';

const TermsCondition = () => {
  const [content, setContent] = useState(" this is terms and conditions");
  const { data, isLoading } = useGetTermsAndConditionsQuery({});
  console.log(data);
  // const [setDescription, { isLoading: isSubmitting }] =
  // useUpdateTermsAndConditionsMutation();
  // useEffect(() => {
  //           if (data?.data?.desc) {
  //                     setContent(data?.data?.desc);
  //           }
  // }, [data]);

  // const updateTerms = async () => {
  //           try {
  //                     const requestData = {
  //                               name: "term",
  //                               desc: content

  //                     };
  //                     console.log("requestData of terms",requestData);

  //                     const res = await setDescription({ requestData }).unwrap();
  //                     if (res?.success) {
  //                               toast.success(
  //                                         res?.message || 'Terms and conditions updated successfully !'
  //                               );
  //                     }
  //           } catch (error) {
  //                     console.log(error);
  //           }
  // };

  // if (isLoading) {
  //           return (
  //                     <Loader />
  //           );
  // }

  return (
    <>
      <PageHeading title="Terms & Condition" />
      <JoditComponent setContent={setContent} content={content} />
      <Button
        // onClick={updateTerms}
        // disabled={isSubmitting}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
        className="max-w-48 sidebar-button-black"
      >
        {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
        Submit
      </Button>
    </>
  );
};

export default TermsCondition;
