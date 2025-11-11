import { Form, Pagination } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/Shared/PageHeading";
import Loader from "../../Components/Loaders/Loader";
import { useGet_all_formationQuery } from "../../redux/api/formationApi";
import { getImageBaseUrl } from "../../config/envConfig";
import { FiEdit } from "react-icons/fi";
import AddFormationModal from "../../Components/formation/AddFormationModal";
import UpdateFormationModal from "../../Components/formation/UpdateFormationModal";
import DeleteFormationButton from "../../Components/formation/DeleteFormationButton";

export default function Formation() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data: formationData, isLoading } = useGet_all_formationQuery(
    { page },
    { refetchOnMountOrArgChange: true }
  );
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [selectedFormation, setSelectedFormation] = useState(null);
  const navigate = useNavigate();
  const htmlToText = (html) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const truncate = (str = "", max = 100) =>
    str.length > max ? `${str.slice(0, max)}...` : str;
  const handleOpenUpdateModal = (formation) => {
    setSelectedFormation(formation);
    updateForm.setFieldsValue({
      title: formation.title,
      detail: formation.detail,
      metaTitle: formation.metaTitle,
      metaDescription: formation.metaDescription,
      metaKeywords: formation.metaKeywords || [],
    });
    setUpdateModalOpen(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageHeading title="Blog Management" />
        <div className="text-white">
          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-[#0091FF] px-6 py-3 rounded cursor-pointer"
          >
            + Add New Blog
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {formationData?.data && formationData?.data?.length > 0 ? (
          formationData?.data?.map((formation) => (
            <div
              key={formation._id}
              className="max-w-md w-full mx-auto border border-gray-300 rounded-lg p-5 bg-white"
            >
              <div className="space-y-4">
                <img
                  src={
                    formation.image
                      ? `${getImageBaseUrl()}/formation-image/${
                          formation?.image
                        }`
                      : "https://avatar.iran.liara.run/public/23"
                  }
                  alt={formation.title}
                  className="w-full h-[200px] object-cover rounded-lg bg-gray-100"
                />
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    {formation.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center text-sm text-gray-600">
                      {truncate(htmlToText(formation.detail), 100)}
                    </span>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-4">
                  <button
                    onClick={() => handleOpenUpdateModal(formation)}
                    className="p-2 text-green-600 hover:text-green-800"
                  >
                    <FiEdit size={24} className="text-[#0091FF]" />
                  </button>

                  <div className="h-6 w-px bg-gray-200"></div>

                  <button
                    onClick={() =>
                      navigate(`/formation/${formation._id}`, {
                        state: { formation },
                      })
                    }
                    className="px-3 py-1.5 text-sm rounded bg-[#0091FF] text-white hover:opacity-90"
                  >
                    View
                  </button>

                  <div className="h-6 w-px bg-gray-200"></div>

                  <DeleteFormationButton formation={formation} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-8">
            <div className="text-lg text-gray-600">No blog found</div>
          </div>
        )}
        <div className="col-span-full flex justify-center mt-6">
          <Pagination
            current={page}
            total={formationData?.meta?.total || 0}
            pageSize={formationData?.meta?.limit || 10}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
        <AddFormationModal
          open={addModalOpen}
          onCancel={() => {
            setAddModalOpen(false);
            form.resetFields();
          }}
          form={form}
          onDone={() => {
            setAddModalOpen(false);
            form.resetFields();
          }}
        />

        <UpdateFormationModal
          open={updateModalOpen}
          onCancel={() => {
            setUpdateModalOpen(false);
            updateForm.resetFields();
            setSelectedFormation(null);
          }}
          form={updateForm}
          onDone={() => {
            setUpdateModalOpen(false);
            updateForm.resetFields();
            setSelectedFormation(null);
          }}
          selectedFormation={selectedFormation}
        />
      </div>
    </>
  );
}
