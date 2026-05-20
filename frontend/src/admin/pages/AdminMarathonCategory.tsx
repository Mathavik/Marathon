import React, { useEffect, useState, useRef } from "react";
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

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

        setPreviewImage(`http://127.0.0.1:8000/${data.image}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // INPUT CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const imageUrl = URL.createObjectURL(file);

      setPreviewImage(imageUrl);
    }
  };

  // SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

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
        background: "#020617",
        color: "#fff",
        confirmButtonColor: "#f97316",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchMarathonCategory();
    } catch (error: any) {
      console.error(error.response?.data);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong",
        background: "#020617",
        color: "#fff",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 md:p-8">
      {/* HEADER */}
      <div className="rounded-[32px] border border-orange-500/10 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-black/80 p-8 shadow-[0_30px_80px_rgba(255,115,0,0.08)] mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            

            <p className="text-slate-400 mt-4 text-sm md:text-base">
              Manage marathon category details and banner image.
            </p>
          </div>

          <button
            onClick={fetchMarathonCategory}
            className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03]"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Event Title
            </p>

            <h2 className="text-2xl font-black text-white truncate">
              {formData.title || "No Data"}
            </h2>
          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Status
            </p>

            <h2 className="text-4xl font-black text-orange-400">
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
      <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 shadow-[0_30px_60px_rgba(0,0,0,0.3)] p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >
          {/* TITLE */}
          <div>
            <label className="block text-sm font-black uppercase tracking-[0.15em] text-orange-300 mb-3">
              Marathon Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="10KM Marathon"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="block text-sm font-black uppercase tracking-[0.15em] text-orange-300 mb-3">
              Subtitle
            </label>

            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Run Beyond Limits"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {/* EVENT TIME */}
          <div>
            <label className="block text-sm font-black uppercase tracking-[0.15em] text-orange-300 mb-3">
              Event Time
            </label>

            <input
              type="text"
              name="event_time"
              value={formData.event_time}
              onChange={handleChange}
              placeholder="Morning 10.00 AM"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {/* REGISTRATION FEE */}
          <div>
            <label className="block text-sm font-black uppercase tracking-[0.15em] text-orange-300 mb-3">
              Registration Fee
            </label>

            <input
              type="text"
              name="registration_fee"
              value={formData.registration_fee}
              onChange={handleChange}
              placeholder="1500"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {/* ROUTE */}
          <div>
            <label className="block text-sm font-black uppercase tracking-[0.15em] text-orange-300 mb-3">
              Marathon Route
            </label>

            <input
              type="text"
              name="marathon_route"
              value={formData.marathon_route}
              onChange={handleChange}
              placeholder="City Central Track"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-black uppercase tracking-[0.15em] text-orange-300 mb-3">
              Upload Marathon Image
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.avif"
              onChange={handleImageChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white file:bg-orange-500 file:border-0 file:px-4 file:py-2 file:rounded-xl file:text-black file:font-bold"
            />
          </div>

          {/* IMAGE PREVIEW */}
          {previewImage && (
            <div>
              <p className="text-sm font-black uppercase tracking-[0.15em] text-orange-300 mb-4">
                Preview Image
              </p>

              <div className="overflow-hidden rounded-3xl border border-slate-800">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.01]"
          >
            {loading
              ? "Saving..."
              : "Save Marathon Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminMarathonCategory;