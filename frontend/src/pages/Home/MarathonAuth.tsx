import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import Swal from "sweetalert2";
import PaymentPage from "../Home/PaymentPreview";

const MarathonAuth = () => {

  const [showLogin, setShowLogin] = useState(false);

  const [showPayment, setShowPayment] = useState(false);

  // =========================
  // REGISTER STATE
  // =========================
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: ""
  });

  // =========================
  // LOGIN STATE
  // =========================
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async (e: any) => {

    e.preventDefault();

    try {

      await axiosInstance.post(
        "/marathon/register",
        register
      );

      Swal.fire({
        icon: "success",
        title: "Registered Successfully 🎉",
        text: "Now login to continue"
      });

      // OPEN LOGIN MODAL
      setShowLogin(true);

    } catch (err: any) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Registration Failed"
      });
    }
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e: any) => {

    e.preventDefault();

    try {

      const res = await axiosInstance.post(
        "/login",
        login
      );

      // SUCCESS ALERT
      Swal.fire({
        icon: "success",
        title: "Login Success 🚀"
      });

      // =========================
      // SAVE USER DATA
      // =========================
      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "student_id",
        res.data.user.id
      );

      localStorage.setItem(
        "student_name",
        res.data.user.name
      );

      localStorage.setItem(
        "student_email",
        res.data.user.email
      );

      localStorage.setItem(
        "student_phone",
        res.data.user.phone || ""
      );

      // CLOSE LOGIN MODAL
      setShowLogin(false);

      // SHOW PAYMENT PAGE
     setTimeout(() => {
  setShowPayment(true);
}, 500);

    } catch (err: any) {

      Swal.fire({
        icon: "error",
        title: "Invalid Login",
        text:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Check email & password"
      });
    }
  };

  // =========================
  // SHOW PAYMENT PAGE
  // =========================
  {showPayment && (
  <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center p-4 overflow-y-auto">
    
    <div className="relative w-full max-w-5xl">

      {/* CLOSE BUTTON */}
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

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* REGISTER FORM */}
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-3"
      >

        <h2 className="text-2xl font-bold text-center">
          Marathon Register
        </h2>

        {/* NAME */}
        <input
          type="text"
          className="w-full border p-3 rounded-lg"
          placeholder="Name"
          value={register.name}
          onChange={(e) =>
            setRegister({
              ...register,
              name: e.target.value
            })
          }
        />

        {/* EMAIL */}
        <input
          type="email"
          className="w-full border p-3 rounded-lg"
          placeholder="Email"
          value={register.email}
          onChange={(e) =>
            setRegister({
              ...register,
              email: e.target.value
            })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full border p-3 rounded-lg"
          placeholder="Password"
          value={register.password}
          onChange={(e) =>
            setRegister({
              ...register,
              password: e.target.value
            })
          }
        />

        {/* REGISTER BUTTON */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">

          Register

        </button>

      </form>

      {/* LOGIN MODAL */}
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

            <h2 className="text-2xl font-bold mb-5 text-center">
              Login
            </h2>

            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >

              {/* EMAIL */}
              <input
                type="email"
                className="w-full border p-3 rounded-lg"
                placeholder="Email"
                value={login.email}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    email: e.target.value
                  })
                }
              />

              {/* PASSWORD */}
              <input
                type="password"
                className="w-full border p-3 rounded-lg"
                placeholder="Password"
                value={login.password}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    password: e.target.value
                  })
                }
              />

              {/* LOGIN BUTTON */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">

                Login

              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default MarathonAuth;