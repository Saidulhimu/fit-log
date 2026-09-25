"use client";

import { Workout } from "@/types/workout";

interface MetricsSummaryProps {
    workouts: Workout[];
}

export default function MetricsSummary({ workouts = [] }: MetricsSummaryProps) {
    const totalExercises = workouts.length;

    const totalMinutes = workouts.reduce((acc, curr) => {
        const dur =
            typeof curr.duration === "number"
                ? curr.duration
                : parseInt(String(curr.duration || 0), 10) || 0;
        return acc + dur;
    }, 0);

    const totalCalories = workouts.reduce((acc, curr) => {
        const calVal =
            curr.caloriesBurned ??
            (curr as Workout & { calories?: unknown }).calories ??
            0;
        const cal =
            typeof calVal === "number"
                ? calVal
                : parseInt(String(calVal || 0), 10) || 0;
        return acc + cal;
    }, 0);

    return (
        <div className="bg-[#0e0f17] border border-white/10 rounded-2xl p-5 sm:p-6 grid grid-cols-3 divide-x divide-white/10">
            <div className="pr-3 sm:pr-6">
                <p className="text-zinc-400 text-[11px] sm:text-xs font-medium uppercase tracking-wider mb-1">
                    Exercises
                </p>
                <p className="font-[family-name:var(--font-oswald)] text-3xl sm:text-5xl font-bold text-[#ccff00]">
                    {totalExercises}
                </p>
            </div>

            <div className="px-3 sm:px-6">
                <p className="text-zinc-400 text-[11px] sm:text-xs font-medium uppercase tracking-wider mb-1">
                    Minutes
                </p>
                <p className="font-[family-name:var(--font-oswald)] text-3xl sm:text-5xl font-bold text-white">
                    {totalMinutes}
                </p>
            </div>

            <div className="pl-3 sm:pl-6">
                <p className="text-zinc-400 text-[11px] sm:text-xs font-medium uppercase tracking-wider mb-1">
                    Calories
                </p>
                <p className="font-[family-name:var(--font-oswald)] text-3xl sm:text-5xl font-bold text-white">
                    {totalCalories}
                </p>
            </div>
        </div>
    );
}