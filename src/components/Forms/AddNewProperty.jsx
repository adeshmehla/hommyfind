import React, { useState } from "react";
import axios from "axios";

export const AddEditPropertyModel = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [isImagesUploaded, setIsImagesUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);

  const updatePropertyTypeOptions = (propertyType) => {
    if (propertyType === "residential") {
      setPropertyTypeOptions([
        { value: "villa", label: "Villa" },
        { value: "townhouse", label: "Townhouse" },
        { value: "villa_compound", label: "Villa Compound" },
        { value: "residential_plot", label: "Residential Plot" },
        { value: "residential_floor", label: "Residential Floor" },
      ]);
    } else if (propertyType === "commercial") {
      setPropertyTypeOptions([
        { value: "residential_building", label: "Residential Building" },
        { value: "pent_house", label: "Pent House" },
        { value: "hotel_apartment", label: "Hotel Apartment" },
        { value: "apartment", label: "Apartment" },
        { value: "other_residential", label: "Other Residential" },
      ]);
    } else {
      setPropertyTypeOptions([]);
    }
  };

  const handleUploadLocationImage = async (index, e) => {
    const file = e.target.files[0];
    const validImageTypes = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];

    if (!validImageTypes.includes(file.type)) {
      alert("Invalid image type");
      return;
    }

    const imageData = new FormData();
    imageData.append("files", file);

    try {
      const response = await axios.post(
        "https://admin.gulfin.ai/api/upload",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Image upload failed");
      }

      const result = response.data;
      const imageUrl = result[0].id;

    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleUploadAmenitiesImage = async (index, e) => {
    const file = e.target.files[0];
    const validImageTypes = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];

    if (!validImageTypes.includes(file.type)) {
      alert("Invalid image type");
      return;
    }

    const imageData = new FormData();
    imageData.append("files", file);

    try {
      const response = await axios.post(
        "https://admin.gulfin.ai/api/upload",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Image upload failed");
      }

      const result = response.data;
      const imageUrl = result[0].id;

      const updatedAmenities = formData.amenities.map((amenitie, i) =>
        i === index ? { ...amenitie, feature_img: imageUrl } : amenitie
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        amenities: updatedAmenities,
      }));
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const [formData, setFormData] = useState({
    property_name: "",
    property_address: "",
    listing_size_unit: "",
    property_size: "",
    city: "",
    state: "",
    currency: "",
    propertyType: "",
    description: "",
    number_of_beds: "",
    property_type: "",
    furniture: "",
    category: "",
    property_price: "",
    status: "",
    rating: null,
    latitude: null,
    longitude: null,
    image: null,
    amenities: [
      {
        feature_name: "",
        feature_img: null,
      },
    ],
    other_images: [],
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleAmenitiesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAmenities = formData.amenities.map((amenitie, i) =>
      i === index ? { ...amenitie, [name]: value } : amenitie
    );
    setFormData({
      ...formData,
      amenities: updatedAmenities,
    });
  };

  const handleAddAmenities = () => {
    setFormData({
      ...formData,
      amenities: [
        ...formData.amenities,
        {
          feature_name: "",
          feature_img: null,
        },
      ],
    });
  };

  const handleRemoveAmenities = (index) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      amenities: updatedAmenities,
    });
  };

  const handleMultipleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    const imageIds = [];
    const imageBlobs = [];

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const typeOfImage = file.type.startsWith("image/");
      if (!typeOfImage) continue;

      const imageBlob = URL.createObjectURL(file);
      imageBlobs.push(imageBlob);

      const imageData = new FormData();
      imageData.append("files", file);

      try {
        const response = await axios.post(
          `https://admin.gulfin.ai/api/upload`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Image upload failed");
        }

        const result = response.data;
        const imageId = result[0].id;
        imageIds.push(imageId);
      } catch (error) {
        console.error("Image upload error:", error);
        break;
      }
    }

    setUploading(false);
    setFormData({
      ...formData,
      other_images: imageIds,
    });

    setUploadCount((prevCount) => prevCount + files.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onSubmit(formData);
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  return (
<div className={`w-[70%] absolute m-auto modal ${isOpen ? "is-active" : ""}`}>
  <div className="modal-background" onClick={onClose}></div>
  <div className="modal-content bg-white p-8 rounded-lg shadow-lg relative">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
    >
      &times;
    </button>
    <form onSubmit={handleSubmit}>
      <h3 className="text-3xl font-semibold mb-6 text-center">Add Property</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
        <label className="block">
          Property Name
          <input
            type="text"
            name="property_name"
            value={formData.property_name}
            onChange={handleInputChange}
            required
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </label>
        <label className="block">
          Property Address
          <input
            type="text"
            name="property_address"
            value={formData.property_address}
            onChange={handleInputChange}
            required
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </label>
        <label className="block">
          City
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </label>
        <label className="block">
          State
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </label>
        <label className="block">
          Currency
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            required
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </label>
        <label className="block">
          Property Size
          <input
            type="text"
            name="property_size"
            value={formData.property_size}
            onChange={handleInputChange}
            required
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
          <label className="block mb-2">Category</label>
          {/* <div className="flex space-x-4"> */}
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="residential"
                checked={formData.category === "residential"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Residential
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="commercial"
                checked={formData.category === "commercial"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Commercial
            </label>
          </div>
          {/* </div> */}
        <label className="block col-span-2">
          Property Type
          <select
            name="property_type"
            value={formData.property_type}
            onChange={handleInputChange}
            required
            className="mt-1 p-3 border border-gray-300 rounded w-full"
            >
            {propertyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block col-span-2">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded w-full h-24 resize-none"
          />
        </label>

        <label className="block col-span-2">
          Upload Property Images
          <input
            type="file"
            multiple
            onChange={handleMultipleImageUpload}
            accept="image/*"
            className="mt-1 w-full"
          />
        </label>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        {formData.amenities.map((amenity, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-9">
            <label className="block">
              Amenity Name
              <input
                type="text"
                name="feature_name"
                value={amenity.feature_name}
                onChange={(e) => handleAmenitiesChange(index, e)}
                className="mt-1 p-3 border border-gray-300 rounded w-full"
              />
            </label>
            <label className="block">
              Upload Amenity Image
              <input
                type="file"
                onChange={(e) => handleUploadAmenitiesImage(index, e)}
                accept="image/*"
                className="mt-1 w-full"
              />
            </label>
            <button
      onClick={() => handleRemoveAmenities(index)}
      className="top-4 right-4 text-red-500 hover:text-gray-700 text-3xl"
    >
      &times;
    </button>
    

            {/* <button
              type="button"
              onClick={() => handleRemoveAmenities(index)}
              className="py-3 bg-gray-200 text-gray-700 rounded mt-2 col-span-2"
            >
              Remove Amenity
            </button> */}
            
          </div>
        ))}
      <button
          type="button"
          onClick={handleAddAmenities}
          className="py-3 bg-gray-200 text-gray-700 rounded"
        >
          Add Amenities
        </button>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded mt-6"
      >
        Submit
      </button>
    </form>
  </div>
  <button
    className="modal-close is-large"
    aria-label="close"
    onClick={onClose}
  ></button>
</div>

)
  
};

export default AddEditPropertyModel;
