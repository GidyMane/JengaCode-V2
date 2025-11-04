"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AdminSidebarNav } from "./sidebar-nav";
import { AdminTopbar } from "./topbar";
import { Loader2 } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  requiredRoles?: string[];
}

export function AdminLayout({
  children,
  title,
  requiredRoles = ["Admin", "Editor", "Volunteer"],
}: AdminLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirectTo=/admin");
    } else if (!loading && user && !requiredRoles.includes(user.role)) {
      router.push("/");
    }
  }, [user, loading, router, requiredRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-jengacode-purple animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !requiredRoles.includes(user.role)) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      {/* Sidebar - Hidden on mobile by default */}
      <div className="hidden lg:block">
        <AdminSidebarNav />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50">
          <div className="bg-white dark:bg-slate-950 w-64 h-screen overflow-y-auto">
            <AdminSidebarNav />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <AdminTopbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title={title}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
