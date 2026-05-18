
import React, { useEffect, useState } from "react";
import axios from "axios";

interface HeroData {
  title: string;
  subtitle: string;
  event_date: string;
  location: string;
  background_image: string;
  primary_button: string;
  secondary_button: string;
}

const AdminHeroSection = () => {
  const [formData, setFormData] = useState<HeroData>({
    title: "",
    subtitle: "",
    event_date: "",
    location: "",
    background_image: "",
    primary_button: "",
    secondary_button: "",
  });

  // Fetch Existing Data
  useEffect(() => {
    fetchHeroSection();
  }, []);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/hero-section"
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
          secondary_button: hero.secondary_button || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/hero-section",
        formData
      );

      alert("Hero Section Updated Successfully");
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

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <label className="block mb-2 font-semibold">
              Background Image URL
            </label>
            <input
              type="text"
              name="background_image"
              value={formData.background_image}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <label className="block mb-2 font-semibold">
                Secondary Button
              </label>
              <input
                type="text"
                name="secondary_button"
                value={formData.secondary_button}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

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

