import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

interface MarathonRegistration {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  category: string;
  tshirt_size: string;
  emergency_name: string;
  emergency_phone: string;
  created_at: string;
}

const AdminRegistrationsPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<
    MarathonRegistration[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/admin/marathon-registrations"
      );

      console.log("API RESPONSE:", response.data);

      setRegistrations(response.data);
    } catch (error: any) {
      console.error("FETCH ERROR:", error);

      if (error.response) {
        console.log("ERROR RESPONSE:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">
      {/* TOP HEADER */}
      <div className="rounded-[32px] border border-orange-500/10 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-black/80 p-6 shadow-[0_30px_80px_rgba(255,115,0,0.08)] mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-orange-300 font-bold mb-3">
              Marathon Dashboard
            </p>

            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Registered Users
            </h1>

            <p className="text-slate-400 mt-4">
              All marathon participants registered through the website.
            </p>
          </div>

          <button
            onClick={fetchRegistrations}
            className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03]"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Total Registrations
            </p>

            <h2 className="text-4xl font-black text-white">
              {registrations.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Status
            </p>

            <h2 className="text-4xl font-black text-orange-400">
              {loading ? "Loading" : "Live"}
            </h2>
          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Updated
            </p>

            <h2 className="text-xl font-black text-white">
              {new Date().toLocaleDateString()}
            </h2>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-[32px] border border-slate-800 bg-slate-950/90 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
        <table className="w-full border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-slate-900 text-orange-400 text-xs uppercase tracking-[0.25em]">
              <th className="p-5 text-left border-b border-slate-800">
                Name
              </th>

              <th className="p-5 text-left border-b border-slate-800">
                Email
              </th>

              <th className="p-5 text-left border-b border-slate-800">
                Phone
              </th>

              <th className="p-5 text-left border-b border-slate-800">
                Gender
              </th>

              {/* <th className="p-5 text-left border-b border-slate-800">
                City
              </th> */}

              <th className="p-5 text-left border-b border-slate-800">
                Category
              </th>

              <th className="p-5 text-left border-b border-slate-800">
                T-Shirt
              </th>

              {/* <th className="p-5 text-left border-b border-slate-800">
                Emergency Contact
              </th> */}

              {/* <th className="p-5 text-right border-b border-slate-800">
                Registered At
              </th> */}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-20 text-center text-slate-500 animate-pulse"
                >
                  Loading registrations...
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-20 text-center text-slate-500 italic"
                >
                  No registrations found.
                </td>
              </tr>
            ) : (
              registrations.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-800/60 hover:bg-orange-500/5 transition-all duration-300"
                >
                  <td className="p-5 font-bold text-white whitespace-nowrap">
                    {user.name}
                  </td>

                  <td className="p-5 text-slate-300 whitespace-nowrap">
                    {user.email}
                  </td>

                  <td className="p-5 text-slate-300 whitespace-nowrap">
                    {user.phone}
                  </td>

                  <td className="p-5 text-slate-300 whitespace-nowrap">
                    {user.gender}
                  </td>

                  {/* <td className="p-5 text-slate-300 whitespace-nowrap">
                    {user.city}
                  </td> */}

                  <td className="p-5">
                    <span className="rounded-full bg-orange-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-orange-300 border border-orange-500/20">
                      {user.category}
                    </span>
                  </td>

                  <td className="p-5 text-slate-300 whitespace-nowrap">
                    {user.tshirt_size}
                  </td>

                  <td className="p-5 text-slate-300 whitespace-nowrap">
                    <div className="flex flex-col">
                      {/* <span>{user.emergency_name}</span> */}

                      <span className="text-xs text-slate-500">
                        {/* {user.emergency_phone} */}
                      </span>
                    </div>
                  </td>

                  {/* <td className="p-5 text-right text-xs text-slate-500 font-mono whitespace-nowrap">
                    {new Date(user.created_at).toLocaleString()}
                  </td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegistrationsPage;