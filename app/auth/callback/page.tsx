"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { isLoading } = useKindeAuth();
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const [message, setMessage] = useState("Processing your login...");

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (isLoading) {
          return;
        }

        const response = await fetch("/api/auth/sync-user");
        const data = await response.json();

        if (!response.ok) {
          setStatus("error");
          setMessage(
            data.error || "Access denied. Only authorized admins can access this system."
          );
          return;
        }

        setStatus("success");
        setMessage("Login successful! Redirecting to admin portal...");
        
        // Redirect to admin after a short delay
        setTimeout(() => {
          router.push("/admin");
        }, 500);
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to process login. Please try again."
        );
      }
    };

    syncUser();
  }, [isLoading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="text-center">Authentication</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-cyan-400" />
              <p className="text-gray-300">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-300">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-red-300 font-medium">{message}</p>
              <LogoutLink>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Sign Out
                </Button>
              </LogoutLink>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
