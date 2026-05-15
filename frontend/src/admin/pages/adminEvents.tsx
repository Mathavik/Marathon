import { useEffect, useState } from "react";
import api from "../../api";
import { FaEdit, FaTrash, FaFileDownload, FaSchool, FaPlus, FaSearch } from "react-icons/fa";
import React from "react";

type Event = {
  id?: number;
  category_id: number;
  name: string;
  type: string;
  age_group: string;
  image?: string;
  is_visible?: number;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [file, setFile] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<Event>({
    category_id: 1,
    name: "",
    type: "",
    age_group: "",
    is_visible: 1,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchEvents = () => {
    api.get("/events").then((res) => setEvents(res.data));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.age_group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {

    const formData = new FormData();
    formData.append("category_id", String(form.category_id));
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("age_group", form.age_group);
    formData.append("is_visible", String(form.is_visible ?? 1));
    if (file) formData.append("image", file);

    const request = isEdit
      ? api.post(`/events/${form.id}?_method=PUT`, formData)
      : api.post("/events", formData);

    request.then(() => {
      alert(isEdit ? "Updated Successfully!" : "Created Successfully!");
      fetchEvents();
      closeModal();
    }).catch(err => {
      console.error(err);
      alert("Something went wrong!");
    });
  };
  const toggleVisibility = (event: Event) => {
    const formData = new FormData();

    formData.append(
      "is_visible",
      event.is_visible === 1 ? "0" : "1"
    );

    api.post(`/events/${event.id}?_method=PUT`, formData)
      .then(() => {
        fetchEvents();
      })
      .catch(() => {
        alert("Failed to update visibility");
      });
  };

  const handleEdit = (event: Event) => {
    setForm(event);
    setIsEdit(true);
    setShowModal(true);
  };

  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedId) {
      api.delete(`/events/${selectedId}`).then(() => {
        fetchEvents();
        setShowDeleteModal(false);
        setSelectedId(null);
      });
    }
  };

  const closeModal = () => {
    setForm({ category_id: 1, name: "", type: "", age_group: "" });
    setFile(null);
    setIsEdit(false);
    setShowModal(false);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-200">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            Events <span className="text-amber-500">Management</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Create and oversee all competition categories.</p>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
              {React.createElement(FaSearch as any, { size: 14 })}
            </span>
            <input
              type="text"
              placeholder="Filter events..."
              className="pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl w-full focus:ring-2 focus:ring-amber-500/50 outline-none text-white shadow-2xl transition-all placeholder:text-slate-600 font-bold text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-500 transition-all flex items-center gap-3 shadow-lg shadow-amber-600/20 font-black uppercase text-[10px] tracking-widest whitespace-nowrap active:scale-95"
          >
            {React.createElement(FaPlus as any)} Add Event
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-slate-900/50 backdrop-blur-md rounded-[2rem] border border-slate-800 shadow-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Asset</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Details</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Group</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Visible</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {currentEvents.length > 0 ? (
                currentEvents.map((e) => (
                 <tr key={e.id} className="hover:bg-white/[0.02] transition-colors group">

  {/* ASSET */}
  <td className="p-6">
  {e.image ? (
    <img
      src={`http://localhost:8000/upload/events/${e.image}`}
      alt="event"
      className="w-16 h-16 object-cover rounded-xl border border-slate-700"
    />
  ) : (
    <span className="text-slate-500 text-sm font-bold">
      No Image
    </span>
  )}
</td>

  {/* DETAILS */}
  <td className="p-6">
    <div className="font-black text-white text-lg tracking-tight uppercase group-hover:text-amber-500 transition-colors">
      {e.name}
    </div>
    <div className="flex items-center gap-2 mt-1">
      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md font-black uppercase tracking-widest border border-slate-700">
        {e.type}
      </span>
      <span className="text-[10px] text-slate-600 font-bold">
        ID: {e.id}
      </span>
    </div>
  </td>

  {/* GROUP */}
  <td className="p-6">
    <span className="text-amber-500/80 font-black italic text-sm">
      {e.age_group}
    </span>
  </td>

  {/* VISIBLE */}
  <td className="p-6 text-center">
    <button
      onClick={() => toggleVisibility(e)}
      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${
        e.is_visible
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {e.is_visible ? "Visible" : "Hidden"}
    </button>
  </td>

  {/* ACTIONS */}
  <td className="p-6">
    <div className="flex items-center justify-center gap-3">

      <button
        onClick={() => handleEdit(e)}
        className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
      >
        {React.createElement(FaEdit as any, { size: 14 })}
      </button>

      <button
        onClick={() => confirmDelete(e.id!)}
        className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
      >
        {React.createElement(FaTrash as any, { size: 14 })}
      </button>

      <div className="w-[1px] h-8 bg-slate-800 mx-1"></div>

      <button
        onClick={() =>
          window.open(`http://localhost:8000/api/event/${e.id}/schools-students/download`, "_blank")
        }
        className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
      >
        {React.createElement(FaFileDownload as any)} Report
      </button>

      <button
        onClick={() =>
          window.open(`http://localhost:8000/api/event/${e.id}/schools/download`, "_blank")
        }
        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
      >
        {React.createElement(FaSchool as any)} Schools
      </button>

    </div>
  </td>

</tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <p className="text-slate-600 font-black uppercase tracking-widest">No matching events found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}
              className={`w-12 h-12 rounded-2xl font-black transition-all ${currentPage === i + 1 ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-110" : "bg-slate-900 text-slate-500 hover:bg-slate-800 border border-slate-800"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* MODAL - Design matching your Upload Page */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 z-[999]">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-lg p-10 shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

            <h2 className="text-2xl font-black mb-8 text-white uppercase tracking-tighter italic">
              {isEdit ? "Update" : "New"} <span className="text-amber-500">Event</span>
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category ID</label>
                  <input name="category_id" onChange={handleChange} value={form.category_id} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl mt-2 text-white font-bold outline-none focus:border-amber-500 transition-all" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Type (Solo/Group)</label>
                  <input name="type" onChange={handleChange} value={form.type} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl mt-2 text-white font-bold outline-none focus:border-amber-500 transition-all" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Event Name</label>
                <input name="name" onChange={handleChange} value={form.name} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl mt-2 text-white font-bold outline-none focus:border-amber-500 transition-all" />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Age Group (e.g. 10-15)</label>
                <input name="age_group" onChange={handleChange} value={form.age_group} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl mt-2 text-white font-bold outline-none focus:border-amber-500 transition-all" />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Cover Image
                </label>

                <div className="mt-2 relative border-2 border-dashed border-slate-800 rounded-2xl p-6 bg-slate-950/50 text-center hover:border-amber-500/50 transition-all cursor-pointer">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    {file ? file.name : "Select Asset"}
                  </p>
                </div>
              </div>

            </div>

            <div className="flex justify-end mt-10 gap-4">
              <button onClick={closeModal} className="px-6 py-3 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition">Cancel</button>
              <button onClick={handleSubmit} className="bg-amber-600 text-white px-10 py-4 rounded-2xl hover:bg-amber-500 shadow-xl shadow-amber-600/20 transition-all font-black uppercase text-[10px] tracking-widest">
                {isEdit ? "Update Event" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 z-[999]">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 max-w-sm w-full text-center border border-slate-800 shadow-3xl">
            <div className="bg-red-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
              {React.createElement(FaTrash as any, { className: "text-red-500 text-3xl" })}
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic">Confirm <span className="text-red-500">Delete</span></h2>
            <p className="text-slate-500 mt-4 font-medium leading-relaxed">This action will permanently wipe this event from the database.</p>
            <div className="flex flex-col gap-3 mt-10">
              <button onClick={handleDelete} className="w-full py-4 bg-red-600 text-white rounded-2xl hover:bg-red-500 transition-all font-black uppercase text-[10px] tracking-[0.2em]">Delete Now</button>
              <button onClick={() => setShowDeleteModal(false)} className="w-full py-4 bg-slate-800 text-slate-400 rounded-2xl hover:bg-slate-700 transition font-black uppercase text-[10px] tracking-widest">Retain Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}