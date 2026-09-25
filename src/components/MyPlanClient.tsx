"use client";

import { useState } from "react";
import Link from "next/link";
import MetricsSummary from "@/components/MetricsSummary";
import MyPlanCard from "@/components/MyPlanCard";
import SortDropdown, { SortOption } from "@/components/SortDropdown";
import { useWorkoutContext } from "@/context/WorkoutContext";

export default function MyPlanClient() {
    const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
    const [sortBy, setSortBy] = useState<SortOption>("duration");

    const {
        todayPlan = [],
        savedWorkouts = [],
        removeFromTodayPlan,
        removeFromSaved,
        completedWorkouts = [],
        toggleCompleteWorkout,
        isLoading,
    } = useWorkoutContext();

    const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

    const sortedList = [...currentList].sort((a, b) => {
        if (sortBy === "duration") {
            const durA = typeof a.duration === "number" ? a.duration : parseInt(String(a.duration || 0), 10);
            const durB = typeof b.duration === "number" ? b.duration : parseInt(String(b.duration || 0), 10);
            return durA - durB;
        }
        if (sortBy === "calories") {
            const calAVal =
                a.caloriesBurned ??
                (a as unknown as { calories?: number | string }).calories ??
                0;
            const calBVal =
                b.caloriesBurned ??
                (b as unknown as { calories?: number | string }).calories ??
                0;
            const calA = typeof calAVal === "number" ? calAVal : parseInt(String(calAVal || 0), 10);
            const calB = typeof calBVal === "number" ? calBVal : parseInt(String(calBVal || 0), 10);
            return calB - calA;
        }
        if (sortBy === "rating") {
            return (b.rating || 0) - (a.rating || 0);
        }
        return 0;
    });

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                    MY PLAN
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                    Cap of <b className="text-[#ccff00]">Five</b> lifts for today. Finish them, then load more.
                </p>
            </div>

            <MetricsSummary workouts={currentList} />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 bg-[#0e0f17] p-1 rounded-2xl border border-white/5">
                    <button
                        onClick={() => setActiveTab("today")}
                        type="button"
                        className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${activeTab === "today"
                                ? "bg-[#181924] text-white shadow-md border border-white/10"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        type="button"
                        className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all ${activeTab === "saved"
                                ? "bg-[#181924] text-white shadow-md border border-white/10"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Saved
                    </button>
                </div>

                <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            {isLoading ? (
                <div className="py-20 text-center text-zinc-400 text-sm animate-pulse">
                    Loading workouts…
                </div>
            ) : sortedList.length === 0 ? (
                <div className="bg-[#0b0c10] border border-white/10 rounded-3xl p-12 sm:p-16 text-center my-6 space-y-4">
                    <h2 className="font-[family-name:var(--font-oswald)] text-xl sm:text-2xl font-black tracking-wider text-white uppercase">
                        NOTHING HERE YET
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mx-auto">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/"
                            className="inline-block px-7 py-3 rounded-full bg-[#ccff00] text-black font-extrabold text-xs sm:text-sm hover:bg-[#b8e600] transition-colors shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                        >
                            Go to workouts
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="space-y-3.5">
                    {sortedList.map((workout) => {
                        const isDone = completedWorkouts.includes(workout.id);
                        return (
                            <MyPlanCard
                                key={workout.id}
                                workout={workout}
                                isCompleted={activeTab === "today" ? isDone : false}
                                onToggleDone={
                                    activeTab === "today" ? toggleCompleteWorkout : undefined
                                }
                                onRemove={
                                    activeTab === "today"
                                        ? removeFromTodayPlan
                                        : removeFromSaved
                                }
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}