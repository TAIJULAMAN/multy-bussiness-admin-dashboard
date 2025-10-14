import { Modal, Form, Input, DatePicker, Checkbox, Select, Spin } from "antd";

const { Option } = Select;

export default function CouponModal({
  open,
  onCancel,
  form,
  editingRecord,
  onFinish,
  isAddingCoupon,
  isUpdatingCoupon,
}) {
  const isBusy = isAddingCoupon || isUpdatingCoupon;

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={false}
      width={700}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[#000000] mb-5 mt-10 text-center ">
          {editingRecord ? "Edit Coupon" : "Add New Coupon"}
        </h1>
        <p className="text-gray-500 text-sm text-center mb-5">
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

        <Form.Item name="subscriberOnly" valuePropName="checked" initialValue={false}>
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
          onClick={onCancel}
          className="bg-[#FEF2F2] rounded  py-3 w-1/2  !text-[#EF4444] border-[1px] border-[#EF4444]"
          disabled={isBusy}
        >
          Cancel
        </button>
        <button
          onClick={() => form.submit()}
          className="bg-[#0091FF] !text-white rounded  py-3 w-1/2 disabled:opacity-50"
          disabled={isBusy}
        >
          {isBusy ? (
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
  );
}
