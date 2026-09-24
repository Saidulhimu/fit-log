"use client";

import { PlusSquare, Bookmark, Check } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";

export default function WorkoutActions({ workout }: { workout: Workout }) {
    const { addToPlan, addToSaved, plan, saved } = useWorkout();

    const isInPlan = plan.some((item) => item.id === workout.id);
    const isSaved = saved.some((item) => item.id === workout.id);

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
                onClick={() => addToPlan(workout)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b3ff00] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase py-3.5 px-5 rounded-xl transition-all duration-200 shadow-lg shadow-[#ccff00]/10 active:scale-[0.98]"
            >
                {isInPlan ? (
                    <>
                        <Check size={18} strokeWidth={2.5} /> ADDED TO PLAN
                    </>
                ) : (
                    <>
                        <PlusSquare size={18} strokeWidth={2.5} /> Add to today&apos;s plan
                    </>
                )}
            </button>

            <button
                onClick={() => addToSaved(workout)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#161821] hover:bg-[#1e202c] border border-white/10 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase py-3.5 px-5 rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
                {isSaved ? (
                    <>
                        <Check size={18} className="text-[#ccff00]" strokeWidth={2.5} /> SAVED
                    </>
                ) : (
                    <>
                        <Bookmark size={18} className="text-gray-400" strokeWidth={2.5} /> Save for later
                    </>
                )}
            </button>
        </div>
    );
}