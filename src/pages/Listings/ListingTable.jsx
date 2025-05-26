import React from "react";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
// import { useGetAllListingQuery } from "../../redux/api/listApi";
// import { imageUrl } from "../../Utils/server";
import img from "../../assets/build.png"

function ListingTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [page, setPage] = useState(1);
  // const { data: listData } = useGetAllListingQuery({ page });
  // console.log("listdata", listData);
  const showModal = (record) => {
    setSelectedListing(record);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const dataSource =
  //   listData?.data?.map((list, index) => ({
  //     key: list?._id || index.toString(),
  //     no: index + 1,
  //     userName: list?.user_name || "No Name",
  //     userImg: list?.user_img,
  //     productName: list?.name || "No Name",
  //     productImg: list?.img,
  //     price: list?.price,
  //     product: list?.product,
  //     catrgory: list?.category_name,
  //     status: list?.status,
  //     email: list?.user_email || "N/A",
  //     description: list?.description,
  //     condition: list?.condition,
  //   })) || [];

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
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Posted On",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Country",
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-5">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={selectedListing?.productName}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{selectedListing?.productName}</h1>
                <div className="flex items-center mt-2">
                  <span className="text-2xl font-semibold">{selectedListing?.price}</span>
                  <p className="ml-2 text-[#0091ff]">In Stock</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">Product Details</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Product Category
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.catrgory}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Status
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.status}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Seller Name
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.userName}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Seller Email
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Condition
                    </h3>
                    <p className="mt-1 bg-[#cce9ff] text-[#0091ff]">
                      {selectedListing?.condition}
                    </p>
                  </div>

                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    Description
                  </h2>
                  <p className="mt-1">
                    {selectedListing?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default ListingTable;
