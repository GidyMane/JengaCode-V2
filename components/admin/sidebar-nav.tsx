"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Image,
  Zap,
  MessageSquare,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKindeAuth, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  requiredRole?: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/admin",
  },
  {
    title: "Events",
    icon: <Calendar className="w-5 h-5" />,
    href: "/admin/events",
    //  requiredRole: ["Admin"],
  },
  {
    title: "Blog",
    icon: <BookOpen className="w-5 h-5" />,
    href: "/admin/blog",
  },
  {
    title: "Media",
    icon: <Image className="w-5 h-5" />,
    href: "/admin/media",
  },
  {
    title: "Challenges",
    icon: <Zap className="w-5 h-5" />,
    href: "/admin/challenges",
  },
  {
    title: "Testimonials",
    icon: <MessageSquare className="w-5 h-5" />,
    href: "/admin/testimonials",
  },
  {
    title: "Team",
    icon: <Users className="w-5 h-5" />,
    href: "/admin/team",
  },
  {
    title: "Users",
    icon: <Settings className="w-5 h-5" />,
    href: "/admin/users",
    requiredRole: ["Admin"],
  },
];

export function AdminSidebarNav() {
  const pathname = usePathname();
  const { user, getAccessToken } = useKindeBrowserClient();
  const atok = getAccessToken();

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-jengacode-purple to-purple-900 text-white flex z-50 flex-col shadow-lg">
      <div className="p-6 border-b border-purple-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-jengacode-cyan flex items-center justify-center font-bold text-purple-900">
            JC
          </div>
          <div>
            <h1 className="font-bold text-lg">JengaCode</h1>
            <p className="text-xs text-purple-200">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto z-50">
        {NAV_ITEMS.map((item, idx) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const shouldShow = !item.requiredRole || item.requiredRole.includes(atok?.roles?.[0].name || "");

          if (!shouldShow) return null;

          return (
            <Button
              key={idx}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-white hover:bg-purple-700",
                isActive && "bg-jengacode-cyan text-purple-900 hover:bg-jengacode-cyan"
              )}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                {item.title}
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-purple-800 space-y-2">
        <div className="px-2 py-3 bg-purple-800 rounded-lg">
          <p className="text-sm font-semibold">
            {user?.given_name && user?.family_name
              ? `${user.given_name} ${user.family_name}`
              : user?.email || "Admin"}
          </p>
          <p className="text-xs text-purple-300">{user?.email || "admin"}</p>
        </div>
        <LogoutLink>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-white border-purple-700 hover:bg-purple-800"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </LogoutLink>
      </div>
    </div>
  );
}
