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
      const response = await axiosInstance.get(
        "/marathon-category"
      );

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

        // IMAGE PREVIEW
        setPreviewImage(
          `http://127.0.0.1:8000/${data.image}`
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // IMAGE CHANGE
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (file) {

      // SAVE FILE
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // IMAGE PREVIEW
      const imageUrl = URL.createObjectURL(file);

      setPreviewImage(imageUrl);
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

      // IMAGE
      if (formData.image) {
        payload.append("image", formData.image);
      }

      const response = await axiosInstance.post(
        "/marathon-category",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Marathon Category Saved Successfully",
      });

      fetchMarathonCategory();

    } catch (error: any) {

      console.error(error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-4xl font-black mb-8 text-center text-black">
          Admin Marathon Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-black"
        >

          {/* TITLE */}
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

          {/* SUBTITLE */}
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

          {/* EVENT TIME */}
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

          {/* REGISTRATION FEE */}
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

          {/* ROUTE */}
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

          {/* IMAGE */}
          <div>
            <label className="font-semibold block mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.avif"
              onChange={handleImageChange}
              className="w-full border p-4 rounded-xl"
            />
          </div>

          {/* IMAGE PREVIEW */}
          {previewImage && (
            <div>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-[300px] object-cover rounded-2xl border"
              />
            </div>
          )}

          {/* BUTTON */}
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