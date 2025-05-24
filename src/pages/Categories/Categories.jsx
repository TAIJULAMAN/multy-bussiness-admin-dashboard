import { Modal } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import { getImageUrl } from '../../config/envConfig';
import { useGet_all_categoriesQuery } from '../../redux/api/categoryApis';
import Category_add_modal from './Category_add_modal';
import Category_delete_modal from './Category_delete_modal';
import Category_update_modal from './Category_update_modal';
import Sub_category from './Sub_category';

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [category, setCategory] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { data, isLoading } = useGet_all_categoriesQuery();



  const handleOk = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModal2 = () => {
    setAddModalOpen(true);
  };
  const showModal3 = () => {
    setUpdateModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  const handleCancel3 = () => {
    setUpdateModalOpen(false);
  };


  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageHeading title="Catagories Management" />
        <div className="text-white">
          <button
            onClick={showModal2}
            className="bg-[#15803D] px-6 py-3 rounded cursor-pointer "
          >
            + Add new Category
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {
          data?.data?.map((category) => (<div key={category?._id} className="max-w-md w-full mx-auto border border-gray-300 rounded-lg p-5 bg-white">
            <div className="space-y-4">
              <img
                src={getImageUrl(category?.img)}
                alt="avatar"
                className="w-full h-[200px] object-contain rounded-lg bg-gray-100"
              />
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-green-50 text-green-700 border border-green-300">
                    {category?.name}
                  </span>
                </div>
              </div>

              {/* City Section */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Sub Category</h3>
                <Sub_category id={category?._id} />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-4">
                <button
                  onClick={() => {
                    showModal3();
                    setCategory(category);
                  }}
                  className="p-2 text-green-600 hover:text-green-800"
                >
                  <FaPencilAlt size={18} />
                </button>

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
          </div>))
        }
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              Are you sure you want to delete ?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={handleOk}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                YES,DELETE
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={handleOk}
                className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                NO,DON’T DELETE
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={addModalOpen}
          centered
          onCancel={handleCancel2}
          footer={null}
        >
          <Category_add_modal onclose={handleCancel2} />
        </Modal>

        <Modal
          open={updateModalOpen}
          centered
          onCancel={handleCancel3}
          footer={null}
        >
          <Category_update_modal category={category} onclose={handleCancel3} />
        </Modal>
        <Modal
          open={deleteModalOpen}
          centered
          footer={null}
          onCancel={() => {
            setCategory(null);
            setDeleteModalOpen(false);
          }}
        >
          <Category_delete_modal category={category} onclose={() => {
            setCategory(null);
            setDeleteModalOpen(false);
          }} />
        </Modal>
      </div>
    </>
  );
}
