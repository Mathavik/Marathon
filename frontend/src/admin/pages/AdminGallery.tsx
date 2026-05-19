import { useState } from "react";
import api from "../../api";

export default function AdminGallery() {

  const [image, setImage] = useState<File | null>(null);

  const handleUpload = async (e: any) => {

    e.preventDefault();

    if (!image) {
      alert("Select Image");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);

    try {

      await api.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Uploaded Successfully ✅");

      setImage(null);

    } catch (error) {

      console.log(error);

      alert("Upload Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-xl shadow-xl w-[400px]"
      >

<h1 className="text-3xl text-black font-bold mb-6 text-center">
            Marathon Gallery Upload
        </h1>

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e: any) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded mb-5"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Upload
        </button>

      </form>

    </div>
  );
}