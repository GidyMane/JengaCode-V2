"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { AuthModal } from "./auth-modal";
import { User, LogOut, Settings, Shield, Calendar } from "lucide-react";
import { toast } from "sonner";

export function UserNav() {
  const { user, signOut, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");

  const handleSignOut = async () => {
    await signOut();
    toast.success("You've been signed out successfully");
  };

  const openLogin = () => {
    setAuthTab("login");
    setShowAuthModal(true);
  };

  const openRegister = () => {
    setAuthTab("register");
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={openLogin}
            className="text-white hover:bg-white/10"
          >
            Sign In
          </Button>
          <Button
            onClick={openRegister}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
          >
            Join Now
          </Button>
        </div>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab={authTab}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-800 border-slate-600 text-white" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-gray-400">{user.email}</p>
            {user.isAdmin && (
              <div className="flex items-center space-x-1 mt-1">
                <Shield className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-400">Admin</span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-600" />
        <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        {user.isAdmin && (
          <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Attendance Admin</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-600" />
        <DropdownMenuItem 
          className="hover:bg-slate-700 cursor-pointer text-red-400 hover:text-red-300"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
