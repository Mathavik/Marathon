import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPenToSquare, FaTrash, FaPlus, FaXmark } from "react-icons/fa6";

interface Category {
  id: number;
  name: string;
  description: string;
  image?: string;
  image_url?: string; 
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const API_URL = "http://127.0.0.1:8000/api/categories";

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = () => {
    axios.get(API_URL).then((res) => setCategories(res.data));
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImageFile(null);
    setEditData(null);
    setShowAddModal(false);
  };

  const handleStore = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post(API_URL, formData);
      Swal.fire({
        title: "Success!",
        text: "New Category added!",
        icon: "success",
        background: '#0f172a',
        color: '#f8fafc',
        confirmButtonColor: '#f59e0b'
      });
      resetForm();
      fetchCategories();
    } catch (err) {
      Swal.fire("Error!", "Check your inputs", "error");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;
    const formData = new FormData();
    formData.append("_method", "PUT"); 
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post(`${API_URL}/${editData.id}`, formData);
      Swal.fire({
        title: "Success!",
        text: "Updated successfully",
        icon: "success",
        background: '#0f172a',
        color: '#f8fafc',
        confirmButtonColor: '#f59e0b'
      });
      resetForm();
      fetchCategories();
    } catch (err) {
      Swal.fire("Error!", "Update failed", "error");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Ithai thirumba edukka mudiyathu!",
      icon: "warning",
      showCancelButton: true,
      background: '#0f172a',
      color: '#f8fafc',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#334155',
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        Swal.fire("Deleted!", "Category deleted.", "success");
        fetchCategories();
      } catch (err) {
        Swal.fire("Error!", "Delete failed", "error");
      }
    }
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-200">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            System <span className="text-amber-500">Categories</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Organize competition domains and visual assets.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-500 transition-all flex items-center gap-3 shadow-lg shadow-amber-600/20 font-black uppercase text-[10px] tracking-widest active:scale-95"
        >
          {React.createElement(FaPlus as any)} Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/80 border-b border-slate-800">
            <tr>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center w-24">Reference</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest w-32 text-center">Preview</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Name & Context</th>
              <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-6 text-center text-slate-600 font-mono text-xs">#{cat.id}</td>
                <td className="p-6 text-center">
                  <div className="relative w-14 h-14 mx-auto rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group-hover:border-amber-500/50 transition-colors">
                    <img 
                      src={cat.image_url || "https://via.placeholder.com/150"} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                </td>
                <td className="p-6">
                  <div className="font-black text-white text-lg tracking-tight uppercase group-hover:text-amber-500 transition-colors">{cat.name}</div>
                  <div className="text-slate-500 text-xs mt-1 max-w-md line-clamp-1">{cat.description}</div>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setEditData(cat);
                        setName(cat.name);
                        setDescription(cat.description);
                      }}
                      className="p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all"
                    >
                      {React.createElement(FaPenToSquare as any, { size: 14 })}
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      {React.createElement(FaTrash as any, { size: 14 })}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (Add & Edit) */}
      {(showAddModal || editData) && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex justify-center items-center z-[999] p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-lg shadow-3xl relative overflow-hidden">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

            <div className="p-8 flex justify-between items-center border-b border-slate-800/50">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                {showAddModal ? "New" : "Modify"} <span className="text-amber-500">Category</span>
              </h3>
              <button onClick={resetForm} className="text-slate-500 hover:text-white transition-all bg-slate-950 p-2 rounded-xl border border-slate-800">
                {React.createElement(FaXmark as any, { size: 20 })}
              </button>
            </div>

            <form onSubmit={showAddModal ? handleStore : handleUpdate} className="p-10 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Category Designation</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter classification name..."
                  value={name}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/[0-9]/.test(val)) {
                      Swal.fire({ title: "Validation", text: "Numbers not allowed in Category Name", icon: "warning", background: '#0f172a', color: '#fff' });
                      return;
                    }
                    setName(val);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-bold outline-none focus:border-amber-500 transition-all placeholder:text-slate-700"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Scope Description</label>
                <textarea 
                  value={description} 
                  required
                  placeholder="Detail the category parameters..."
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white font-medium outline-none focus:border-amber-500 transition-all placeholder:text-slate-700" 
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Cover Asset</label>
                <div className="relative border-2 border-dashed border-slate-800 rounded-2xl p-8 bg-slate-950/50 text-center hover:border-amber-500/50 transition-all cursor-pointer group">
                    <input 
                      type="file" 
                      onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center">
                      {React.createElement(FaPlus as any, { className: "text-slate-700 group-hover:text-amber-500 mb-3 transition-colors", size: 24 })}
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                        {imageFile ? imageFile.name : "Select Image Asset"}
                      </p>
                    </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-5 pt-4">
                <button type="button" onClick={resetForm} className="text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition">Discard</button>
                <button type="submit" className="bg-amber-600 text-white px-10 py-4 rounded-2xl hover:bg-amber-500 shadow-xl shadow-amber-600/20 transition-all font-black uppercase text-[10px] tracking-widest active:scale-95">
                  {showAddModal ? "Finalize Creation" : "Update Records"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;