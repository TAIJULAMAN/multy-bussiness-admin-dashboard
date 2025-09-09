import { Modal } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import Loader from "../../Components/Shared/Loaders/Loader";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Category_delete_modal from "../Categories/Category_delete_modal";
import { useGet_all_formationQuery } from "../../redux/api/formationApi";
import { getImageBaseUrl } from "../../config/envConfig";

export default function Formation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data: formationData, isLoading } = useGet_all_formationQuery();
  console.log("Formation data:", formationData);

  if (isLoading) {
    return <Loader />;
  }

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
        {formationData?.data && formationData?.data?.length > 0 ? (
          formationData?.data?.map((formation) => (
            <div
              key={formation._id}
              className="max-w-md w-full mx-auto border border-gray-300 rounded-lg p-5 bg-white"
            >
              <div className="space-y-4">
                <img
                  src={
                    formation.image
                      ? `${getImageBaseUrl()}/formation-image/${
                          formation?.image
                        }`
                      : "https://avatar.iran.liara.run/public/23"
                  }
                  alt={formation.title}
                  className="w-full h-[200px] object-cover rounded-lg bg-gray-100"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    {formation.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center text-sm text-gray-600">
                      {formation.detail}
                    </span>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-4">
                  <Link to={`/categories/${formation._id}`}>
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
                      setCategory(formation);
                      setDeleteModalOpen(true);
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-8">
            <div className="text-lg text-gray-600">No formations found</div>
          </div>
        )}
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
