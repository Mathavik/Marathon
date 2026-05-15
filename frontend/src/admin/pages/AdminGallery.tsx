import React, { useEffect, useState } from "react";
import api from "../../api";
import axios from "axios";
import { FaCloudUploadAlt, FaImages, FaCheckCircle } from "react-icons/fa";

type Category = {
  id: number;
  name: string;
};

export default function AdminGallery() {
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!image || !category) return alert("Please select both an image and a category");
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);
    try {
      await api.post("/gallery", formData);
      alert("Success!");
      setImage(null); setCategory(""); setPreview(null);
    } catch (error) {
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex items-center justify-center px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-amber-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-600/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

        <div className="p-6 md:p-8">
          {/* HEADER - Smaller sizes */}
          <div className="text-center mb-6">
            <div className="bg-slate-950 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl border border-slate-800">
              {React.createElement(FaImages as any, { className: "text-amber-500 text-xl" })}
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
              Manage <span className="text-amber-500">Gallery</span>
            </h2>
          </div>

          <div className="space-y-4">
            {/* STEP 1: UPLOAD - Compact height */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">01 Asset Selection</label>
              <div className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${preview ? 'p-2 border-amber-500/50' : 'p-4 border-slate-800 bg-slate-950/30'}`}>
                <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                {preview ? (
                  <div className="h-24 w-full rounded-xl overflow-hidden shadow-lg">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="text-center py-2">
                    {React.createElement(FaCloudUploadAlt as any, { className: "mx-auto text-3xl text-slate-700 mb-1" })}
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Click to Browse</p>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: CATEGORY - Compact padding */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">02 Classification</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-slate-300 outline-none focus:border-amber-500 appearance-none cursor-pointer"
                >
                  <option value="">Choose category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 text-[10px]">▼</div>
              </div>
            </div>

            {/* BUTTON - Reduced padding */}
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-500 ${
                isUploading ? "bg-slate-800 text-slate-500" : "bg-amber-600 text-white hover:bg-amber-500 shadow-lg"
              }`}
            >
              {isUploading ? "Processing..." : "Finalize Upload"}
            </button>
          </div>

          <p className="mt-6 text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center">
            Max 5MB • JPG/PNG/WEBP
          </p>
        </div>
      </div>
    </div>
  );
}