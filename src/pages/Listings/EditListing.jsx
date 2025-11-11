import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  message,
  Image,
  Select,
} from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useUpdateListingDetailsMutation } from "../../redux/api/listingApi";
import { useGetAllCategoryListQuery } from "../../redux/api/categoryApi";
import { getImageBaseUrl } from "../../config/envConfig";
import Swal from "sweetalert2";
import JoditComponent from "../../Components/Shared/JoditComponent";


import { Country, State, City }  from "country-state-city";
console.log(Country.getAllCountries())
console.log(State.getAllStates())
console.log(City.getAllCities())

const extractFileName = (path) => {
  if (!path) return null;
  try {
    const url = typeof path === "string" ? path : "";
    const idx = url.lastIndexOf("/");
    return idx >= 0 ? url.substring(idx + 1) : url;
  } catch (e) {
    return path;
  }
};

const priceToRange = (val) => {
  if (val == null) return "";
  const n = Number(val);
  if (!Number.isNaN(n)) {
    if (n < 50000) return "under $50k";
    if (n < 100000) return "$50k-$100k";
    if (n < 250000) return "$100k-$250k";
    if (n < 500000) return "$250k-$500k";
    if (n < 1000000) return "$500k-$1m";
    return "over $1m";
  }
  const s = String(val).trim();
  const options = [
    "under $50k",
    "$50k-$100k",
    "$100k-$250k",
    "$250k-$500k",
    "$500k-$1m",
    "over $1m",
  ];
  return options.includes(s) ? s : s;
};

