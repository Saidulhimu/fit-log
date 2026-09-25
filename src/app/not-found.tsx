import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-[family-name:var(--font-oswald)] text-7xl sm:text-9xl font-black text-[#ccff00] tracking-tight">
        404
      </h1>
      <h2 className="font-[family-name:var(--font-oswald)] text-2xl sm:text-3xl font-bold text-white uppercase mt-4 mb-2">
        PAGE NOT FOUND
      </h2>
      <p className="text-zinc-400 text-xs sm:text-sm max-w-md mb-8">
        The lift or page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#ccff00] text-black font-extrabold text-xs sm:text-sm hover:bg-[#b8e600] transition-colors shadow-[0_0_15px_rgba(204,255,0,0.25)]"
      >
        Back to Workouts
      </Link>
    </div>
  );
}