import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import { Modal } from "antd";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { useCreateLocationMutation, useDeleteLocationMutation, useGetAllLocationQuery, useUpdateLocationMutation } from "../../redux/api/locationApi";
import Cities from "./City";
import Swal from "sweetalert2";
import { useCreateCityMutation } from "../../redux/api/cityApi";

export default function Location() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [locationName, setLocationName] = useState("Hodh El Gharbi");
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cities, setCities] = useState([""]);
  const [formErrors, setFormErrors] = useState({});

  // get all locations
  const { data: locationsData, isLoading: locationLoading } = useGetAllLocationQuery();
  console.log("locationsData", locationsData?.data);

  // delete location
  const [deleteLocation] = useDeleteLocationMutation()
  const handleDeleteAdmin = async (location) => {
    try {
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete ${location?.name}`,
        icon: 'warning',
        confirmButtonColor: '#14803c',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (!confirmResult.isConfirmed) {
        return;
      }
      const passwordResult = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: 999,
          autocapitalize: 'off',
          autocorrect: 'off',
        },
        showCancelButton: true,
        confirmButtonColor: '#14803c',
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to enter your password!';
          }
        },
      });

      if (!passwordResult.isConfirmed) {
        return;
      }

      const password = passwordResult.value;

      const id = location?._id;
      const data = {
        name: location?.name,
        password,
      };

      const result = await deleteLocation({ data, _id: id }).unwrap();
      // console.log(result?.success);
      if (result?.success) {
        console.log(result?.success);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: result?.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.data?.message || 'Failed to delete location',
      });
    }
  };
  // update location
  const [updateLocation] = useUpdateLocationMutation()
  const handleUpdateLocation = async () => {
    try {
      if (!locationName.trim()) {
        return Swal.fire({
          title: 'Error',
          text: 'Location name is required',
          icon: 'error',
          confirmButtonColor: '#14803c'
        });
      }

      await updateLocation({
        _id: selectedLocation?._id,
        data: {
          name: locationName.trim()
        }
      }).unwrap();

      setUpdateModalOpen(false);
      setLocationName("");
      setSelectedLocation(null);

      Swal.fire({
        title: 'Success',
        text: 'Location updated successfully',
        icon: 'success',
        confirmButtonColor: '#14803c'
      });
    } catch (error) {
      console.error('Failed to update location:', error);
      Swal.fire({
        title: 'Error',
        text: error.data?.message || 'Failed to update location',
        icon: 'error',
        confirmButtonColor: '#14803c'
      });
    }
  };
  const openUpdateModal = (location) => {
    setSelectedLocation(location);
    setLocationName(location.name);
    setUpdateModalOpen(true);
  };
  // create location and city
  const [createLocation] = useCreateLocationMutation();
  const [createCity] = useCreateCityMutation();

  const handleAddCity = () => {
    setCities([...cities, ""]);
  };

  const handleRemoveCity = (index) => {
    const newCities = cities.filter((_, i) => i !== index);
    setCities(newCities);
  };

  const handleCityChange = (index, value) => {
    const newCities = [...cities];
    newCities[index] = value;
    setCities(newCities);
  };

  const handleCreateLocation = async () => {
    try {
      // Validate inputs
      const errors = {};
      if (!locationName.trim()) {
        errors.location = "Location name is required";
      }
      const validCities = cities.filter(city => city.trim());
      if (validCities.length === 0) {
        errors.cities = "At least one city is required";
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      // Create location first
      const locationResponse = await createLocation({
        name: locationName.trim()
      }).unwrap();

      // Create cities
      const cityPromises = validCities.map(cityName =>
        createCity({
          name: cityName.trim(),
          division: locationResponse.data._id
        }).unwrap()
      );

      await Promise.all(cityPromises);

      // Reset form
      setAddModalOpen(false);
      setLocationName("");
      setCities([""]);
      setFormErrors({});

      Swal.fire({
        title: 'Success',
        text: 'Location and cities created successfully',
        icon: 'success',
        confirmButtonColor: '#14803c'
      });
    } catch (error) {
      console.error('Failed to create location:', error);
      Swal.fire({
        title: 'Error',
        text: error.data?.message || 'Failed to create location and cities',
        icon: 'error',
        confirmButtonColor: '#14803c'
      });
    }
  };

  const showModal2 = () => {
    setAddModalOpen(true);
    setLocationName("");
    setCities([""]);
    setFormErrors({});
  };

  const handleCancel2 = () => {
    setAddModalOpen(false);
    setLocationName("");
    setCities([""]);
    setFormErrors({});
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <PageHeading title="Locations Management" />
        <div className="text-white">
          <button
            onClick={showModal2}
            className="flex items-center gap-2 bg-[#14803c] px-3 py-2 rounded-lg"
          >
            <GoPlus className="text-white" /> Add Location
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5">
        {locationLoading ? (
          <div className="col-span-3 text-center">Loading locations...</div>
        ) : locationsData?.data?.map((location) => (
          <div key={location?._id} className="w-[380px] min-h-[300px] h-full mx-auto border border-gray-300 rounded-lg p-4 bg-white">
            <div className="space-y-4">
              {/* Wilaya Section */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800 mb-2">Wilaya(Division)</h3>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => openUpdateModal(location)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(location)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt className="text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-green-50 text-green-700 border border-green-300">
                    {location.name}
                  </span>
                </div>
              </div>

              {/* City Section */}
              <div>
                <Cities location={location} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={updateModalOpen}
        centered
        onCancel={() => {
          setUpdateModalOpen(false);
          setLocationName("");
          setSelectedLocation(null);
        }}
        footer={null}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Update Location</h3>
            <button
              onClick={() => {
                setUpdateModalOpen(false);
                setLocationName("");
                setSelectedLocation(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <RxCross2 className="text-2xl" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Location Name"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => {
                setUpdateModalOpen(false);
                setLocationName("");
                setSelectedLocation(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateLocation}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={addModalOpen}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Add New Location</h2>
              <p className="text-gray-600">
                Add a new Wilaya and its cities. All fields are required.
              </p>
            </div>
          </div>

          {/* Location Name Input */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">Wilaya Name</label>
            <input
              type="text"
              placeholder="Enter Location Name"
              className={`w-full border ${formErrors.location ? 'border-red-500' : 'border-gray-300'} rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500`}
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
            {formErrors.location && (
              <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
            )}
          </div>

          {/* Cities Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Cities</h3>
              <button
                onClick={handleAddCity}
                className="p-2 text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                <GoPlus className="h-5 w-5" />
                <span>Add City</span>
              </button>
            </div>
            {formErrors.cities && (
              <p className="text-red-500 text-sm">{formErrors.cities}</p>
            )}
            {cities.map((city, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Enter City Name ${index + 1}`}
                  className="flex-1 border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={city}
                  onChange={(e) => handleCityChange(index, e.target.value)}
                />
                {cities.length > 1 && (
                  <button
                    onClick={() => handleRemoveCity(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <RxCross2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleCancel2}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateLocation}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
