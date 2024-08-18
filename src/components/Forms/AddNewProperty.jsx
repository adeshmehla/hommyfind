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
    <div className={`w-70 m-auto modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
        <form onSubmit={handleSubmit}>
          <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Add Property</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Property Name
              <input
                type="text"
                name="property_name"
                value={formData.property_name}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </label>
            
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Property Address
              <input
                type="text"
                name="property_address"
                value={formData.property_address}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              City
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </label>
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              State
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </label>
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Currency
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Property Size
              <input
                type="text"
                name="property_size"
                value={formData.property_size}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Category
              <div style={{ display: "flex", gap: "10px" }}>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="residential"
                    checked={formData.category === "residential"}
                    onChange={handleRadioChange}
                    style={{ marginRight: "5px" }}
                  />
                  Residential
                </label>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="commercial"
                    checked={formData.category === "commercial"}
                    onChange={handleRadioChange}
                    style={{ marginRight: "5px" }}
                  />
                  Commercial
                </label>
              </div>
            </label>

            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Property Type
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleInputChange}
                required
                style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd" }}
              >
                {propertyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd", resize: "none" }}
              />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Upload Location Image
              <input
                type="file"
                onChange={handleUploadLocationImage}
                accept="image/*"
                style={{ width: "60%" }}
              />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Upload Amenities Image
              <input
                type="file"
                onChange={(e) => handleUploadAmenitiesImage(0, e)}
                accept="image/*"
                style={{ width: "60%" }}
              />
            </label>

            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Upload Multiple Images
              <input
                type="file"
                multiple
                onChange={handleMultipleImageUpload}
                accept="image/*"
                style={{ width: "60%" }}
              />
            </label>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
              <button type="button" onClick={handleAddAmenities} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd", backgroundColor: "#f5f5f5" }}>
                Add Amenities
              </button>

              {formData.amenities.map((amenitie, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Amenity Name
                    <input
                      type="text"
                      name="feature_name"
                      value={amenitie.feature_name}
                      onChange={(e) => handleAmenitiesChange(index, e)}
                      style={{ padding: "8px", width: "60%", borderRadius: "4px", border: "1px solid #ddd" }}
                    />
                  </label>

                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Upload Amenity Image
                    <input
                      type="file"
                      onChange={(e) => handleUploadAmenitiesImage(index, e)}
                      accept="image/*"
                      style={{ width: "60%" }}
                    />
                  </label>

                  <button type="button" onClick={() => handleRemoveAmenities(index)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd", backgroundColor: "#f5f5f5" }}>
                    Remove Amenity
                  </button>
                </div>
              ))}
            </div>
            
            <button type="submit" style={{ padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#007bff", color: "#fff", marginTop: "20px" }}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default AddEditPropertyModel;
