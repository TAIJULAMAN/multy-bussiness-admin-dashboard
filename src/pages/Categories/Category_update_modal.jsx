import { Spin } from 'antd'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaTrashAlt, FaUpload } from 'react-icons/fa'
import { MdDelete, MdDownloadDone } from 'react-icons/md'
import { getImageUrl } from '../../config/envConfig'
import { useAdd_sub_categoryMutation, useDelete_sub_categoryMutation, useGet_all_sub_categoriesQuery, useUpdate_categoryMutation } from '../../redux/api/categoryApis'

const Category_update_modal = ({ category, onclose }) => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const { data } = useGet_all_sub_categoriesQuery({ id: category?._id });
  const [new_sub_category, setNew_sub_category] = useState("");
  const [categoryName, setCategoryName] = useState(category?.name);
  const [deleteSubCategory, { isLoading: isLoadingDelete }] = useDelete_sub_categoryMutation();
  const [createSubCategory, { isLoading: isLoadingCreate }] = useAdd_sub_categoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdate }] = useUpdate_categoryMutation();
  return (
    <div className="p-5">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-2">
        Update Category
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Edit the category information as needed. Your changes will reflect
        across all associated listings.
      </p>

      {/* Upload section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Post Image
        </label>
        <div className="border border-gray-300 rounded-md p-4 flex items-center justify-center">
          <label className="cursor-pointer text-gray-400">
            <div className="flex items-center gap-2 text-blue-500">
              <FaUpload className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">Upload Picture</span>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e => setUploadedImage(e.target.files[0]))}
            />
          </label>
        </div>
      </div>

      {/* Image preview */}

      <div className="border border-gray-300 rounded-md p-2 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
            <img
              src={uploadedImage ? URL.createObjectURL(uploadedImage) : getImageUrl(category?.img)}
              alt="Category"
              className="h-full w-full object-cover"
            />
          </div>
          {/* <span className="text-gray-400">{uploadedImage?.name}</span> */}
        </div>
        {uploadedImage && (

          <button
            onClick={() => setUploadedImage(null)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <FaTrashAlt size={18} className="text-red-500" />
          </button>
        )}
      </div>


      {/* Category name input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Category Name
        </label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <p>Sub Categories</p>
      <div className="space-y-4">
        {data?.data.map((sub, index) => (
          <div key={sub?._id} className="space-y-1">
            <div className="flex justify-between items-center">
              <input disabled
                value={sub?.name}
                className="w-full rounded-md p-2 pointer-events-none cursor-not-allowed bg-gray-100"
              />
              <button
                onClick={() => {
                  deleteSubCategory(sub?._id).unwrap()
                    .then((res) => {
                      toast.success(res?.message || "Sub-category deleted successfully");
                    })
                    .catch((error) => {
                      toast.error(error?.data?.message || "Error deleting sub-category");
                    });
                }}
                className="text-red-600 cursor-pointer active:scale-95 transition-transform duration-200"
              >
                <MdDelete className="h-6 w-6 text-red-600 hover:text-red-700" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 mb-6">
        <p>add new sub category</p>
        <div className="flex justify-between items-center">
          <input
            value={new_sub_category}
            onChange={(e) => setNew_sub_category(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={() => {
              createSubCategory({ category: category?._id, name: new_sub_category }).unwrap()
                .then((res) => {
                  setNew_sub_category("");
                  toast.success(res?.message || "Sub-category added successfully");
                })
                .catch((error) => {
                  console.log(error)
                  toast.error(error?.data?.message || "Error adding sub-category");
                });
            }}
            className="text-green-600 cursor-pointer active:scale-95 transition-transform duration-200"
          >
            {
              isLoadingCreate ? <Spin size="small" /> : <MdDownloadDone className="h-6 w-6 text-green-600 hover:text-green-700" />
            }

          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onclose}
          className="px-4 py-2 border border-red-200 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            const formData = new FormData();
            formData.append("name", categoryName);
            if (uploadedImage) {
              formData.append("img", uploadedImage);
            }
            updateCategory({ id: category?._id, data: formData }).unwrap()
              .then((res) => {
                toast.success(res?.message || "Category updated successfully");
                onclose();
              })
              .catch((error) => {
                toast.error(error?.data?.message || "Error updating category");
              });
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div >
  )
}

export default Category_update_modal
