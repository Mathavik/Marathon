import { useState } from "react";
import api from "../../api";

export default function AdminEventHighlights() {

  const [title, setTitle] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (!image) {

      alert("Select Image");

      return;
    }

    const formData = new FormData();

formData.append("title", title);
    formData.append("image", image);

    try {

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
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[420px]"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Upload Event Highlight
        </h1>

        {/* LABEL */}
        <input
          type="text"
          placeholder="Enter Label"
          value={title}
onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e: any) => setImage(e.target.files[0])}
          className="w-full border p-3 rounded-lg mb-5"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg"
        >
          Upload
        </button>

      </form>

    </div>
  );
}