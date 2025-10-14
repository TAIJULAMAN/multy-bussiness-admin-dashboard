import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDelete_formationMutation } from "../../redux/api/formationApi";

export default function DeleteFormationButton({ formation, className = "p-2 text-red-500 hover:text-red-700" }) {
  const [deleteFormation, { isLoading }] = useDelete_formationMutation();

  const onClick = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${formation.title}" formation. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deleteFormation({ formatId: formation._id }).unwrap();
          return true;
        } catch (error) {
          Swal.showValidationMessage(`Delete failed: ${error?.data?.message || "Please try again"}`);
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Formation has been deleted successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <button onClick={onClick} className={className} disabled={isLoading}>
      <FaTrashAlt size={18} className="text-red-500" />
    </button>
  );
}
