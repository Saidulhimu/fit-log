"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/10 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white font-extrabold text-xl tracking-wider font-sans">
            FITLOG
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/")
                ? "bg-[#1c2e05] text-[#ccff00] border border-[#ccff00]/30 shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/my-plan")
                ? "bg-[#1c2e05] text-[#ccff00] border border-[#ccff00]/30 shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-md">
              {plan.length}
            </span>
          </Link>


          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="border border-gray-600 text-gray-300 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-400 hover:text-white focus:outline-none p-1"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isActive("/")
                ? "bg-[#1c2e05] text-[#ccff00]"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isActive("/my-plan")
                ? "bg-[#1c2e05] text-[#ccff00]"
                : "text-gray-300 hover:bg-white/5"
            }`}
          >
            My Plan
          </Link>

          <div className="flex items-center gap-4 px-4 pt-2 border-t border-white/5">
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <span>Plan</span>
              <span className="bg-[#ccff00] text-black font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {plan.length}
              </span>
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <span>Saved</span>
              <span className="border border-gray-600 text-gray-300 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}