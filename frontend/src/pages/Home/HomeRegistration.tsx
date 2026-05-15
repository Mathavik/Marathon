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

const HomeRegistration: React.FC = () => {
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

      try {
        const response = await axios.get(
          `http://localhost:8000/api/schools/search?name=${value}`
        );
        setSchoolSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    }
  };

  const handleSchoolSelect = (school: any) => {
    setForm((prev) => ({
      ...prev,
      school_name: school.name,
      school_code: school.code,
    }));
    setSchoolSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedRules) {
      setMessage("Please accept the rules and regulations.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/students", form);
      Swal.fire({
        title: "Registration Successful!",
        text: "Please proceed to payment.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/payment");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-black text-center mb-8 uppercase tracking-wide">
          Register for City Marathon 2026
        </h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Class</label>
              <input
                type="text"
                name="class"
                value={form.class}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">School Name</label>
              <input
                type="text"
                name="school_name"
                value={form.school_name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
              {schoolSuggestions.length > 0 && (
                <ul className="bg-gray-700 border border-gray-600 rounded-lg mt-2 max-h-40 overflow-y-auto">
                  {schoolSuggestions.map((school) => (
                    <li
                      key={school.id}
                      onClick={() => handleSchoolSelect(school)}
                      className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                    >
                      {school.name} ({school.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={acceptedRules}
                onChange={(e) => setAcceptedRules(e.target.checked)}
                className="mr-2"
                required
              />
              <span className="text-sm">
                I accept the{" "}
                <a href="#" className="text-orange-500 underline">
                  rules and regulations
                </a>
              </span>
            </label>
          </div>
          {message && <p className="mt-4 text-red-500">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-orange-500 px-6 py-3 rounded-full font-bold text-white hover:bg-orange-600 transition disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default HomeRegistration;