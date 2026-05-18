import { useEffect, useState } from "react";
import api from "../../api";

type Image = {
  id: number;
  image: string;
  category: string;
};

export default function Gallery() {

  const [images, setImages] = useState<Image[]>([]);

  // FETCH IMAGES
  useEffect(() => {

    api.get("/gallery")
      .then((res: any) => {
        setImages(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });

  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl text-center font-bold mb-10">
        🏃 Marathon Gallery
      </h1>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">

        {images.map((img, index) => {

          const isBig = index % 5 === 0;

          return (

            <div
              key={img.id}
              className={`relative overflow-hidden rounded-xl shadow-lg group
                ${isBig ? "col-span-2 row-span-2" : ""}
              `}
            >

              {/* IMAGE */}
              <img
                src={`http://127.0.0.1:8000/upload/gallery/${img.image}`}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">

                <p className="text-white text-xl font-semibold">
                  Marathon
                </p>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
}