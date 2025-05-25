import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useParams } from 'react-router-dom';
import img1 from "../../assets/cover.png";
import img2 from "../../assets/cover1.png";
import img3 from "../../assets/cover2.png";
import PageHeading from '../../Components/Shared/PageHeading';

const BusinessInfo = () => {
          const { id } = useParams();
          const [serviceDetails, setServiceDetails] = useState(null);
          const formationServices = [
                    {
                              id: 1,
                              title: "Bank Opening Services",
                              imageUrl: img1,
                              description: "We assist with setting up local and international business bank accounts.",
                              features: [
                                        "Local bank account setup assistance",
                                        "International banking solutions",
                                        "Multi-currency account options",
                                        "Corporate credit card services",
                                        "Online banking setup",
                                        "Dedicated banking relationship manager"
                              ],
                              requirements: [
                                        "Valid business registration",
                                        "Proof of business address",
                                        "Directors' identification",
                                        "Initial deposit amount",
                                        "Business plan (for certain accounts)"
                              ],

                    },
                    {
                              id: 2,
                              title: "Office Space in the Business Center",
                              imageUrl: img2,
                              description: "Premium office spaces in prime business districts with flexible terms.",
                              features: [
                                        "Prime location",
                                        "Furnished offices",
                                        "Meeting rooms",
                                        "Reception services",
                                        "High-speed internet",
                                        "24/7 access"
                              ],
                              requirements: [
                                        "Company registration documents",
                                        "Lease agreement signing",
                                        "Security deposit",
                                        "Insurance coverage",
                                        "Utility setup"
                              ],

                    },
                    {
                              id: 3,
                              title: "Company Formation",
                              imageUrl: img3,
                              description: "Complete legal assistance for registering and forming your company.",
                              features: [
                                        "Staff and supplier contacts",
                                        "10k+ social media followers",
                                        "Decor and interior furnishings",
                                        "POS system",
                                        "Professional coffee & kitchen equipment",
                                        "Complete café setup (~1,200 sq. ft.)"
                              ],
                              requirements: [
                                        "Shareholders' information",
                                        "Directors' details",
                                        "Capital information",
                                        "Business activity description",
                                        "Required licenses"
                              ],

                    }
          ];
          useEffect(() => {
                    const service = formationServices.find(s => s.id === parseInt(id));
                    setServiceDetails(service);
          }, [id]);

          if (!serviceDetails) {
                    return <div className="p-4">Loading...</div>;
          }

          return (
                    <>
                              <div className="flex justify-between items-center mb-5">
                                        <PageHeading title="Bank Account Opening Services" />
                                        <div className="text-white">
                                                  <button
                                                            className="bg-[#0091FF] px-6 py-3 rounded cursor-pointer "
                                                  >
                                                            + Edit Formation
                                                  </button>
                                        </div>
                              </div>
                              <Card className="">
                                        <div className="space-y-5">
                                                  {/* Header Section */}
                                                  <div className="mb-5">
                                                            <img
                                                                      src={serviceDetails.imageUrl}
                                                                      alt={serviceDetails.title}
                                                                      className="w-full h-[300px] object-contain rounded-lg bg-gray-100 mb-4"
                                                            />
                                                            <h1 className="text-3xl font-bold text-gray-800">{serviceDetails.title}</h1>
                                                            <p className="text-lg text-gray-600 mt-2">{serviceDetails.description}</p>
                                                  </div>

                                                  {/* Features Section */}
                                                  <div className="border-t pt-6">
                                                            <h2 className="text-xl font-semibold text-gray-800 mb-4">──Assets Included</h2>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                      {serviceDetails.features.map((feature, index) => (
                                                                                <div key={index} className="flex items-start space-x-2">
                                                                                          <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                                                                                          <p className="text-gray-700">{feature}</p>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  {/* Requirements Section */}
                                                  <div className="border-t pt-6">
                                                            <h2 className="text-xl font-semibold text-gray-800 mb-4">── Financial Summary (Approximate)</h2>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                      {serviceDetails.requirements.map((requirement, index) => (
                                                                                <div key={index} className="flex items-start space-x-2">
                                                                                          <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                                                                                          <p className="text-gray-700">{requirement}</p>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>

                                        </div>
                              </Card>

                    </>
          );
};

export default BusinessInfo;