import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Swal from "sweetalert2";

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

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<HeroData>({
    title: "",
    subtitle: "",
    event_date: "",
    location: "",
    background_image: null,
    primary_button: "",
  });

  // FETCH HERO SECTION
  useEffect(() => {
    fetchHeroSection();
  }, []);

  const fetchHeroSection = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/hero-section");

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

        setPreviewImage(hero.background_image || "");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to fetch hero section",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE IMAGE CHANGE
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        background_image: file,
      });

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // SUBMIT FORM
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("event_date", formData.event_date);
      data.append("location", formData.location);
      data.append("primary_button", formData.primary_button);

      // IMAGE
      if (formData.background_image instanceof File) {
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
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hero Section Saved Successfully",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#f97316",
      });

      fetchHeroSection();

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 md:p-10">

      {/* HEADER */}
      <div className="rounded-[32px] border border-orange-500/10 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-black/80 p-8 shadow-[0_30px_80px_rgba(255,115,0,0.08)] mb-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            

            <p className="text-slate-400 mt-4 text-sm md:text-base">
              Manage homepage hero section content and banner image.
            </p>
          </div>

          <button
            onClick={fetchHeroSection}
            className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03]"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>

        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Module
            </p>

            <h2 className="text-3xl font-black text-white">
              Hero Section
            </h2>
          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Status
            </p>

            <h2 className="text-3xl font-black text-orange-400">
              {loading ? "Loading" : "Live"}
            </h2>
          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Updated
            </p>

            <h2 className="text-xl font-black text-white">
              {new Date().toLocaleDateString()}
            </h2>
          </div>

        </div>
      </div>

      {/* FORM */}
      <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 shadow-[0_30px_60px_rgba(0,0,0,0.3)] p-6 md:p-10">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* TITLE */}
          <div>
            <label className="block mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Hero Title"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-orange-500"
            />
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="block mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Subtitle
            </label>

            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Enter Subtitle"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-orange-500"
            />
          </div>

          {/* EVENT DATE */}
          <div>
            <label className="block mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Event Date
            </label>

            <input
              type="datetime-local"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-orange-500"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Event Location"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-orange-500"
            />
          </div>

          {/* BUTTON */}
          <div>
            <label className="block mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Primary Button
            </label>

            <input
              type="text"
              name="primary_button"
              value={formData.primary_button}
              onChange={handleChange}
              placeholder="Register Now"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-orange-500"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Background Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-slate-300"
            />
          </div>

          {/* IMAGE PREVIEW */}
          {previewImage && (
            <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-5">

              <p className="text-sm uppercase tracking-[0.2em] text-orange-300 font-bold mb-4">
                Image Preview
              </p>

              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-[350px] object-cover rounded-3xl border border-slate-700"
              />

            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 py-5 text-lg font-black uppercase tracking-[0.2em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.01]"
          >
            {loading ? "Saving..." : "Save Hero Section"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminHeroSection;