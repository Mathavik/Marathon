import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dob: string;
  school_name: string;
  school_code: string;
  class: string;
  city: string;
}

const StudentRegister: React.FC = () => {
  const [schoolSuggestions, setSchoolSuggestions] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "Male",
    dob: "",
    school_name: "",
    school_code: "",
    class: "",
    city: "",
  });

  const [acceptedRules, setAcceptedRules] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "school_name") {
      if (value.trim().length === 0) {
        setSchoolSuggestions([]);
        return;
      }

      if (value.length > 0) {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/schools?q=${value}`
          );
          setSchoolSuggestions(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (name === "phone") {
      // Allow only numbers and limit to 10 digits
      const onlyNums = value.replace(/[^0-9]/g, "").slice(0, 10);

      setForm((prev) => ({
        ...prev,
        [name]: onlyNums,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!acceptedRules) {
    Swal.fire({
      icon: "warning",
      title: "Accept Rules",
      text: "Please accept Rules & Regulations",
    });
    return;
  }

  setIsLoading(true);

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/students",
      form
    );

    console.log("Response:", res.data); // 👈 debug

    Swal.fire({
      icon: "success",
      title: "Registered Successfully 🎉",
      text: "Check your email for confirmation 📩",
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => navigate("/login"), 2000);
  } catch (err: any) {
    console.log(err);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.message || "Something went wrong",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
<div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-row">
          {/* Left Side - Info Section */}
         {/* Left Side - Enhanced Sports Info Section */}
          <div className="hidden lg:flex w-2/5 bg-slate-950 p-10 text-white flex-col justify-between relative overflow-hidden">
            
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <span className="text-3xl">🏆</span>
                <h1 className="text-xl font-black tracking-widest uppercase text-yellow-500">FestHub 2026</h1>
              </div>

              <h2 className="text-5xl font-extrabold leading-tight mb-6">
                Unleash the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Athlete In You
                </span>
              </h2>

              <p className="text-gray-400 mb-10 max-w-sm leading-relaxed">
                Join thousands of students across the nation for the ultimate showdown of talent, speed, and spirit.
              </p>

              {/* Sports Image Grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="group overflow-hidden rounded-2xl aspect-square border-2 border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=300" 
                    alt="Athletics" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="group overflow-hidden rounded-2xl aspect-square border-2 border-white/10 mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=300" 
                    alt="Basketball" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
 <div className="group overflow-hidden rounded-2xl aspect-square border-2 border-white/10 -mt-6">
  <img 
    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400" 
    alt="Football" 
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
</div>
                <div className="group overflow-hidden rounded-2xl aspect-square border-2 border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1593787406536-3676a152d9cb?auto=format&fit=crop&q=80&w=300" 
                    alt="Badminton" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Event Stats */}
              <div className="flex gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-bold">50+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Events</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Schools</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8">
               <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black">
                    📩
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Questions? Email us</p>
                    <p className="text-sm font-semibold">support@festhub2026.com</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="flex-1 p-6 lg:p-8 bg-white">
            <div className="h-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Student Registration</h2>
                <p className="text-gray-500 text-sm">Fill in your details to join the celebration</p>
              </div>

              {message && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {/* School Name - Full Width */}
                  <div className="col-span-2 relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Name *
                    </label>
                    <input
                      type="text"
                      name="school_name"
                      placeholder="Type to search school..."
                      value={form.school_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                    />
                    {schoolSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 border rounded-lg bg-white max-h-32 overflow-y-auto z-10 shadow-lg mt-1">
                        {schoolSuggestions.map((school, idx) => (
                          <div
                            key={idx}
                            className="p-2 hover:bg-purple-50 cursor-pointer border-b last:border-b-0 text-sm"
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                school_name: school.school_name,
                                school_code: school.school_code,
                                email: school.email,
                                phone: school.phone,
                                city: school.city,
                              }));
                              setSchoolSuggestions([]);
                            }}
                          >
                            <p className="font-medium">{school.school_name}</p>
                            <p className="text-xs text-gray-500">{school.city} • {school.phone}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* School Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Code
                    </label>
                    <input
                      type="text"
                      name="school_code"
                      placeholder="School Code"
                      value={form.school_code}
                      // readOnly
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"

                    />
                  </div>

                  {/* School Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="school@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                      required
                    />
                  </div>

                  {/* Student Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none pr-8 text-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 text-sm"
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                      required
                    />
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class *
                    </label>
                    <input
                      type="text"
                      name="class"
                      placeholder="10th Grade"
                      value={form.class}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Rules Section */}
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2 text-sm">
                    <span>📜</span> Rules & Regulations
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-2 text-xs max-h-20 overflow-y-auto">
                    <ul className="list-disc pl-4 space-y-0.5 text-gray-600">
                      <li>Maximum 5 events per student allowed</li>
                      <li>No time clash between events</li>
                      <li>Age eligibility must be followed</li>
                      <li>Only one participant per school per event</li>
                      <li>Team events require valid members</li>
                      <li>Once registered, cannot be cancelled</li>
                    </ul>
                  </div>
                </div>

                {/* Accept Rules Checkbox */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="acceptRules"
                    checked={acceptedRules}
                    onChange={(e) => setAcceptedRules(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                  />
                  <label htmlFor="acceptRules" className="text-xs text-gray-700 cursor-pointer">
                    I agree to the <span className="text-purple-600 font-medium">Rules & Regulations</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!acceptedRules || isLoading}
                  className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition-all duration-200 text-sm ${acceptedRules && !isLoading
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg"
                      : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering...
                    </div>
                  ) : (
                    "Register Now 🚀"
                  )}
                </button>

                {/* Login Link */}
                <p className="text-center mt-3 text-xs text-gray-500">
                  Already have an account?{" "}
                  <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;