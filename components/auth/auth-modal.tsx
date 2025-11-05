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
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Join</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardUITitle className="text-white">Sign In to JengaCode</CardUITitle>
                <CardDescription className="text-gray-400">
                  Access your account and start coding
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
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardUITitle className="text-white">Join JengaCode</CardUITitle>
                <CardDescription className="text-gray-400">
                  Start your coding journey today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterLink>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                    Create Account
                  </Button>
                </RegisterLink>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
