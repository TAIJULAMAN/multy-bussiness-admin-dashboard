/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
// import toast from 'react-hot-toast';
// import Loader from '../../Components/Shared/Loaders/Loader.jsx';
// import { useGetPrivacyQuery, useUpdatePrivacyMutation } from '../../redux/api/privacyApi.js';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import JoditComponent from '../../Components/Shared/JoditComponent.jsx';

const PrivacyPolicy = () => {
          const [content, setContent] = useState('this is privacy policy');
          // const { data, isLoading } = useGetPrivacyQuery({});
          // console.log(data);
          // const [setDescription, { isLoading: isSubmitting }] =
          //           useUpdatePrivacyMutation();
          // useEffect(() => {
          //           if (data?.data?.desc) {
          //                     setContent(data?.data?.desc);
          //           }
          // }, [data]);

          // const updateTerms = async () => {
          //           try {
          //                     const requestData = {
          //                               name: "privacy",
          //                               desc: content

          //                     };
          //                     console.log("requestData of privacy", requestData);

          //                     const res = await setDescription({ requestData }).unwrap();
          //                     if (res?.success) {
          //                               toast.success(
          //                                         res?.message || 'Privacy policy updated successfully !'
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

                              <PageHeading title="Privacy Policy" />
                              <JoditComponent setContent={setContent} content={content} />
                              <Button
                                        // onClick={updateTerms}
                                        // disabled={isSubmitting}
                                        style={{
                                                  justifyContent: 'center',
                                                  alignItems: 'center',
                                                  marginTop: '10px',
                                        }}
                                        className="max-w-48 sidebar-button-black"
                              >
                                        {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
                                        Submit
                              </Button>
                    </>
          );
};

export default PrivacyPolicy;