import React, { useEffect, useState } from "react";
import api from "../../api";

type Sponsor = {
  id: number;
  title: string;
  image_url: string;
};

const Sponsors = () => {

  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {

    api.get("/sponsors")
      .then((res: any) => {

        setSponsors(res.data);

      })
      .catch((err: any) => {

        console.log(err);

      });

  }, []);

  return (

    <section className="py-16 bg-white overflow-hidden">

      <div className="container mx-auto">

        <h2 className="text-2xl md:text-4xl font-black text-center mb-14 uppercase tracking-wide text-black">
          Our Sponsors
        </h2>

        <div className="relative overflow-hidden w-full">

          <div className="marquee flex items-center">

            {[...sponsors, ...sponsors, ...sponsors].map((item, idx) => (

              <div
                key={idx}
                className="flex-shrink-0 mx-8 bg-gray-100 rounded-2xl shadow-md p-6 flex items-center justify-center"
              >

                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-[90px] w-[180px] object-contain hover:scale-110 transition-transform duration-300"
                />

              </div>

            ))}

          </div>

        </div>

      </div>

      <style>{`

        .marquee {

          width: max-content;

          animation: marquee 25s linear infinite;

        }

        @keyframes marquee {

          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-33.333%);
          }

        }

      `}</style>

    </section>
  );
};

export default Sponsors;