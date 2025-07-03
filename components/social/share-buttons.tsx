"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Share2,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Copy,
  Link,
} from "lucide-react";

interface ShareButtonsProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string;
  variant?: "default" | "floating" | "compact";
}

export function ShareButtons({
  title = "JengaCode Summer Coding Camp",
  text = "Join us for an amazing 2-day coding adventure! Learn robotics, Scratch programming, web development, and so much more. All skill levels welcome!",
  url = typeof window !== "undefined" ? window.location.href : "",
  className = "",
  variant = "default",
}: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title,
    text,
    url,
  };

  const handleWhatsAppShare = () => {
    const whatsappText = encodeURIComponent(`${title}\n\n${text}\n\n${url}`);
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp...");
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
    toast.success("Opening Facebook...");
  };

  const handleTwitterShare = () => {
    const twitterText = encodeURIComponent(`${title} ${text}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
    toast.success("Opening Twitter...");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${text}\n\nCheck it out: ${url}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
    toast.success("Opening email client...");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          toast.error("Sharing failed");
        }
      }
    } else {
      setIsOpen(true);
    }
  };

  if (variant === "floating") {
    return (
      <motion.div
        className={`fixed bottom-6 left-6 z-50 ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleWhatsAppShare}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Button
          onClick={handleWhatsAppShare}
          size="sm"
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
        <Button onClick={handleCopyLink} size="sm" variant="outline">
          <Copy className="w-4 h-4 mr-2" />
          Copy Link
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleNativeShare}
          className={`bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 px-6 py-3 rounded-full ${className}`}
        >
          <Share2 className="mr-2 w-5 h-5" />
          Share with Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-700 border-cyan-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Share the Adventure!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Help us spread the word about JengaCode! Share with your friends and
            family.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleWhatsAppShare}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleFacebookShare}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleTwitterShare}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleEmailShare}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </motion.div>
          </div>

          <div className="pt-4 border-t border-gray-600">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-full border-gray-500 text-gray-300 hover:bg-gray-600"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
            </motion.div>
          </div>

          <div className="text-xs text-gray-400 text-center">
            <p>Share responsibly and help grow our coding community! 🚀</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Quick WhatsApp share hook for easy integration
export function useWhatsAppShare() {
  return (title: string, text: string, url: string = window.location.href) => {
    const whatsappText = encodeURIComponent(`${title}\n\n${text}\n\n${url}`);
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp...");
  };
}
