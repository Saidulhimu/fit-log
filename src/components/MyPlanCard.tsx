"use client";

import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";

interface MyPlanCardProps {
    workout: Workout;
    isCompleted?: boolean;
    onToggleDone?: (id: number) => void;
    onRemove: (id: number) => void;
}

type WorkoutWithOptionalLegacyFields = Workout & {
    title?: string;
    calories?: number;
    thumbnail?: string;
};

export default function MyPlanCard({
    workout,
    isCompleted = false,
    onToggleDone,
    onRemove,
}: MyPlanCardProps) {
    const workoutWithLegacyFields = workout as WorkoutWithOptionalLegacyFields;
    const title = workout.name || workoutWithLegacyFields.title || "Workout";
    const calories = workout.caloriesBurned ?? workoutWithLegacyFields.calories ?? 0;
    const imageSrc = workout.image || workoutWithLegacyFields.thumbnail || "/placeholder.jpg";

    return (
        <div className="bg-[#0e0f17] border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-white/20">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0 border border-white/5">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="space-y-1">
                    <h3 className="font-[family-name:var(--font-oswald)] text-lg sm:text-xl font-bold uppercase tracking-wide text-white leading-tight">
                        {title}
                    </h3>
                    <p className="text-zinc-400 text-xs font-medium">
                        {workout.equipment || "Bodyweight"}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-zinc-300 pt-1">
                        <span className="flex items-center gap-1">
                            <svg
                                className="w-3.5 h-3.5 text-[#ccff00]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                <path
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="M12 6v6l4 2"
                                />
                            </svg>
                            {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                            <svg
                                className="w-3.5 h-3.5 text-[#ccff00]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 23c-4.97 0-9-3.58-9-8 0-4.19 3.86-8.73 7.82-12.28a1.5 1.5 0 0 1 2.36 0C17.14 6.27 21 10.81 21 15c0 4.42-4.03 8-9 8zm0-18C8.8 8.12 5 12.06 5 15c0 3.31 3.13 6 7 6s7-2.69 7-6c0-2.94-3.8-6.88-7-10z" />
                            </svg>
                            {calories} kcal
                        </span>

                        {workout.rating !== undefined && (
                            <span className="flex items-center gap-1">
                                <svg
                                    className="w-3.5 h-3.5 text-[#ccff00]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                {workout.rating}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
                <Link
                    href={`/workouts/${workout.id}`}
                    className="px-3.5 py-2 rounded-xl bg-transparent border border-white/20 text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/40 transition-all"
                >
                    View Details
                </Link>

                {onToggleDone && (
                    <button
                        onClick={() => onToggleDone(workout.id)}
                        type="button"
                        className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${isCompleted
                                ? "bg-zinc-800 text-zinc-400 border border-white/10"
                                : "bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-[0_0_12px_rgba(204,255,0,0.2)]"
                            }`}
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        {isCompleted ? "Completed" : "Mark as Done"}
                    </button>
                )}

                <button
                    onClick={() => onRemove(workout.id)}
                    type="button"
                    className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    aria-label="Remove workout"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}