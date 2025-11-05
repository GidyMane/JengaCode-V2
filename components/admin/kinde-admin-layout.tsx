"use client";

import React, { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
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
  requiredRoles = ["admin"],
}: KindeAdminLayoutProps) {
  const { user, isLoading, isAuthenticated } = useKindeAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [dbUser, setDbUser] = useState<any>(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user from database to check role
  useEffect(() => {
    const fetchDbUser = async () => {
      if (!isAuthenticated || !user) {
        setDbLoading(false);
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch("/api/auth/user", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const userData = await response.json();
          setDbUser(userData);
          // Check if user has required role
          if (!requiredRoles.includes(userData.role)) {
            setAccessDenied(true);
          }
        } else {
          console.error("Failed to fetch user - status:", response.status);
          setAccessDenied(true);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setAccessDenied(true);
      } finally {
        setDbLoading(false);
      }
    };

    fetchDbUser();
  }, [isAuthenticated, user, requiredRoles]);

  if (!mounted || isLoading || dbLoading) {
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

  if (accessDenied || !dbUser || !requiredRoles.includes(dbUser.role)) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">You don't have permission to access the admin portal.</p>
          <LogoutLink>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Sign Out
            </Button>
          </LogoutLink>
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
