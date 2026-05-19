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

    <section className="py-20 bg-black overflow-hidden">

      <div className="container mx-auto px-4">

        {/* HEADING */}

        <h2 className="text-2xl md:text-4xl font-black text-center mb-16 uppercase tracking-wide text-white">
          Our Sponsors
        </h2>

        {/* SCROLL SECTION */}

        <div className="relative overflow-hidden w-full">

          <div className="marquee flex items-center">

            {[...sponsors, ...sponsors, ...sponsors].map((item, idx) => (

              <div
                key={idx}
                className="flex-shrink-0 mx-8 w-[260px] h-[160px] bg-white rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
              >

                {/* FULL CARD IMAGE */}

                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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