import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-6 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src={logoImg}
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-white font-extrabold text-lg tracking-wider font-sans">
            FITLOG
          </span>
        </Link>

        <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}