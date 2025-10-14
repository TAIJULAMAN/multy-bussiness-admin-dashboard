import { ConfigProvider, Table, Form } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";

import { CiEdit } from "react-icons/ci";
import DeleteCouponButton from "../../Components/coupons/DeleteCouponButton";

import PageHeading from "../../Components/Shared/PageHeading";
import Loader from "../../Components/Loaders/Loader";
import CouponModal from "../../Components/coupons/CouponModal";

import {
  useGet_all_couponQuery,
  useAdd_couponMutation,
  useUpdate_couponMutation,
  useDelete_couponMutation,
} from "../../redux/api/couponApi";

function Coupon() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  const { data, isLoading } = useGet_all_couponQuery({ page });
  const [addCoupon, { isLoading: isAddingCoupon }] = useAdd_couponMutation();
  const [updateCoupon, { isLoading: isUpdatingCoupon }] =
    useUpdate_couponMutation();
  const [deleteCoupon] = useDelete_couponMutation();

  const dataSource =
    data?.data?.map((coupon, index) => ({
      key: coupon._id || coupon.id || index.toString(),
      no: index + 1,
      code: coupon.couponCode,
      reason: coupon.reason,
      discount: `${coupon.discount}%`,
      startDate: coupon.validFrom
        ? new Date(coupon.validFrom).toISOString().split("T")[0]
        : "",
      endDate: coupon.validTo
        ? new Date(coupon.validTo).toISOString().split("T")[0]
        : "",
      status: coupon.status,
      useLimit: coupon.usageLimit,
      currentUses: coupon.couponUsesCount || 0,
      subscriberLimit: coupon.subscriberLimit || 0,
      _id: coupon._id || coupon.id,
    })) || [];

  const onFinish = async (values) => {
    try {
      const couponData = {
        couponCode: values.code,
        reason: values.reason,
        discount: values.discount,
        validFrom: values.validFrom.format("YYYY-MM-DD"),
        validTo: values.validTo.format("YYYY-MM-DD"),
        status: values.status,
        usageLimit: values.useLimit || null,
        subscriberLimit: values.subscriberOnly ? 1 : 0,
      };

      if (editingRecord) {
        // Update existing coupon
        await updateCoupon({
          couponId: editingRecord._id,
          data: couponData,
        }).unwrap();
      } else {
        // Add new coupon
        await addCoupon(couponData).unwrap();
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingRecord(null);
      Swal.fire(
        "Success!",
        editingRecord
          ? "Coupon updated successfully"
          : "Coupon added successfully",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Error!",
        error?.data?.message || error?.message || "Failed to save coupon",
        "error"
      );
    }
  };

  const handleEdit = (record) => {
    setIsModalOpen(true);
    setEditingRecord(record);
    form.setFieldsValue({
      code: record.code,
      reason: record.reason,
      discount: parseInt(record.discount.replace("%", "")),
      validFrom: dayjs(record.startDate),
      validTo: dayjs(record.endDate),
      status: record.status,
      useLimit: record.useLimit,
    });
  };

  

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Coupon Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Uses",
      key: "uses",
      render: (_, record) => (
        <span>
          {record.currentUses || 0}/{record.useLimit || "∞"}
        </span>
      ),
    },
    {
      title: "Valid From",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Valid To",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 justify-center item-center items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record);
            }}
            className="bg-[#0091FF] rounded-lg  p-2"
          >
            <CiEdit className="text-xl text-white font-bold leading-none cursor-pointer" />
          </button>

          <DeleteCouponButton record={record} />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  const metaPage = data?.meta?.page || page || 1;
  const metaLimit = data?.meta?.limit || 10;
  const metaTotal = data?.meta?.total || data?.length || 0;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Coupon Management" />
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingRecord(null);
          }}
          className="bg-[#0091FF] !text-white px-5 py-3 rounded"
        >
          + Add New Coupon
        </button>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              colorPrimary: "#0091ff",
              colorPrimaryHover: "#0091ff",
              itemActiveBg: "#0091ff",
              itemActiveColor: "#ffffff",
              colorBgTextHover: "#0091ff",
              colorText: "#0091ff",
            },
            Table: {
              headerBg: "#0091ff",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#0091ff",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: metaLimit,
            total: metaTotal,
            current: metaPage,
            onChange: (newPage) => setPage(newPage),
          }}
        />
      </ConfigProvider>

      <CouponModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingRecord(null);
        }}
        form={form}
        editingRecord={editingRecord}
        onFinish={onFinish}
        isAddingCoupon={isAddingCoupon}
        isUpdatingCoupon={isUpdatingCoupon}
      />
    </div>
  );
}

export default Coupon;
