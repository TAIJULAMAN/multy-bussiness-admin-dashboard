import React from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa" 
import { FaTag, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

export default function ListingTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/bus1.png");

  const thumbnails = ["/bus1.png", "/bus2.png", "/bus3.png", "/bus4.png"];
 
  const showModal = (record) => {
    setSelectedListing(record);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataSource = [
    {
      key: "1",
      no: 1,
      userName: "John Doe",
      productName: "Product 1",
      price: 100,
      date: "2023-01-01",
      country: "Bangladesh",
      product: "Product 1",
      catrgory: "Category 1",
      status: "Active",
      email: "john.doe@example.com",
      description: "Description 1",
      condition: "New",
    },
    {
      key: "2",
      no: 2,
      userName: "Jane Smith",
      productName: "Product 2",
      price: 150,
      date: "2023-01-02",
      country: "India",
      product: "Product 2",
      catrgory: "Category 2",
      status: "Inactive",
      email: "jane.smith@example.com",
      description: "Description 2",
      condition: "Used",
    },
    {
      key: "3",
      no: 3,
      userName: "Alice Johnson",
      productName: "Product 3",
      price: 200,
      date: "2023-01-03",
      country: "USA",
      product: "Product 3",
      catrgory: "Category 3",
      status: "Active",
      email: "alice.johnson@example.com",
      description: "Description 3",
      condition: "New",
    },
    {
      key: "4",
      no: 4,
      userName: "Bob Brown",
      productName: "Product 4",
      price: 120,
      date: "2023-01-04",
      country: "UK",
      product: "Product 4",
      catrgory: "Category 1",
      status: "Active",
      email: "bob.brown@example.com",
      description: "Description 4",
      condition: "Refurbished",
    },
    {
      key: "5",
      no: 5,
      userName: "Carol White",
      productName: "Product 5",
      price: 180,
      date: "2023-01-05",
      country: "Canada",
      product: "Product 5",
      catrgory: "Category 2",
      status: "Inactive",
      email: "carol.white@example.com",
      description: "Description 5",
      condition: "New",
    },
    {
      key: "6",
      no: 6,
      userName: "David Green",
      productName: "Product 6",
      price: 130,
      date: "2023-01-06",
      country: "Australia",
      product: "Product 6",
      catrgory: "Category 3",
      status: "Active",
      email: "david.green@example.com",
      description: "Description 6",
      condition: "Used",
    },
    {
      key: "7",
      no: 7,
      userName: "Eva Black",
      productName: "Product 7",
      price: 140,
      date: "2023-01-07",
      country: "Germany",
      product: "Product 7",
      catrgory: "Category 1",
      status: "Active",
      email: "eva.black@example.com",
      description: "Description 7",
      condition: "New",
    },
    {
      key: "8",
      no: 8,
      userName: "Frank Wilson",
      productName: "Product 8",
      price: 160,
      date: "2023-01-08",
      country: "France",
      product: "Product 8",
      catrgory: "Category 2",
      status: "Inactive",
      email: "frank.wilson@example.com",
      description: "Description 8",
      condition: "Refurbished",
    },
    {
      key: "9",
      no: 9,
      userName: "Grace Lee",
      productName: "Product 9",
      price: 170,
      date: "2023-01-09",
      country: "Japan",
      product: "Product 9",
      catrgory: "Category 3",
      status: "Active",
      email: "grace.lee@example.com",
      description: "Description 9",
      condition: "New",
    },
    {
      key: "10",
      no: 10,
      userName: "Henry King",
      productName: "Product 10",
      price: 110,
      date: "2023-01-10",
      country: "South Korea",
      product: "Product 10",
      catrgory: "Category 1",
      status: "Active",
      email: "henry.king@example.com",
      description: "Description 10",
      condition: "Used",
    },
    {
      key: "11",
      no: 11,
      userName: "Isabel Scott",
      productName: "Product 11",
      price: 190,
      date: "2023-01-11",
      country: "Italy",
      product: "Product 11",
      catrgory: "Category 2",
      status: "Inactive",
      email: "isabel.scott@example.com",
      description: "Description 11",
      condition: "New",
    },
    {
      key: "12",
      no: 12,
      userName: "Jack Turner",
      productName: "Product 12",
      price: 200,
      date: "2023-01-12",
      country: "Spain",
      product: "Product 12",
      catrgory: "Category 3",
      status: "Active",
      email: "jack.turner@example.com",
      description: "Description 12",
      condition: "New",
    },
    {
      key: "13",
      no: 13,
      userName: "Karen Adams",
      productName: "Product 13",
      price: 115,
      date: "2023-01-13",
      country: "Netherlands",
      product: "Product 13",
      catrgory: "Category 1",
      status: "Active",
      email: "karen.adams@example.com",
      description: "Description 13",
      condition: "Refurbished",
    },
    {
      key: "14",
      no: 14,
      userName: "Liam Baker",
      productName: "Product 14",
      price: 125,
      date: "2023-01-14",
      country: "Brazil",
      product: "Product 14",
      catrgory: "Category 2",
      status: "Inactive",
      email: "liam.baker@example.com",
      description: "Description 14",
      condition: "Used",
    },
    {
      key: "15",
      no: 15,
      userName: "Mia Carter",
      productName: "Product 15",
      price: 135,
      date: "2023-01-15",
      country: "Mexico",
      product: "Product 15",
      catrgory: "Category 3",
      status: "Active",
      email: "mia.carter@example.com",
      description: "Description 15",
      condition: "New",
    },
    {
      key: "16",
      no: 16,
      userName: "Noah Davis",
      productName: "Product 16",
      price: 145,
      date: "2023-01-16",
      country: "Russia",
      product: "Product 16",
      catrgory: "Category 1",
      status: "Active",
      email: "noah.davis@example.com",
      description: "Description 16",
      condition: "Used",
    },
    {
      key: "17",
      no: 17,
      userName: "Olivia Evans",
      productName: "Product 17",
      price: 155,
      date: "2023-01-17",
      country: "South Africa",
      product: "Product 17",
      catrgory: "Category 2",
      status: "Inactive",
      email: "olivia.evans@example.com",
      description: "Description 17",
      condition: "New",
    },
    {
      key: "18",
      no: 18,
      userName: "Paul Foster",
      productName: "Product 18",
      price: 165,
      date: "2023-01-18",
      country: "New Zealand",
      product: "Product 18",
      catrgory: "Category 3",
      status: "Active",
      email: "paul.foster@example.com",
      description: "Description 18",
      condition: "Refurbished",
    },
    {
      key: "19",
      no: 19,
      userName: "Quinn Garcia",
      productName: "Product 19",
      price: 175,
      date: "2023-01-19",
      country: "China",
      product: "Product 19",
      catrgory: "Category 1",
      status: "Active",
      email: "quinn.garcia@example.com",
      description: "Description 19",
      condition: "New",
    },
    {
      key: "20",
      no: 20,
      userName: "Rachel Harris",
      productName: "Product 20",
      price: 185,
      date: "2023-01-20",
      country: "Singapore",
      product: "Product 20",
      catrgory: "Category 2",
      status: "Inactive",
      email: "rachel.harris@example.com",
      description: "Description 20",
      condition: "Used",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "User Info",
      key: "User Info",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <img
            // src={imageUrl(record?.userImg)}
            src="https://avatar.iran.liara.run/public/20"
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <div className="flex flex-col items-start justify-center">
            <span>{record?.userName || "No Name"}</span>
            <span>{record?.email || "No Email"}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Listing Info",
      key: "Listing Info",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            // src={imageUrl(record?.productImg)}
            src="https://avatar.iran.liara.run/public/21"
            className="w-10 h-10 object-cover rounded"
            alt="Product Avatar"
          />
          <div className="flex flex-col items-start justify-center">
            <span>{record?.productName}</span>
            <span>{record?.catrgory}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => (
        <span className="text-lg font-semibold">${record?.price}</span>
      ),
    },
    {
      title: "Posted On",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "business location",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => showModal(record)}
          className="border border-[#0091ff] rounded-lg p-1 bg-[#cce9ff] text-[#0091ff]"
        >
          <FaRegEye className="w-8 h-8 text-[#0091ff]" />
        </button>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorPrimary: "#0091ff",
            colorPrimaryHover: "#0091ff",
            itemActiveBg: "#0091ff",
            itemActiveColor: "#ffffff",
            colorBgTextHover: "#0091ff",
            colorText: "#0091ff",
          },
          Table: {
            headerBg: "#0091ff",
            headerColor: "rgb(255,255,255)",
            cellFontSize: 16,
            headerSplitColor: "#0091ff",
          },
        },
      }}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        // pagination={{
        //   pageSize: listData?.pagination?.itemPerPage,
        //   total: listData?.pagination?.totalItems,
        //   current: listData?.pagination?.currentPage,
        //   showSizeChanger: false,
        //   onChange: (page) => setPage(page),
        // }}
        pagination={{
          pageSize: 10,
          total: dataSource.length,
          current: 1,
          showSizeChanger: false,
          onChange: (page) => setPage(page),
        }}
        scroll={{ x: "max-content" }}
      />
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="container mx-auto px-4 py-8 bg-white">
          {/* Image Gallery Section */}
          <div className="mb-8">
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Trendy Urban Café"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(thumb)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === thumb
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={thumb || "/placeholder.svg"}
                    alt={`Café view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Trendy Urban Café in Dhaka City
              </h1>
              <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
                <FaTag className="text-green-600" />
                <span>Price: $75,000 USD</span>
              </div>
            </div>

            {/* Business Details Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Business Details
              </h2>

              <div className="space-y-4">
                {/* Business Type */}
                <div className="flex items-start gap-3">
                  <FaBuilding className="text-gray-600 mt-1" />
                  <div>
                    <span className="font-medium text-gray-700">
                      Business Type
                    </span>
                    <div className="mt-1">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        Franchise Resale
                      </span>
                    </div>
                  </div>
                </div>

                {/* Industry */}
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-600 mt-1" />
                  <div>
                    <span className="font-medium text-gray-700">Industry</span>
                    <p className="text-gray-600 mt-1">
                      Food & Beverage – Café & Coffee Shop
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">Dhaka City, Bangladesh</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                  Available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                Contact Seller
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
                Save Listing
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
