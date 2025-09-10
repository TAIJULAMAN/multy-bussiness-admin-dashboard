import { Modal } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
// import { getImageUrl } from '../../config/envConfig';
// import { useGet_all_categoriesQuery } from '../../redux/api/categoryApis';
// import Category_add_modal from './Category_add_modal';
import Category_delete_modal from "./Category_delete_modal";
// import Category_update_modal from './Category_update_modal';
// import Sub_category from './Sub_category';
import img1 from "../../assets/cover.png";
import img2 from "../../assets/cover1.png";
import img3 from "../../assets/cover2.png";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // const { data, isLoading } = useGet_all_categoriesQuery();

  const formationServices = [
    {
      id: 1,
      title: "Bank Opening Services",
      imageUrl: img1,
      description:
        "We assist with setting up local and international business bank accounts.",
    },
    {
      id: 2,
      title: "Office Space in the Business Center",
      imageUrl: img2,
      description:
        "Premium office spaces in prime business districts with flexible terms.",
    },
    {
      id: 3,
      title: "Company Formation",
      imageUrl: img3,
      description:
        "Complete legal assistance for registering and forming your company.",
    },
    {
      id: 4,
      title: "Legal Services",
      imageUrl: img1,
      description:
        "We assist with setting up local and international business bank accounts.",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageHeading title="Catagories Management" />
        <div className="text-white">
          <Link to="/categories/add">
            <button className="bg-[#0091FF] px-6 py-3 rounded cursor-pointer ">
              + Add New Formation
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-lg p-5 bg-white">
          <div className="space-y-4">
            <img
              src={category?.imageUrl}
              alt="avatar"
              className="w-full h-[200px] object-contain rounded-lg bg-gray-100"
            />
            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                {" "}
                {category?.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center text-sm">
                  {category?.description}
                </span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-4">
              <Link to={`/categories/${category?.id}`}>
                <button className="p-2 text-green-600 hover:text-green-800">
                  <IoMdInformationCircleOutline
                    size={24}
                    className="text-[#0091FF]"
                  />
                </button>
              </Link>

              <div className="h-6 w-px bg-gray-200"></div>

              <button
                onClick={() => {
                  setCategory(category);
                  setDeleteModalOpen(true);
                }}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
        <Modal
          open={deleteModalOpen}
          centered
          footer={null}
          onCancel={() => {
            setCategory(null);
            setDeleteModalOpen(false);
          }}
        >
          <Category_delete_modal
            category={category}
            onclose={() => {
              setCategory(null);
              setDeleteModalOpen(false);
            }}
          />
        </Modal>
      </div>
    </>
  );
}
