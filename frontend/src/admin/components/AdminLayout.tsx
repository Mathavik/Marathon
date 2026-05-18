import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-white">
      
      {/* Sidebar - fixed */}
      <div className="h-full">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#050816]">
        
        {/* Header - fixed */}
        <div className="shrink-0">
          <AdminHeader />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#050816]">
          <div className="mx-auto w-full max-w-[1700px] space-y-6">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;