"use client";

import React, { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { AdminSidebarNav } from "./sidebar-nav";
import { AdminTopbar } from "./topbar";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KindeAdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  requiredRoles?: string[];
}

export function KindeAdminLayout({
  children,
  title,
  requiredRoles = ["admin", "editor", "volunteer"],
}: KindeAdminLayoutProps) {
  const { user, isLoading, isAuthenticated } = useKindeAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-jengacode-purple animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Restricted</h1>
          <p className="text-gray-600 dark:text-gray-400">You need to be signed in to access this page.</p>
          <LoginLink>
            <Button className="bg-jengacode-purple hover:bg-jengacode-purple/90 text-white">
              Sign In
            </Button>
          </LoginLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <div className="hidden lg:block">
        <AdminSidebarNav />
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50">
          <div className="bg-white dark:bg-slate-950 w-64 h-screen overflow-y-auto">
            <AdminSidebarNav />
          </div>
        </div>
      )}

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
