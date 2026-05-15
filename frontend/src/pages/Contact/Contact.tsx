import { useState } from "react";
import api from "../../api";
import { Mail, MessageSquare, User, Send, MapPin, Phone } from "lucide-react"; 

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert("Please fill in required fields! ✨");
    try {
      setLoading(true);
      await api.post("/contact", form);
      alert("✅ Message Sent Successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("❌ Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden bg-[#0f172a]">
      
      {/* --- Animated Background Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* --- Main Glass Container --- */}
      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 backdrop-blur-xl bg-white/5 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* LEFT SIDE: Visual/Info Hero */}
        <div className="relative p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-amber-500/10 to-transparent">
          <div>
            <h2 className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-2">Get in touch</h2>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Let’s build something <span className="text-amber-400">extraordinary</span> together.
            </h1>
            <p className="text-slate-400 mt-6 max-w-md">
              Have a question or a project in mind? Drop a message and I'll get back to you within 24 hours.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex items-center space-x-4 text-slate-300 group">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                <Mail size={20} className="text-amber-400" />
              </div>
              <span>hello@yourdomain.com</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-300 group">
              <div className="p-3 bg-white/5 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                <MapPin size={20} className="text-amber-400" />
              </div>
              <span>Tamil Nadu, India</span>
            </div>
          </div>

          <div className="mt-12 flex space-x-4">
             {/* Add Social Icons here if needed */}
             <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500/20 transition-all cursor-pointer">✨</div>
          </div>
        </div>

        {/* RIGHT SIDE: The Form */}
        <div className="p-8 lg:p-12 bg-white/5 backdrop-blur-md">
          <div className="space-y-5">
            
            <div className="relative">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-900/50 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-slate-900/50 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Subject</label>
              <div className="relative mt-1">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full bg-slate-900/50 border border-white/10 p-4 pl-12 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your idea..."
                rows={4}
                className="w-full mt-1 bg-slate-900/50 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`group relative w-full py-4 rounded-2xl font-bold text-slate-900 transition-all overflow-hidden ${
                loading ? "bg-slate-600 cursor-not-allowed" : "bg-amber-400 hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Processing..." : "Send Message"}
                {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </span>
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
}