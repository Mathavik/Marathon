import React, { useEffect, useState } from "react";
import api from "../../api";

type Highlight = {
  id: number;
  title: string;
  image_url: string;
};

const EventHighlights = () => {

  const [highlights, setHighlights] = useState<Highlight[]>([]);

  useEffect(() => {

    api.get("/event-highlights")
      .then((res: any) => {

        setHighlights(res.data);

      })
      .catch((err: any) => {

        console.log(err);

      });

  }, []);

  return (

    <section className="py-20 bg-white text-[#111827] font-sans overflow-hidden">

      <div className="container mx-auto px-4 max-w-7xl">

       <h1 className="text-2xl md:text-3xl font-black text-center mb-12 uppercase tracking-wide text-slate-800">
  Event Highlights
</h1>

<div className="flex flex-wrap justify-evenly gap-10">
          {highlights.map((item) => (

            <div
              key={item.id}
              className="flex flex-col items-center group cursor-pointer"
            >

              <div className="relative w-full aspect-square max-w-[200px] mb-4 flex items-center justify-center">

<div className="w-[360px] h-[200px] overflow-hidden rounded-2xl mb-4 ">
  <img
    src={item.image_url}
    alt={item.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
  />

</div>
              </div>

              <span className="text-lg md:text-xl font-extrabold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 text-center block tracking-wide">
{item.title}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default EventHighlights;