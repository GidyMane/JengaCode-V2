"use client";

import React, { useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  onMenuToggle?: () => void;
  title?: string;
}

export function AdminTopbar({ onMenuToggle, title }: TopbarProps) {
  const { user } = useKindeAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-gradient-to-r from-jengacode-purple to-purple-700 border-b border-purple-800 h-16 flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden hover:bg-purple-600 text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
        {title && (
          <h1 className="text-xl font-semibold text-white">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jengacode-purple to-jengacode-cyan flex items-center justify-center text-white font-semibold text-sm">
                {(user?.given_name || user?.email)?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.given_name && user?.family_name
                    ? `${user.given_name} ${user.family_name}`
                    : user?.email || "Admin"}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user?.email || "admin"}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.given_name && user?.family_name
                  ? `${user.given_name} ${user.family_name}`
                  : user?.email || "Admin"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutLink>
              <DropdownMenuItem className="text-red-600 dark:text-red-400 cursor-pointer">
                Logout
              </DropdownMenuItem>
            </LogoutLink>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
