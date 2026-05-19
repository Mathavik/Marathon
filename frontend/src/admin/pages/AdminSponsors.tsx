import React, { useEffect, useState } from "react";
import api from "../../api";

const AdminSponsors = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>(null);

  const [sponsors, setSponsors] = useState<any[]>([]);

  const getSponsors = () => {

    api.get("/admin/sponsors")
      .then((res: any) => {

        setSponsors(res.data);

      })
      .catch((err: any) => {

        console.log(err);

      });

  };

  useEffect(() => {

    getSponsors();

  }, []);

  const submitHandler = (e: any) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);
    formData.append("status", "active");

    api.post("/admin/sponsors", formData)
      .then(() => {

        alert("Sponsor Added Successfully");

        setTitle("");
        setImage(null);

        getSponsors();

      })
      .catch((err: any) => {

        console.log(err);

      });

  };

  const deleteSponsor = (id: number) => {

    api.delete(`/admin/sponsors/${id}`)
      .then(() => {

        getSponsors();

      });

  };

  const statusChange = (id: number) => {

    api.patch(`/admin/sponsors/status/${id}`)
      .then(() => {

        getSponsors();

      });

  };

  return (

    <div className="p-10 text-white">

      <h1 className="text-4xl font-black mb-10">
        Sponsors
      </h1>

      {/* FORM */}

      <form
        onSubmit={submitHandler}
        className="bg-black p-8 rounded-2xl shadow-lg mb-12 border border-gray-800"
      >

        <div className="mb-5">

          <label className="block mb-2 text-lg font-semibold text-white">
            Sponsor Title
          </label>

          <input
            type="text"
            placeholder="Enter Sponsor Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none"
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2 text-lg font-semibold text-white">
            Upload Sponsor Image
          </label>

          <input
            type="file"
            onChange={(e: any) => setImage(e.target.files[0])}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black"
          />

        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white px-8 py-3 rounded-xl font-bold"
        >
          Add Sponsor
        </button>

      </form>

      {/* SPONSOR LIST */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {sponsors.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <div className="w-full h-[160px] overflow-hidden rounded-xl mb-5 flex items-center justify-center bg-gray-100">

              <img
                src={item.image_url}
                alt={item.title}
                className="h-full object-contain"
              />

            </div>

            <h2 className="text-2xl font-bold text-center text-black mb-5">
              {item.title}
            </h2>

            <div className="flex justify-center gap-4">

              <button
                onClick={() => statusChange(item.id)}
                className={`px-5 py-2 rounded-xl text-white font-semibold transition-all duration-300 ${
                  item.status === "active"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {item.status}
              </button>

              <button
                onClick={() => deleteSponsor(item.id)}
                className="bg-black hover:bg-gray-800 transition-all duration-300 text-white px-5 py-2 rounded-xl font-semibold"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminSponsors;