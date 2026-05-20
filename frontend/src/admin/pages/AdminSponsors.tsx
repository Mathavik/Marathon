import React, { useEffect, useState } from "react";
import api from "../../api";

const AdminSponsors = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>(null);

  const [sponsors, setSponsors] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const getSponsors = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/sponsors");

      setSponsors(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSponsors();
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);
    formData.append("status", "active");

    try {
      await api.post("/admin/sponsors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Sponsor Added Successfully ✅");

      setTitle("");
      setImage(null);

      getSponsors();
    } catch (err) {
      console.log(err);

      alert("Upload Failed ❌");
    }
  };

  const deleteSponsor = async (id: number) => {
    try {
      await api.delete(`/admin/sponsors/${id}`);

      getSponsors();
    } catch (err) {
      console.log(err);
    }
  };

  const statusChange = async (id: number) => {
    try {
      await api.patch(`/admin/sponsors/status/${id}`);

      getSponsors();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 md:p-8">
      {/* HEADER */}
      <div className="rounded-[32px] border border-orange-500/10 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-black/80 p-8 shadow-[0_30px_80px_rgba(255,115,0,0.08)] mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
           

            

            <p className="text-slate-400 mt-4 text-sm md:text-base">
              Upload and manage marathon sponsors professionally.
            </p>
          </div>

          <button
            onClick={getSponsors}
            className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03]"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Total Sponsors
            </p>

            <h2 className="text-4xl font-black text-white">
              {sponsors.length}
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
      <div className="rounded-[32px] border border-orange-500/10 bg-slate-950/90 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.3)] mb-10">
        <h2 className="text-2xl font-black uppercase tracking-wide text-white mb-8">
          Add New Sponsor
        </h2>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* TITLE */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-[0.2em] text-orange-300 mb-3">
              Sponsor Title
            </label>

            <input
              type="text"
              placeholder="Enter Sponsor Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-all"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-[0.2em] text-orange-300 mb-3">
              Upload Sponsor Image
            </label>

            <input
              type="file"
              onChange={(e: any) => setImage(e.target.files[0])}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white file:bg-orange-500 file:border-0 file:px-4 file:py-2 file:rounded-xl file:text-black file:font-bold"
            />
          </div>

          {/* BUTTON */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.02]"
            >
              Add Sponsor
            </button>
          </div>
        </form>
      </div>

      {/* SPONSOR LIST */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 animate-pulse text-lg">
          Loading sponsors...
        </div>
      ) : sponsors.length === 0 ? (
        <div className="text-center py-20 text-slate-500 italic text-lg">
          No sponsors found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sponsors.map((item) => (
            <div
              key={item.id}
              className="rounded-[30px] border border-orange-500/10 bg-gradient-to-b from-slate-900 to-black p-6 shadow-[0_25px_50px_rgba(0,0,0,0.35)] hover:scale-[1.02] transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="h-[220px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 flex items-center justify-center mb-6">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-full w-full object-contain p-4"
                />
              </div>

              {/* TITLE */}
              <h2 className="text-2xl font-black text-white text-center mb-6">
                {item.title}
              </h2>

              {/* BUTTONS */}
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => statusChange(item.id)}
                  className={`px-5 py-3 rounded-2xl font-black uppercase tracking-wide transition-all duration-300 ${
                    item.status === "active"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                  }`}
                >
                  {item.status}
                </button>

                <button
                  onClick={() => deleteSponsor(item.id)}
                  className="px-5 py-3 rounded-2xl bg-orange-500 text-black font-black uppercase tracking-wide hover:bg-orange-400 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSponsors;