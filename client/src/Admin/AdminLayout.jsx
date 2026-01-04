import React from "react";
// src/Admin/AdminLayout.jsx
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-black text-white">
        {children}
      </main>
    </div>
  );
}

