import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Events from "../pages/adminEvents";
import Registrations from "../pages/Registrations";
import Winners from "../pages/Winners";
import AdminGallery from "../pages/AdminGallery";
import AdminLayout from "./AdminLayout";
import SchoolReport from "../pages/SchoolReport";
import CreateAd from "./CreateAd";
import OverallWinners from "../pages/OverallWinners";
import AdminLogin from "./AdminLogin";
import CertificateSettings from "../pages/CertificateSettings";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminRegistrationsPage from "../pages/AdminRegistrationsPage";
import ParticipationCertificate from "../pages/ParticipationCertificate";
const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 🔓 Public Route */}
      <Route path="adminlogin" element={<AdminLogin />} />

      {/* 🔐 Protected Routes */}
      <Route
        path="*"
        element={
         <AdminProtectedRoute>
            <AdminLayout>
            <Routes>
              <Route index element={<Navigate to="admindashboard" replace />} />
              <Route path="admindashboard" element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="adminEvents" element={<Events />} />
              <Route path="adminGallery" element={<AdminGallery />} />
              <Route path="registrations" element={<Registrations />} />
              <Route path="certificate" element={<CertificateSettings />} />

              <Route path="winners" element={<Winners />} />
              <Route path="school-report" element={<SchoolReport />} />
              <Route path="ads" element={<CreateAd />} />
              <Route path="overall-winners" element={<OverallWinners />} />
               <Route path="adminregistrationspage" element={<AdminRegistrationsPage />} />

               <Route path="participation-certificate" element={<ParticipationCertificate />} />
            </Routes>
        </AdminLayout>
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;