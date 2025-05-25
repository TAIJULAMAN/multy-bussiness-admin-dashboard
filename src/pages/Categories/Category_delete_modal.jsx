import { useState } from 'react';
import { useDelete_categoryMutation } from '../../redux/api/categoryApis';
import toast from 'react-hot-toast';

const Category_delete_modal = ({ category, onclose }) => {
  const [deleteCategory, { isLoading: isLoadingDelete }] = useDelete_categoryMutation();
  const [categoryName, setCategoryName] = useState("");
  const [password, setPassword] = useState("");
  const handleDelete = async (id) => {
    await deleteCategory({ id: category?._id, data: { name: categoryName, password } }).unwrap().then((res) => {
      onclose();
      toast.success(res?.message || "Category Deleted Successfully");
    }).catch((err) => {
      toast.error(err?.data?.message || "Something went wrong");
    });
  }
  return (
    <div className="p-5">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">are you sure you want to delete the Category</h2>
        <p className="text-gray-600">
          To delete <strong>"{category?.name}"</strong>, enter the category name and admin password. This will also remove all its sub-categories. Click "Delete" to confirm.
        </p>
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
      <div className="mb-6">
        <label className="block text-gray-800 mb-2">Admin password</label>
        <input
          type="text"
          placeholder="Enter Name here"
          className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={onclose}
          className="py-2 px-4 rounded-lg border border-green-600 bg-red-50 cursor-pointer "
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className="py-2 px-4 rounded-lg bg-red-600 !text-[#FFF] cursor-pointer"
        >
          {isLoadingDelete ? "deleting..." : "Delete"}
        </button>
      </div>
    </div>
  )
}

export default Category_delete_modal
