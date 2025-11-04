"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/auth/user-nav";
import { useAuth } from "@/lib/auth";
import { Menu, X, Calendar, Shield } from "lucide-react";

export function Navigation() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/challenges", label: "Challenges" },
    { href: "/contact", label: "Contact" },
  ];

  const userNavItems = isClient && user ? [
    { href: "/dashboard", label: "My Dashboard", icon: Calendar },
    ...(user.isAdmin ? [
      { href: "/admin/attendance", label: "Admin Panel", icon: Shield },
      { href: "/admin/summer-camp-attendance", label: "Summer Camp", icon: Calendar }
    ] : []),
  ] : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-jengacode-cyan to-jengacode-purple rounded-full flex items-center justify-center border-2 border-jengacode-cyan"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white font-bold text-sm">{"<J>"}</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-jengacode-cyan to-jengacode-purple bg-clip-text text-transparent">
              JengaCode
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-jengacode-cyan transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
            ))}
            {isClient && userNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-jengacode-cyan transition-colors duration-300 font-medium flex items-center"
              >
                <item.icon className="w-4 h-4 mr-1" />
                {item.label}
              </Link>
            ))}
            {isClient && <UserNav />}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-br from-jengacode-purple/95 to-jengacode-cyan/95 backdrop-blur-lg border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white hover:text-jengacode-cyan-light transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isClient && userNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white hover:text-jengacode-cyan-light transition-colors duration-300 font-medium py-2 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
              {isClient && (
                <div className="pt-4">
                  <UserNav />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
