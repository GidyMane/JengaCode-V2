"use client";

import React from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle as CardUITitle } from "@/components/ui/card";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultTab = "login",
}: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>JengaCode</DialogTitle>
        </DialogHeader>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardUITitle className="text-white">Sign In to JengaCode</CardUITitle>
            <CardDescription className="text-gray-400">
              Access your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginLink>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
                Sign In with Kinde
              </Button>
            </LoginLink>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
