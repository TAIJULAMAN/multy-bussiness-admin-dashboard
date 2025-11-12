import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";
import { getImageBaseUrl } from "../../config/envConfig";

export default function FormationDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const formation = location?.state?.formation;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <PageHeading title="Blog Details" />
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Back
        </button>
      </div>

      {!formation ? (
        <div className="p-6 bg-white rounded border text-gray-700">
          Unable to load this blog detail directly. Please go back to the list and click View again.
        </div>
      ) : (
        <div className="p-6 bg-white rounded border space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">{formation.title}</h2>

          <img
            src={
              formation.image
                ? `${getImageBaseUrl()}/formation-image/${formation.image}`
                : "https://avatar.iran.liara.run/public/23"
            }
            alt={formation.title}
            className="w-full max-h-[420px] object-cover rounded"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-1200 font-semibold mb-2">Meta Title :</div>
              <div className="text-gray-800">{formation.metaTitle || "—"}</div>
            </div>
            <div>
              <div className="text-gray-1200 font-semibold mb-2">Meta Description :</div>
              <div className="text-gray-800">{formation.metaDescription || "—"}</div>
            </div>
            <div className="md:col-span-2">
              <div className="text-gray-1200 font-semibold mb-2">Meta Keywords :</div>
              <div className="text-[16px] text-black-100 font-bold">
                {Array.isArray(formation.metaKeywords) && formation.metaKeywords.length
                  ? formation.metaKeywords.join(", ")
                  : "—"}
              </div>
            </div>
          </div>

          <div>
            <div className="text-gray-900 font-semibold mb-4">Detail :</div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formation.detail || "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
