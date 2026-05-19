import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import Swal from "sweetalert2";

const MarathonRegister = () => {
  // REGISTER STATE
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

  // LOGIN POPUP STATE
  const [showLogin, setShowLogin] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  // HANDLE REGISTER INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // REGISTER API
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/marathon/register", form);

      Swal.fire({
        icon: "success",
        title: "Registered Successfully 🏃‍♂️",
        text: "Now login to continue"
      });

      // 👉 OPEN LOGIN POPUP WITH EMAIL AUTO FILL
      setLogin({
        email: form.email,
        password: ""
      });

      setShowLogin(true);

      // RESET FORM
      setForm({
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

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong"
      });
    }
  };

  // LOGIN API
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

      // token save (if backend sends token)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ SAVE USER DATA TO LOCAL STORAGE (FIX FOR PAYMENT PAGE)
      if (res.data.user) {
        localStorage.setItem("student_id", res.data.user.id);
        localStorage.setItem("student_name", res.data.user.name);
        localStorage.setItem("student_email", res.data.user.email);
        localStorage.setItem("student_phone", res.data.user.phone || "");
      }

      setShowLogin(false);

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Invalid Login",
        text: err.response?.data?.error || "Check email & password"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      {/* REGISTER FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl grid grid-cols-2 gap-4"
      >
        <input name="name" placeholder="Name" onChange={handleChange} className="input" />
        <input name="email" placeholder="Email" onChange={handleChange} className="input" />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />

        <select name="gender" onChange={handleChange} className="input">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input type="date" name="dob" onChange={handleChange} className="input" />

        <input name="city" placeholder="City" onChange={handleChange} className="input" />
        <input name="address" placeholder="Address" onChange={handleChange} className="input" />

        <input name="emergency_name" placeholder="Emergency Name" onChange={handleChange} className="input" />
        <input name="emergency_phone" placeholder="Emergency Phone" onChange={handleChange} className="input" />

        <select name="tshirt_size" onChange={handleChange} className="input">
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>

        <select name="category" onChange={handleChange} className="input">
          <option>5K</option>
          <option>10K</option>
          <option>21K</option>
          <option>42K</option>
        </select>

        <textarea
          name="medical_condition"
          placeholder="Medical Condition (optional)"
          onChange={handleChange}
          className="col-span-2 input"
        />

        <button className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Register
        </button>
      </form>

      {/* LOGIN POPUP */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-96 relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">Login</h2>

            <form onSubmit={handleLogin} className="space-y-3">

              <input
                className="w-full border p-2 rounded"
                placeholder="Email"
                value={login.email}
                onChange={(e) =>
                  setLogin({ ...login, email: e.target.value })
                }
              />

              <input
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Password"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />

              <button className="w-full bg-green-600 text-white py-2 rounded">
                Login
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarathonRegister;