import Image from "next/image";
import { ArrowDown } from "lucide-react";
import heroBannerImg from "@/assets/banner.png";

export default function Hero() {
    return (
        <section className="bg-[#0a0a0a] text-white py-6 px-4 sm:px-8">

            <div className="max-w-7xl mx-auto bg-[#111217] border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    <div className="flex flex-col items-start gap-3 sm:gap-5 z-10">
                        <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">
                            WORKOUT LIBRARY
                        </span>

                        <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.05] text-white">
                            TRAIN WITH INTENT. LOG <br className="hidden sm:inline" />
                            EVERY SET.
                        </h1>

                        <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed font-sans">
                            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                            into today&apos;s plan, and watch the week&apos;s work add up.
                        </p>

                        <a
                            href="#library"
                            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3 rounded-md hover:bg-[#b3ff00] transition-colors mt-2 group"
                        >
                            <span>BROWSE WORKOUTS</span>
                            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        </a>
                    </div>

                    <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] flex items-center justify-center md:justify-end z-10">
                        <Image
                            src={heroBannerImg}
                            alt="FitLog Hero Banner"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}