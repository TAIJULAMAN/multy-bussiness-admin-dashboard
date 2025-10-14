import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useDeleteFaqMutation } from "../../redux/api/faqApi";

export default function DeleteFaqButton({ faq, onDeleted }) {
  const [deleteFaq, { isLoading }] = useDeleteFaqMutation();

  const handleClick = async (e) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this FAQ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteFaq({ _id: faq?._id }).unwrap();
        Swal.fire({ icon: "success", title: "Deleted!", text: "FAQ has been deleted successfully!" });
        onDeleted?.();
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to delete FAQ. Please try again." });
      }
    }
  };

  return (
    <button onClick={handleClick} className="bg-[#FECACA] border border-[#EF4444] rounded  px-1.5 py-1" disabled={isLoading}>
      <RiDeleteBin6Line className="text-xl text-[#EF4444] font-bold" />
    </button>
  );
}
