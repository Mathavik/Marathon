import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Swal from "sweetalert2";

interface MarathonData {
  title: string;
  subtitle: string;
  event_time: string;
  registration_fee: string;
  marathon_route: string;
  image: File | null;
}

const AdminMarathonCategory = () => {
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState<MarathonData>({
    title: "",
    subtitle: "",
    event_time: "",
    registration_fee: "",
    marathon_route: "",
    image: null,
  });

  // FETCH DATA
  useEffect(() => {
    fetchMarathonCategory();
  }, []);

  const fetchMarathonCategory = async () => {
    try {
      const response = await axiosInstance.get("/marathon-category");

      const data = response.data.data;

      if (data) {
        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          event_time: data.event_time || "",
          registration_fee: data.registration_fee || "",
          marathon_route: data.marathon_route || "",
          image: null,
        });

        setPreviewImage(
          `http://127.0.0.1:8000/storage/${data.image}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // IMAGE CHANGE
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("subtitle", formData.subtitle);
      payload.append("event_time", formData.event_time);
      payload.append(
        "registration_fee",
        formData.registration_fee
      );
      payload.append(
        "marathon_route",
        formData.marathon_route
      );

      if (formData.image) {
        payload.append("image", formData.image);
      }

      await axiosInstance.post(
        "/marathon-category",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Marathon Category Saved Successfully",
      });

      fetchMarathonCategory();

    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-4xl font-black mb-8 text-center">
          Admin Marathon Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-black"
        >

          {/* Title */}
          <div>
            <label className="font-semibold block mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="10KM Marathon"
              className="w-full border p-4 rounded-xl outline-none"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="font-semibold block mb-2">
              Subtitle
            </label>

            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Run Beyond Limits"
              className="w-full border p-4 rounded-xl outline-none"
            />
          </div>

          {/* Event Time */}
          <div>
            <label className="font-semibold block mb-2">
              Event Time
            </label>

            <input
              type="text"
              name="event_time"
              value={formData.event_time}
              onChange={handleChange}
              placeholder="Morning 10:00 AM"
              className="w-full border p-4 rounded-xl outline-none"
            />
          </div>

          {/* Registration Fee */}
          <div>
            <label className="font-semibold block mb-2">
              Registration Fee
            </label>

            <input
              type="text"
              name="registration_fee"
              value={formData.registration_fee}
              onChange={handleChange}
              placeholder="1500"
              className="w-full border p-4 rounded-xl outline-none"
            />
          </div>

          {/* Marathon Route */}
          <div>
            <label className="font-semibold block mb-2">
              Marathon Route
            </label>

            <input
              type="text"
              name="marathon_route"
              value={formData.marathon_route}
              onChange={handleChange}
              placeholder="City Central Track"
              className="w-full border p-4 rounded-xl outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold block mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-4 rounded-xl"
            />
          </div>

          {/* Preview Image */}
          {previewImage && (
            <div>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-[300px] object-cover rounded-2xl"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-bold py-4 rounded-2xl"
          >
            Save Marathon Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminMarathonCategory;