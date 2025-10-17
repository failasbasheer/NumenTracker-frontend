"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, LogOut, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------- TYPES ----------------------
interface UserType {
  name?: string;
  phone?: string;
}

// ---------------------- UTILS ----------------------
// Retrieve user from localStorage
const getStoredUser = (): UserType | null => {
  const stored = window.localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

// ---------------------- COMPONENTS ----------------------

// Desktop User Dropdown
function UserDropdown({ user, onLogout }: { user: UserType; onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 bg-gray-950 hover:bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-200 transition-colors"
      >
        <User className="h-4 w-4 text-gray-400" />
        {user.name ?? user.phone}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-red-950 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------- MAIN NAVBAR ----------------------
export function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load user info on mount
  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  // Handle user logout
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    router.replace("/login");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Nav links (can be expanded easily)
  const NAV_LINKS = [
    { label: "Dashboard", href: "/" },
    { label: "Add Transaction", href: "/add" },
  ];

  return (
    <header className="w-full bg-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">

        {/* LOGO + BRAND */}
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-lg text-white hover:text-gray-300 transition-colors"
        >
          <Image
            src="/logo.png"
            alt="Numen Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-white text-xl font-bold">Numen</span>
            <span className="text-gray-500 text-sm tracking-wide">
              Track. Understand. Grow.
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {user && <UserDropdown user={user} onLogout={handleLogout} />}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden flex items-center text-gray-200 hover:text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black border-t border-gray-800"
          >
            <div className="flex flex-col px-6 py-4 gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <div className="relative">
                  <UserDropdown
                    user={user}
                    onLogout={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
