import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaUpload } from 'react-icons/fa';
import { useAdd_categoryMutation } from '../../redux/api/categoryApis';

const Category_add_modal = ({ onclose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [create, { isLoading }] = useAdd_categoryMutation();
  const handleSubmit = async () => {
    if (!categoryName || !selectedImage) {
      toast.error(``);
    }
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("img", selectedImage);
    await create(formData).unwrap().then((res) => {
      toast.success(res?.message || "Category Created Successfully");
      setCategoryName("");
      setSelectedImage(null);
      onclose();
    }).catch((err) => {
      toast.error(err?.data?.message || "Something went wrong");
      console.log(err)
    });
  }
  return (
    <div className="p-5">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Add New Category</h2>
        <p className="text-gray-600">
          Fill out the details below to add a new category. This will help
          users organize their listings effectively.
        </p>
      </div>

      {/* Upload Section */}
      <div className="mb-6">
        <label className="block text-gray-800 mb-2">
          Upload Category Image
        </label>
        <label className="border border-gray-300 rounded flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { setSelectedImage(e.target.files[0]) }}
          />
          <div className="flex items-center text-gray-500">
            <FaUpload className="w-5 h-5 mr-2 text-gray-400" />
            <span>
              {selectedImage ? selectedImage.name : "Upload Picture"}
            </span>
          </div>
        </label>
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="mt-2 max-h-40 object-contain rounded"
          />
        )}
      </div>

      {/* Category Name Input */}
      <div className="mb-6">
        <label className="block text-gray-800 mb-2">Category Name</label>
        <input
          type="text"
          placeholder="Enter Name here"
          className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>

      {/* buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={onclose}
          className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50 cursor-pointer "
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="py-2 px-4 rounded-lg bg-green-600 text-white cursor-pointer"
        >
          {isLoading ? "Creating..." : "save"}
        </button>
      </div>
    </div>
  )
}

export default Category_add_modal
