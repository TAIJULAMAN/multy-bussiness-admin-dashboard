import { Link } from "react-router";
import { getImageBaseUrl } from "../../config/envConfig";

export default function ProfileMini({ image, name, role }) {
  const src = image
    ? `${getImageBaseUrl()}/profile-image/${image}`
    : "https://avatar.iran.liara.run/public/23";

  return (
    <Link to="/profile" className="flex items-center gap-2">
      <img
        src={src}
        className="w-10 h-10 object-cover rounded-full"
        alt="User Avatar"
      />
      <div className="hidden md:flex flex-col items-start">
        <h3 className="text-gray-800 text-sm">{name}</h3>
        <p className="text-xs px-2 py-1 bg-[#cce9ff] text-[#0091FF] rounded">
          {role}
        </p>
      </div>
    </Link>
  );
}
