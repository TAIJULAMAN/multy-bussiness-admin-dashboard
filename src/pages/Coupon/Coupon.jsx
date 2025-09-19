import React from "react";
import {
  ConfigProvider,
  Modal,
  Table,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Spin,
} from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";

import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

import PageHeading from "../../Components/Shared/PageHeading";
import Loader from "../../Components/Shared/Loaders/Loader";

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
  const { Option } = Select;

  const { data, isLoading } = useGet_all_couponQuery({ page });
  const [addCoupon, { isLoading: isAddingCoupon }] = useAdd_couponMutation();
  const [updateCoupon, { isLoading: isUpdatingCoupon }] =
    useUpdate_couponMutation();
  const [deleteCoupon, { isLoading: isDeletingCoupon }] =
    useDelete_couponMutation();

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

  const handleAdd = () => {
    setIsModalOpen(true);
    setEditingRecord(null);
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

  const handleDeleteAdmin = async (record) => {
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
      } catch (error) {
        Swal.fire(
          "Error!",
          error?.data?.message || error?.message || "Failed to delete coupon",
          "error"
        );
      }
    }
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAdmin(record);
            }}
            className="bg-[#FEE2E2] rounded-lg  p-2"
          >
            <RiDeleteBin6Line className="text-xl text-[#EF4444] font-bold leading-none cursor-pointer" />
          </button>
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
          onClick={handleAdd}
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

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingRecord(null);
        }}
        footer={false}
        width={700}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-[#000000] mb-5 mt-10 text-center ">
            {editingRecord ? "Edit Coupon" : "Add New Coupon"}
          </h1>
          <p className="text-gray-500 text-sm text-center mb-5">
            {" "}
            {editingRecord
              ? "Update your existing coupon details below."
              : "Create a new promotional coupon to offer discounts and boost engagement."}
          </p>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: "Active",
          }}
        >
          <Form.Item
            label="Coupon Code"
            name="code"
            rules={[{ required: true, message: "Please enter coupon code" }]}
          >
            <Input placeholder="Enter coupon code" />
          </Form.Item>

          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please enter reason" }]}
          >
            <Input.TextArea placeholder="Enter reason for coupon" rows={2} />
          </Form.Item>

          <Form.Item
            label="Discount (%)"
            name="discount"
            rules={[{ required: true, message: "Please enter discount" }]}
          >
            <Input
              type="number"
              placeholder="Enter discount percentage"
              addonAfter="%"
            />
          </Form.Item>

          <div className="flex gap-2 w-full">
            <Form.Item
              name="validFrom"
              label="Valid From"
              rules={[
                { required: true, message: "Please select valid from date" },
              ]}
              className="!w-1/2"
            >
              <DatePicker placeholder="Select valid from date" />
            </Form.Item>

            <Form.Item
              name="validTo"
              label="Valid To"
              rules={[
                { required: true, message: "Please select valid to date" },
              ]}
              className="!w-1/2"
            >
              <DatePicker placeholder="Select valid to date" />
            </Form.Item>
          </div>

          <Form.Item
            label="Usage Limit"
            name="useLimit"
            tooltip="Maximum number of times this coupon can be used. Leave empty for unlimited uses."
          >
            <Input
              type="number"
              min="1"
              placeholder="Leave empty for unlimited"
            />
          </Form.Item>

          <Form.Item
            name="subscriberOnly"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>Subscriber Only</Checkbox>
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select placeholder="Select status" allowClear>
              <Option value="Active">Active</Option>
              <Option value="Expired">Expired</Option>
            </Select>
          </Form.Item>
        </Form>
        <div className="flex gap-2 mt-5 w-full">
          <button
            onClick={() => {
              setIsModalOpen(false);
              form.resetFields();
              setEditingRecord(null);
            }}
            className="bg-[#FEF2F2] rounded  py-3 w-1/2  !text-[#EF4444] border-[1px] border-[#EF4444]"
            disabled={isAddingCoupon || isUpdatingCoupon}
          >
            Cancel
          </button>
          <button
            onClick={() => form.submit()}
            className="bg-[#0091FF] !text-white rounded  py-3 w-1/2 disabled:opacity-50"
            disabled={isAddingCoupon || isUpdatingCoupon}
          >
            {isAddingCoupon || isUpdatingCoupon ? (
              <div className="flex items-center justify-center gap-2">
                <Spin size="small" />
                {editingRecord ? "Updating..." : "Adding..."}
              </div>
            ) : editingRecord ? (
              "Update"
            ) : (
              "Add"
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Coupon;
