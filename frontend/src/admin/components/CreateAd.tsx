import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateAd = () => {
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    event_date: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });

  const [image, setImage] = useState<File | null>(null);
  const [ads, setAds] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      // Inga neenga active ads mattum fetch pannama full list fetch panna "api/ads" route use pannunga
      const res = await axios.get("http://localhost:8000/api/ads/active");
      setAds(res.data);
    } catch (err) {
      console.error("Error fetching ads", err);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // ✅ CREATE / UPDATE SUBMIT LOGIC
  const handleSubmit = async () => {
    const data = new FormData();

    Object.keys(form).forEach((key) => {
      if (key === "is_active") {
        data.append(key, form[key] ? "1" : "0");
      } else {
        data.append(key, form[key]);
      }
    });

    if (image) data.append("image", image);

    try {
      if (editId) {
        // UPDATE LOGIC (Using _method=PUT for Laravel)
        await axios.post(`http://localhost:8000/api/ads/${editId}?_method=PUT`, data);
        alert("Advertisement Updated!");
      } else {
        // CREATE LOGIC
        await axios.post("http://localhost:8000/api/ads", data);
        alert("Advertisement Created!");
      }
      resetForm();
      fetchAds();
    } catch (err) {
      alert("Error saving advertisement. Check console for details.");
      console.error(err);
    }
  };

  // ✅ DELETE LOGIC
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      try {
        await axios.delete(`http://localhost:8000/api/ads/${id}`);
        alert("Deleted Successfully!");
        fetchAds();
      } catch (err) {
        alert("Error deleting ad.");
      }
    }
  };

  // ✅ EDIT LOGIC (Fill form with selected ad data)
  const handleEdit = (ad: any) => {
    setForm({
      title: ad.title,
      description: ad.description,
      event_date: ad.event_date,
      start_date: ad.start_date,
      end_date: ad.end_date,
      is_active: ad.is_active === 1 || ad.is_active === true,
    });
    setEditId(ad.id);
    // Smooth-ah mela scroll panna thaan user form-ah paaka mudiyum
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ RESET FORM
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      event_date: "",
      start_date: "",
      end_date: "",
      is_active: true,
    });
    setImage(null);
    setEditId(null);
  };

  const inputStyle = "w-full bg-slate-900 border border-amber-500/20 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 transition-all mb-4";

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* 🔥 FORM SECTION (Create & Update) */}
        <div className="flex-1 bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-amber-500/10 shadow-2xl">
          <h2 className="text-2xl font-black text-amber-500 mb-6 uppercase tracking-widest">
            {editId ? "Edit Advertisement" : "Create New Advertisement"}
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Event Title</label>
            <input name="title" value={form.title} placeholder="e.g. Sports Day 2026" onChange={handleChange} className={inputStyle} />
            
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea name="description" value={form.description} placeholder="Enter details..." onChange={handleChange} className={`${inputStyle} h-24`} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Event Date</label>
                <input type="date" name="event_date" value={form.event_date} onChange={handleChange} className={inputStyle} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Show From</label>
                <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className={inputStyle} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Show Until</label>
                <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className={inputStyle} />
              </div>
            </div>

            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Upload Banner</label>
            <input type="file" onChange={(e) => setImage(e.target.files![0])} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20 cursor-pointer mb-6" />

            <div className="flex items-center gap-2 mb-6">
              <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="w-5 h-5 accent-amber-500" />
              <label className="text-sm font-medium text-slate-300">Active Status</label>
            </div>

            <div className="flex gap-4">
              <button onClick={handleSubmit} className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition-all uppercase tracking-wider">
                {editId ? "Update Now" : "Launch Ad"}
              </button>
              {editId && (
                <button onClick={resetForm} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 🔥 LIST SECTION (Delete & Edit Trigger) */}
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-xl font-bold text-slate-400 mb-6 border-l-4 border-amber-500 pl-3">Manage Ads</h2>
          <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {ads.length === 0 ? (
              <p className="text-slate-600 italic">No ads available.</p>
            ) : (
              ads.map((ad) => (
                <div key={ad.id} className="bg-slate-900 border border-white/5 p-4 rounded-2xl shadow-xl hover:border-amber-500/30 transition-all group">
                  {ad.image && (
                    <img 
                      src={`http://localhost:8000/${ad.image}`}
                      className="w-full h-24 object-cover rounded-xl mb-3 grayscale group-hover:grayscale-0 transition-all" 
                      alt="ad"
                    />
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-amber-500 text-sm">{ad.title}</h3>
                      <p className="text-[10px] text-slate-500 uppercase">{ad.event_date}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${ad.is_active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {ad.is_active ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEdit(ad)} className="flex-1 text-[10px] font-bold bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-950 py-2 rounded-md transition-all">
                      EDIT
                    </button>
                    <button onClick={() => handleDelete(ad.id)} className="flex-1 text-[10px] font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-md transition-all">
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAd;