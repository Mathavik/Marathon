import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import Swal from "sweetalert2";
import PaymentPage from "./PaymentPreview";



const MarathonRegister = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "Male",
    dob: "",
    city: "",
    address: "",
    emergency_name: "",
    emergency_phone: "",
    tshirt_size: "M",
    category: "5K",
    medical_condition: ""
  });

  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // REGISTER
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/marathon/register", form);

      Swal.fire({
        icon: "success",
        title: "Registered Successfully 🏃",
        text: "Now login to continue"
      });

      setLogin({
        email: form.email,
        password: ""
      });

      setShowLogin(true);

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong"
      });
    }
  };

  // LOGIN
  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {

      const res = await axiosInstance.post("/login", login, {
        withCredentials: true
      });

      Swal.fire({
        icon: "success",
        title: "Login Success 🚀"
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user) {
        localStorage.setItem("student_id", res.data.user.id);
        localStorage.setItem("student_name", res.data.user.name);
        localStorage.setItem("student_email", res.data.user.email);
        localStorage.setItem("student_phone", res.data.user.phone || "");
      }

      setShowLogin(false);
      // Show payment modal after successful login
      setTimeout(() => {
        setShowPayment(true);
      }, 500);

    } catch (err: any) {

      Swal.fire({
        icon: "error",
        title: "Invalid Login",
        text: err.response?.data?.error || "Check email & password"
      });

    }
  };

  return (

    <div id="home-registration" className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-7xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-orange-500/20 shadow-2xl bg-[#0f172a]">

        {/* LEFT SIDE */}
        <div className="relative p-10 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-black via-[#111827] to-[#1e293b]">

          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-orange-500 p-3 rounded-xl">
                🏃
              </div>

              <h1 className="text-4xl font-black tracking-wide">
                MARATHON
                <span className="text-orange-500"> 2026</span>
              </h1>

            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Push Your Limits.
              <br />
              Run Beyond Fear.
            </h2>

            <p className="text-gray-400 text-lg leading-8 mb-10">
              Register now for the biggest marathon event of 2026.
              Join thousands of runners and challenge yourself
              with 5K, 10K, 21K & 42K categories.
            </p>

            {/* INFO CARDS */}
            <div className="space-y-5">

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">

                <div className="bg-orange-500/20 p-3 rounded-xl text-orange-500">
                  📍
                </div>

                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-sm text-gray-400">
                    Downtown City Marathon Route
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">

                <div className="bg-orange-500/20 p-3 rounded-xl text-orange-500">
                  📞
                </div>

                <div>
                  <h4 className="font-semibold">Contact</h4>
                  <p className="text-sm text-gray-400">
                    +91 98765 43210
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">

                <div className="bg-orange-500/20 p-3 rounded-xl text-orange-500">
                  ✉
                </div>

                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-gray-400">
                    info@marathon2026.com
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-[#0b1120] p-8 lg:p-12">

          <div className="mb-8">



            <h2 className="text-3xl font-bold">
              Create Your Runner Profile
            </h2>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-5"
          >

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, phone: value });
              }}
              maxLength={10}
              inputMode="numeric"
              className="inputStyle"
            />

            <select
              name="gender"
              onChange={handleChange}
              className="inputStyle"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              name="emergency_name"
              placeholder="Emergency Contact Name"
              onChange={handleChange}
              className="inputStyle"
            />

            <input
              type="text"
              name="emergency_phone"
              placeholder="Emergency Contact Phone"
              value={form.emergency_phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, emergency_phone: value });
              }}
              maxLength={10}
              inputMode="numeric"
              className="inputStyle"
            />

            <select
              name="tshirt_size"
              onChange={handleChange}
              className="inputStyle"
            >
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>

            <select
              name="category"
              onChange={handleChange}
              className="inputStyle"
            >
              <option>5K</option>
              <option>10K</option>
              <option>21K</option>
              <option>42K</option>
            </select>

            <textarea
              name="medical_condition"
              placeholder="Medical Condition (Optional)"
              onChange={handleChange}
              className="md:col-span-2 inputStyle min-h-[120px]"
            />

            <button
              className="md:col-span-2 bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-4 rounded-2xl font-bold text-lg tracking-wide shadow-lg shadow-orange-500/20"
            >
              REGISTER NOW
            </button>

          </form>

        </div>

      </div>

      {/* LOGIN MODAL */}
      {showLogin && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-[#111827] border border-orange-500/20 rounded-3xl p-8 w-[90%] max-w-md relative">

            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-5 top-4 text-xl text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-2">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mb-6">
              Login to continue your marathon journey.
            </p>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              <input
                className="inputStyle w-full"
                placeholder="Email"
                value={login.email}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    email: e.target.value
                  })
                }
              />

              <input
                type="password"
                className="inputStyle w-full"
                placeholder="Password"
                value={login.password}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    password: e.target.value
                  })
                }
              />

              <button
                className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-bold transition-all"
              >
                LOGIN
              </button>

            </form>

          </div>

        </div>

      )}

      {/* PAYMENT MODAL (shown after login) */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowPayment(false)}
              className="absolute -top-3 -right-3 bg-red-500 text-white w-10 h-10 rounded-full text-xl font-bold z-50"
            >
              ✕
            </button>

            <PaymentPage />

          </div>
        </div>
      )}

      {/* COMMON INPUT STYLE */}
      <style>
        {`
          .inputStyle{
            width:100%;
            background:#111827;
            border:1px solid rgba(255,255,255,0.08);
            padding:14px 16px;
            border-radius:16px;
            outline:none;
            color:white;
            transition:0.3s;
          }

          .inputStyle:focus{
            border-color:#f97316;
            box-shadow:0 0 0 4px rgba(249,115,22,0.15);
          }

          .inputStyle::placeholder{
            color:#9ca3af;
          }

          select.inputStyle{
            color:#d1d5db;
          }
        `}
      </style>

    </div>
  );
};

export default MarathonRegister;