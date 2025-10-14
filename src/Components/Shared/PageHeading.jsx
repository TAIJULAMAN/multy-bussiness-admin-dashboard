import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function PageHeading({ title }) {
  return (
    <div className="flex !items-center  justify-between">
      <Link to={-1}>
        <h1 className="font-semibold text-xl flex items-center justify-start gap-2">
          <FaArrowLeftLong /> {title}
        </h1>
      </Link>
    </div>
  );
}
