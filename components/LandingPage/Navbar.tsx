"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "@/config";
import { useConfigColors } from "@/hooks/useConfigColors";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Why Us", href: "#why" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const colors = useConfigColors();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <header className="max-w-7xl mx-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl">
          <nav className="px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="#" className="font-naturaly text-3xl text-white hover:text-white/90 transition-colors">
                {config.appName}
              </a>

              {/* Desktop navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-4">
                <button className="px-4 py-2 text-white/70 hover:text-white transition-colors">
                  Login
                </button>
                <button 
                  className="px-4 py-2 text-black rounded-xl hover:opacity-90 transition-colors"
                  style={{ backgroundColor: colors.accent }}
                >
                  Early Access
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-x-4 top-24 bottom-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="flex flex-col justify-center items-center p-8 h-full">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/70 hover:text-white transition-colors py-4 text-lg"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col items-center gap-4 mt-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-8 py-3 text-white/70 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-8 py-3 text-black rounded-xl hover:opacity-90 transition-colors"
                    style={{ backgroundColor: colors.accent }}
                  >
                    Early Access
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 