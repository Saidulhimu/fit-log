import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Dumbbell, Star } from "lucide-react";
import { Workout } from "@/types/workout";
import WorkoutActions from "@/components/WorkoutActions";
import { notFound } from "next/navigation";

async function getWorkout(id: string): Promise<Workout | null> {
    try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
            cache: "no-store",
        });
        if (!res.ok) return null;
        const data = await res.json();
        const list: Workout[] = Array.isArray(data)
            ? data
            : data.data || data.workouts || [];

        return list.find((item) => String(item.id) === String(id)) || null;
    } catch (err) {
        return null;
    }
}

export default async function WorkoutDetailPage({
    params,
}: {
    params: Promise<{ id: string }> | { id: string };
}) {
    const resolvedParams = await params;
    const workout = await getWorkout(resolvedParams.id);

    if (!workout) {
        notFound();
    }

    return (
        <div className="bg-[#050608] text-white min-h-screen py-8 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#ccff00] transition-colors text-xs sm:text-sm mb-8 font-semibold tracking-wide group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Library
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] lg:h-[580px] bg-[#0c0d12] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                        {workout.image ? (
                            <>
                                <Image
                                    src={workout.image}
                                    alt={workout.name}
                                    fill
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                    priority
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent opacity-80" />
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#0c0d12]">
                                <Dumbbell className="w-20 h-20 text-zinc-700" />
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <div className="space-y-3">


                            <h1 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none">
                                {workout.name}
                            </h1>

                            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                                {workout.description ||
                                    "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {workout.muscleGroups?.map((group, idx) => (
                                    <span
                                        key={idx}
                                        className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30"
                                    >
                                        {group}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0c0d12] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3">
                            <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-white/5">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                                    EQUIPMENT
                                </span>
                                <span className="text-zinc-200 font-semibold text-right">
                                    {workout.equipment || "Barbell, Bench"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-white/5">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                                    DIFFICULTY
                                </span>
                                <span className="text-zinc-200 font-semibold capitalize">
                                    {workout.difficulty || "Intermediate"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-white/5">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                                    SETS & REPS
                                </span>
                                <span className="text-zinc-200 font-semibold">
                                    {workout.sets ?? 4} Sets × {workout.reps || "6-8"} Reps
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-white/5">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                                    DURATION
                                </span>
                                <span className="text-zinc-200 font-semibold">{workout.duration} min</span>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-white/5">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                                    EST. CALORIES
                                </span>
                                <span className="text-zinc-200 font-semibold">{workout.caloriesBurned} kcal</span>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm pt-2">
                                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                                    RATING
                                </span>
                                <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                                    <Star size={14} className="fill-[#ccff00] text-[#ccff00]" />
                                    {workout.rating ? Number(workout.rating).toFixed(1) : "4.8"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className="font-[family-name:var(--font-oswald)] text-sm sm:text-base font-bold uppercase tracking-wider text-zinc-300">
                                INSTRUCTIONS
                            </h2>

                            {workout.instructions && workout.instructions.length > 0 ? (
                                <div className="space-y-2.5">
                                    {workout.instructions.map((step, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 p-3 rounded-xl bg-[#0c0d12] border border-white/5 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                                        >
                                            <span className="w-5 h-5 rounded-md bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] font-bold text-[11px] flex items-center justify-center shrink-0">
                                                {idx + 1}
                                            </span>
                                            <span>{step}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-zinc-500 italic">No instructions available.</p>
                            )}
                        </div>

                        <WorkoutActions workout={workout} />
                    </div>
                </div>
            </div>
        </div>
    );
}