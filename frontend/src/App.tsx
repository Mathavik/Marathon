import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./pages/CategoriesEvents.tsx/Categories";
import AdminRoutes from "./admin/components/AdminRoutes";
import StudentRegister from "./pages/StudentRegister";
import Login from "./components/Login";
import EventsByCategory from "./pages/CategoriesEvents.tsx/EventsByCategory";
import Home from "./pages/Home/home";
import PaymentPage from "./pages/Home/PaymentPage";
import Schedule from "./pages/Schedule/Schedule";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import AdsDisplay from "./pages/AdsDisplay/AdsDisplay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
        <ToastContainer position="top-right" autoClose={3000} />
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/events/:id" element={<EventsByCategory />} />
          <Route path="/payment" element={<PaymentPage/>} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/ads" element={<AdsDisplay/>}/>

        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;