const htmlToPlainText = (html) => {
  if (!html || typeof window === "undefined") return "";
  try {
    const div = document.createElement("div");
    // Replace <br> with newlines so they are preserved in text
    const normalized = String(html).replace(/<br\s*\/?>/gi, "\n");
    div.innerHTML = normalized;
    const text = div.textContent || div.innerText || "";
    // Collapse excessive whitespace
    return text.replace(/\s+/g, " ").trim();
  } catch {
    return String(html);
  }
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [currentImages, setCurrentImages] = useState([]);
  const [descriptionContent, setDescriptionContent] = useState("");

  const listingData = location.state?.listing;
  console.log("listingData from edit listing", listingData);

  const [updateListingDetails, { isLoading }] =
    useUpdateListingDetailsMutation();

  const { data: categoriesResp, isLoading: isLoadingCategories } =
    useGetAllCategoryListQuery();
  const rawCategories = Array.isArray(categoriesResp?.data)
    ? categoriesResp.data
    : Array.isArray(categoriesResp)
    ? categoriesResp
    : [];

  const categoryOptions = rawCategories.map((c, idx) => {
    const name =
      c?.categoryName || c?.name || c?.title || `Category ${idx + 1}`;
    return { label: name, value: name };
  });
  const watchedCategory = Form.useWatch("category", form);
  const selectedCategoryName = watchedCategory || listingData?.category;
  const selectedCategory = rawCategories.find(
    (c) => (c?.categoryName || c?.name || c?.title) === selectedCategoryName
  );
  const subCategoryOptions = (
    Array.isArray(selectedCategory?.subCategories)
      ? selectedCategory.subCategories
      : []
  ).map((s, idx) => {
    const name =
      s?.subCategoryName || s?.name || s?.title || `Sub Category ${idx + 1}`;
    return { label: name, value: name };
  });

  useEffect(() => {
    const current = form.getFieldValue("subCategory");
    const valid = subCategoryOptions.some((opt) => opt.value === current);
    if (!valid) {
      form.setFieldsValue({ subCategory: undefined });
    }
  }, [selectedCategoryName, subCategoryOptions, form]);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // Country/State/City cascading dropdowns
  const [countries] = useState(() => Country.getAllCountries());
  const [countryCode, setCountryCode] = useState();
  const [states, setStates] = useState([]);
  const [stateCode, setStateCode] = useState();
  const [cities, setCities] = useState([]);

  // Initialize from existing listing data
  useEffect(() => {
    if (!listingData) return;
    const existingCountryName = listingData?.countryName;
    if (existingCountryName) {
      const c = countries.find((x) => x.name === existingCountryName);
      if (c?.isoCode) {
        setCountryCode(c.isoCode);
        const st = State.getStatesOfCountry(c.isoCode) || [];
        setStates(st);
        const existingStateName = listingData?.state;
        if (existingStateName) {
          const s = st.find((x) => x.name === existingStateName);
          if (s?.isoCode) {
            setStateCode(s.isoCode);
            const ct = City.getCitiesOfState(c.isoCode, s.isoCode) || [];
            setCities(ct);
          }
        }
      }
    }
  }, [listingData, countries]);

  // When country changes, load states and reset dependent fields
  useEffect(() => {
    if (!countryCode) {
      setStates([]);
      setStateCode(undefined);
      setCities([]);
      return;
    }
    const st = State.getStatesOfCountry(countryCode) || [];
    setStates(st);
    setStateCode(undefined);
    setCities([]);
  }, [countryCode]);

  // When state changes, load cities
  useEffect(() => {
    if (!countryCode || !stateCode) {
      setCities([]);
      return;
    }
    const ct = City.getCitiesOfState(countryCode, stateCode) || [];
    setCities(ct);
  }, [countryCode, stateCode]);

  const handleCountryChange = (countryName) => {
    form.setFieldsValue({ countryName, state: undefined, city: undefined });
    const c = countries.find((x) => x.name === countryName);
    setCountryCode(c?.isoCode);
  };

  const handleStateChange = (stateName) => {
    form.setFieldsValue({ state: stateName, city: undefined });
    const s = states.find((x) => x.name === stateName);
    setStateCode(s?.isoCode);
  };

  const handleCityChange = (cityName) => {
    form.setFieldsValue({ city: cityName });
  };

  useEffect(() => {
    if (listingData) {
      form.setFieldsValue({
        title: listingData?.title || "",
        category: listingData?.category || "",
        subCategory: listingData?.subCategory || "",
        businessType: listingData?.businessType || "",
        ownerShipType: listingData?.ownerShipType || "No OwnerShip Type",
        askingPrice: priceToRange(listingData?.askingPrice),
        price: listingData?.price || 0,
        countryName: listingData?.countryName || "",
        state: listingData?.state || "",
        city: listingData?.city || "",
        reason: listingData?.reason || "",
        business_image: listingData.data?.image || "",
        description: listingData?.description || "",
        image: listingData?.image || "",
      });
      setDescriptionContent(listingData?.description || "");
      if (listingData?.image) {
        setFileList([
          {
            uid: "-1",
            name: extractFileName(listingData?.image) || "current-image",
            status: "done",
            url: `${getImageBaseUrl()}/business-image/${listingData?.image}`,
          },
        ]);
      } else {
        setFileList([]);
      }
    } else {
      message.error("No listing data found. Please select a listing to edit.");
      navigate("/listing-management");
    }
  }, [form, navigate, listingData]);

  const onFinish = async (values) => {
    try {
      const newFile = Array.isArray(fileList)
        ? fileList[0]?.originFileObj
        : undefined;

      if (newFile) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("category", values.category);
        formData.append("reason", values.reason);
        formData.append("subCategory", values.subCategory ?? "");
        formData.append("state", values.state ?? "");
        formData.append("city", values.city ?? "");
        formData.append("countryName", values.countryName ?? "");
        formData.append("askingPrice", String(values.askingPrice ?? ""));
        formData.append("price", String(values.price ?? ""));
        formData.append("ownerShipType", values.ownerShipType ?? "");
        formData.append("businessType", values.businessType ?? "");
        formData.append("description", values.description ?? "");
        formData.append("business-image", newFile);

        await updateListingDetails({
          businessId: listingData._id,
          user: listingData?.user?._id,
          data: formData,
        }).unwrap();
      } else {
        // Prepare JSON update with existing filename
        const businessImageFromUI = extractFileName(
          (Array.isArray(currentImages) ? currentImages[0] : currentImages) ||
            values.image
        );
        const updateData = {
          title: values.title,
          category: values.category,
          image: businessImageFromUI || values.image || "",
          reason: values.reason,
          subCategory: values.subCategory,
          state: values.state,
          city: values.city,
          countryName: values.countryName,
          askingPrice: values.askingPrice,
          price: values.price,
          ownerShipType: values.ownerShipType,
          businessType: values.businessType,
          description: values.description,
        };

        await updateListingDetails({
          businessId: listingData._id,
          user: listingData?.user?._id,
          data: updateData,
        }).unwrap();
      }

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Listing updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Navigate back to listings
      navigate("/listing-management");
    } catch (error) {
      console.error("Error updating listing:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error?.data?.message || "Failed to update listing. Please try again.",
        confirmButtonColor: "#0091FF",
      });
    }
  };

  const handleRemove = (file) => {
    return true;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Listing</h1>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        <div className="mt-2">
          <img
            src={
              (listingData?.image &&
                `${getImageBaseUrl()}/business-image/${listingData.image}`) ||
              "default-image.jpg"
            }
            width={80}
            height={80}
            alt="current Product Image"
            className="bg-slate-100 border cursor-pointer"
          />
        </div>

        <Form
          form={form}
          name="editListing"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="space-y-6"
        >
          {/* Image Upload Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Upload New Images
            </h3>
            <Upload
              // do not auto-upload; we submit via onFinish
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              onRemove={handleRemove}
              multiple={false}
              maxCount={1}
              accept="image/*"
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <p className="text-sm text-gray-500 mt-2">
              Upload one image. Recommended size: 800x800px.
            </p>
          </div>

          {previewImage && (
            <Image
              width={200}
              style={{ display: "none" }}
              src={previewImage}
              preview={{
                visible: previewOpen,
                title: previewTitle,
                onVisibleChange: (visible) => !visible && setPreviewOpen(false),
              }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input the listing title!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter listing name" />
              </Form.Item>

              <Form.Item
                label="Price ($)"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input the price!",
                  },
                ]}
              >
                <InputNumber size="large" min={0} addonBefore="$" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please select a category!",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder={
                    isLoadingCategories
                      ? "Loading categories..."
                      : "Select category"
                  }
                  options={categoryOptions}
                  loading={isLoadingCategories}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              <Form.Item label="Sub Category" name="subCategory">
                <Select
                  size="large"
                  placeholder={"Select sub category"}
                  options={subCategoryOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              <Form.Item label="Business Type" name="businessType">
                <Input size="large" placeholder="Enter business type" />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Form.Item label="Ownership Type" name="ownerShipType">
                <Input size="large" placeholder="Enter ownership type" />
              </Form.Item>

              <Form.Item
                label="Asking Price"
                name="askingPrice"
                rules={[
                  { required: true, message: "Please select a price range" },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select price range"
                  options={[
                    { label: "under $50k", value: "under $50k" },
                    { label: "$50k-$100k", value: "$50k-$100k" },
                    { label: "$100k-$250k", value: "$100k-$250k" },
                    { label: "$250k-$500k", value: "$250k-$500k" },
                    { label: "$500k-$1m", value: "$500k-$1m" },
                    { label: "over $1m", value: "over $1m" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Country Name" name="countryName">
                <Select
                  size="large"
                  placeholder="Select country"
                  showSearch
                  optionFilterProp="label"
                  onChange={handleCountryChange}
                  options={(countries || []).map((c) => ({ label: c.name, value: c.name }))}
                />
              </Form.Item>

              <Form.Item label="State" name="state">
                <Select
                  size="large"
                  placeholder={countryCode ? "Select state" : "Select country first"}
                  showSearch
                  optionFilterProp="label"
                  onChange={handleStateChange}
                  disabled={!countryCode}
                  options={(states || []).map((s) => ({ label: s.name, value: s.name }))}
                />
              </Form.Item>

              <Form.Item label="City" name="city">
                <Select
                  size="large"
                  placeholder={stateCode ? "Select city" : "Select state first"}
                  showSearch
                  optionFilterProp="label"
                  onChange={handleCityChange}
                  disabled={!stateCode}
                  options={(cities || []).map((c) => ({ label: c.name, value: c.name }))}
                />
              </Form.Item>

              <Form.Item label="Reason" name="reason">
                <Input size="large" placeholder="Enter selling reason" />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the description!",
              },
            ]}
          >
            <JoditComponent
              content={descriptionContent}
              setContent={(c) => {
                setDescriptionContent(c);
                form.setFieldsValue({ description: c });
              }}
            />
          </Form.Item>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 gap-5">
            <Button onClick={() => navigate(-1)} className="px-6" size="large">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="px-6"
              size="large"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditListing;
