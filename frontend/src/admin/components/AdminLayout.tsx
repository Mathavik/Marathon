import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      
      {/* Sidebar - fixed */}
      <div className="h-full">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header - fixed */}
        <div className="shrink-0">
          <AdminHeader />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;