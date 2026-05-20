import { useState } from "react";
import api from "../../api";
import { UploadCloud, ImagePlus } from "lucide-react";

export default function AdminEventHighlights() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!image) {
      alert("Please Select Image");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);

    try {
      setLoading(true);

      await api.post("/event-highlights", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Uploaded Successfully ✅");

      setTitle("");
      setImage(null);
    } catch (err) {
      console.log(err);

      alert("Upload Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
    

      {/* FORM CARD */}
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-orange-500/10 bg-slate-950/90 shadow-[0_30px_60px_rgba(0,0,0,0.35)] overflow-hidden"
        >
          {/* TOP */}
          <div className="p-8 border-b border-slate-800">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <UploadCloud className="w-8 h-8 text-orange-400" />
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase tracking-wide text-white">
                  Upload Event Highlight
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Add title and upload highlight image
                </p>
              </div>
            </div>

            {/* TITLE */}
            <div className="mb-6">
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-orange-300 mb-3">
                Highlight Title
              </label>

              <input
                type="text"
                placeholder="Enter Highlight Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-orange-500/10 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
              />
            </div>

            {/* FILE INPUT */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-orange-300 mb-3">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => setImage(e.target.files[0])}
                className="hidden"
                id="highlight-upload"
              />

              <label
                htmlFor="highlight-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 transition-all duration-300 rounded-3xl p-12 cursor-pointer"
              >
                <UploadCloud className="w-14 h-14 text-orange-400 mb-4" />

                <p className="text-lg font-bold text-white mb-2">
                  Click to Select Image
                </p>

                <p className="text-sm text-slate-400">
                  JPG, PNG, JPEG Supported
                </p>

                {image && (
                  <div className="mt-5 rounded-2xl bg-black/40 border border-orange-500/20 px-5 py-3">
                    <p className="text-orange-300 text-sm font-semibold">
                      {image.name}
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* BUTTON */}
          <div className="p-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-4 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03] disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Highlight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}