import { useEffect, useState } from "react";
import api from "../../api";

type Image = {
  id: number;
  image_url: string;
  category: string;
};

export default function Gallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/gallery")
      .then((res: any) => setImages(res.data))
      .catch((err: any) => console.log(err));
  }, []);

  const filtered =
    filter === "all"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl text-center font-bold mb-6">
        📸 Event Gallery
      </h1>

      {/* FILTER */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {["all", "sports", "dance", "arts"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm transition 
              ${filter === cat
                ? "bg-black text-white"
                : "bg-white border"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔥 MIXED GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">

        {filtered.map((img, index) => {
          // random big layout pattern
          const isBig = index % 5 === 0;

          return (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-xl shadow-lg group
                ${isBig ? "col-span-2 row-span-2" : ""}
              `}
            >
              <img
                src={img.image_url}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <p className="text-white text-lg capitalize">
                  {img.category}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}