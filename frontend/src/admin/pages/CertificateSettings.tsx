import { useState, useEffect } from "react";
import api from "../../api";

export default function CertificateSettings() {

  const [background, setBackground] = useState<any>(null);
  const [logo, setLogo] = useState<any>(null);
  const [principal, setPrincipal] = useState<any>(null);
  const [coordinator, setCoordinator] = useState<any>(null);

  const [preview, setPreview] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/certificate");
      setPreview(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {

    // 🔒 BG LOCK ALERT
    if (background && preview?.background_image) {
      alert("❌ Background already set. Update panna mudiyathu!");
      return;
    }

    const formData = new FormData();

    if (background) formData.append("background", background);
    if (logo) formData.append("logo", logo);
    if (principal) formData.append("principal_sign", principal);
    if (coordinator) formData.append("coordinator_sign", coordinator);

    try {
      await api.post("/admin/certificate", formData);
      alert("✅ Saved!");
      fetchData();
    } catch (e) {
      alert("❌ Error");
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen p-10 text-white">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-[#f59e0b] mb-8">
        Certificate Settings
      </h2>

      <div className="grid grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="bg-[#0b132b] border border-[#1f2a44] rounded-2xl p-6 shadow-lg">

          <h3 className="text-xl font-semibold mb-6 text-[#f59e0b]">
            Upload Details
          </h3>

          <div className="space-y-5">

            {/* BG */}
            <div>
              <p className="text-gray-300 mb-2">Background</p>

              <label className={`flex items-center justify-center border rounded-lg p-3 
              ${preview?.background_image 
                ? "opacity-40 cursor-not-allowed border-gray-600" 
                : "cursor-pointer border-[#1f2a44] hover:border-[#f59e0b]"}`}>

                📷 <span className="ml-2">
                  {preview?.background_image ? "Background Locked" : "Upload Background"}
                </span>

                <input
                  type="file"
                  hidden
                  disabled={preview?.background_image}
                  onChange={(e) => setBackground(e.target.files?.[0])}
                />
              </label>
            </div>

            {/* LOGO */}
            <div>
              <p className="text-gray-300 mb-2">Logo</p>

              <label className="flex items-center justify-center border border-[#1f2a44] rounded-lg p-3 cursor-pointer bg-[#020617] hover:border-[#f59e0b]">
                📷 <span className="ml-2">Upload Logo</span>

                <input
                  type="file"
                  hidden
                  onChange={(e) => setLogo(e.target.files?.[0])}
                />
              </label>
            </div>

            {/* PRINCIPAL */}
            <div>
              <p className="text-gray-300 mb-2">Principal Signature</p>

              <label className="flex items-center justify-center border border-[#1f2a44] rounded-lg p-3 cursor-pointer bg-[#020617] hover:border-[#f59e0b]">
                📷 <span className="ml-2">Upload Principal Sign</span>

                <input
                  type="file"
                  hidden
                  onChange={(e) => setPrincipal(e.target.files?.[0])}
                />
              </label>
            </div>

            {/* COORDINATOR */}
            <div>
              <p className="text-gray-300 mb-2">Coordinator Signature</p>

              <label className="flex items-center justify-center border border-[#1f2a44] rounded-lg p-3 cursor-pointer bg-[#020617] hover:border-[#f59e0b]">
                📷 <span className="ml-2">Upload Coordinator Sign</span>

                <input
                  type="file"
                  hidden
                  onChange={(e) => setCoordinator(e.target.files?.[0])}
                />
              </label>
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="mt-6 bg-[#f59e0b] text-black px-6 py-2 rounded-xl font-semibold hover:opacity-90"
          >
            Save / Update
          </button>

        </div>

        {/* RIGHT PREVIEW */}
     {/* RIGHT PREVIEW */}
<div className="bg-[#0b132b] border border-[#1f2a44] rounded-2xl p-6 shadow-lg">

  <h3 className="text-xl font-semibold mb-6 text-[#f59e0b]">
    Preview
  </h3>

  <div className="relative w-full h-[400px] border border-[#f59e0b] rounded-xl overflow-hidden">

    {/* BG */}
    {preview?.background_image && (
      <img
        src={`http://localhost:8000/storage/${preview.background_image}`}
        className="absolute w-full h-full object-cover"
      />
    )}

    {/* LOGO */}
    {(logo || preview?.logo) && (
      <img
        src={
          logo
            ? URL.createObjectURL(logo)
            : `http://localhost:8000/storage/${preview.logo}`
        }
        className="absolute top-3 left-3 h-12 object-contain"
      />
    )}

    {/* COORDINATOR SIGN */}
    {(coordinator || preview?.coordinator_signature) && (
      <img
        src={
          coordinator
            ? URL.createObjectURL(coordinator)
            : `http://localhost:8000/storage/${preview.coordinator_signature}`
        }
        className="absolute bottom-10 left-[40%] h-10 object-contain"
      />
    )}

    {/* PRINCIPAL SIGN */}
    {(principal || preview?.principal_signature) && (
      <img
        src={
          principal
            ? URL.createObjectURL(principal)
            : `http://localhost:8000/storage/${preview.principal_signature}`
        }
        className="absolute bottom-10 right-10 h-10 object-contain"
      />
    )}

  </div>

</div>

      </div>

    </div>
  );
}