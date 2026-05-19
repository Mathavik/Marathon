import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

interface HeroData {
  title: string;
  subtitle: string;
  event_date: string;
  location: string;
  background_image: File | string | null;
  primary_button: string;
}

const AdminHeroSection = () => {
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState<HeroData>({
    title: "",
    subtitle: "",
    event_date: "",
    location: "",
    background_image: null,
    primary_button: "",
  });

  // FETCH HERO DATA
  useEffect(() => {
    fetchHeroSection();
  }, []);

  const fetchHeroSection = async () => {
    try {
      const response = await axiosInstance.get(
        "/hero-section"
      );

      if (response.data.data) {

        const hero = response.data.data;

        setFormData({
          title: hero.title || "",
          subtitle: hero.subtitle || "",
          event_date: hero.event_date
            ? hero.event_date.slice(0, 16)
            : "",
          location: hero.location || "",
          background_image: hero.background_image || "",
          primary_button: hero.primary_button || "",
        });

        // IMAGE PREVIEW
        setPreviewImage(hero.background_image || "");
      }

    } catch (error) {
      console.log(error);
    }
  };

  // TEXT INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE CHANGE
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (e.target.files && e.target.files[0]) {

      const file = e.target.files[0];

      setFormData({
        ...formData,
        background_image: file,
      });

      // LOCAL PREVIEW
      setPreviewImage(
        URL.createObjectURL(file)
      );
    }
  };

  // SUBMIT FORM
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("event_date", formData.event_date);
      data.append("location", formData.location);
      data.append(
        "primary_button",
        formData.primary_button
      );

      // IMAGE
      if (
        formData.background_image instanceof File
      ) {

        data.append(
          "background_image",
          formData.background_image
        );
      }

      await axiosInstance.post(
        "/hero-section",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Hero Section Saved Successfully"
      );

      fetchHeroSection();

    } catch (error) {

      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-black mb-8 text-center text-orange-500">
          Hero Section Admin Panel
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-black"
        >

          {/* TITLE */}
          <div>
            <label className="block mb-2 font-semibold">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="block mb-2 font-semibold">
              Subtitle
            </label>

            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* EVENT DATE */}
          <div>
            <label className="block mb-2 font-semibold">
              Event Date
            </label>

            <input
              type="datetime-local"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block mb-2 font-semibold">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-2 font-semibold">
              Background Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-xl p-4"
            />

            {/* IMAGE PREVIEW */}
            {previewImage && (
              <div className="mt-4 border-2 border-dashed border-orange-300 rounded-2xl p-4 bg-orange-50">

                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded-xl"
                />

              </div>
            )}
          </div>

          {/* BUTTON */}
          <div>
            <label className="block mb-2 font-semibold">
              Primary Button
            </label>

            <input
              type="text"
              name="primary_button"
              value={formData.primary_button}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-all duration-300"
          >
            Save Hero Section
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminHeroSection;