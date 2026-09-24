"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch workouts");
        const data = await res.json();
        
        const list = Array.isArray(data) ? data : data.data || data.workouts || [];
        setWorkouts(list);
      } catch (err: unknown) {
        console.error("Fetch error:", err);
        setError("Failed to load workout library.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[#111217] border border-white/5 rounded-xl h-80 animate-pulse"
            />
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}