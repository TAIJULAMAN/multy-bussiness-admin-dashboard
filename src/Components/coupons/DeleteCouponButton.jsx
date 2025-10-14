import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useDelete_couponMutation } from "../../redux/api/couponApi";

export default function DeleteCouponButton({ record, onDeleted }) {
  const [deleteCoupon, { isLoading }] = useDelete_couponMutation();

  const handleClick = async (e) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete the coupon: ${record.code}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteCoupon({ couponId: record._id }).unwrap();
        Swal.fire("Deleted!", "Your coupon has been deleted.", "success");
        onDeleted?.();
      } catch (error) {
        Swal.fire(
          "Error!",
          error?.data?.message || error?.message || "Failed to delete coupon",
          "error"
        );
      }
    }
  };

  return (
    <button onClick={handleClick} className="bg-[#FEE2E2] rounded-lg  p-2" disabled={isLoading}>
      <RiDeleteBin6Line className="text-xl text-[#EF4444] font-bold leading-none cursor-pointer" />
    </button>
  );
}
