import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Dumbbell } from "lucide-react";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="bg-[#111217] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ccff00]/60 transition-all duration-300 group hover:-translate-y-1.5 shadow-xl"
    >
      <div>
        <div className="relative w-full h-53 bg-[#1a1b20] overflow-hidden">
          {workout.image ? (
            <>
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111217] via-transparent to-transparent opacity-80" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1a1b20]">
              <Dumbbell className="w-12 h-12 text-gray-600" />
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-3 relative z-10">
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups?.map((group, idx) => (
              <span
                key={idx}
                className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30"
              >
                {group}
              </span>
            ))}
          </div>

          <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors leading-snug">
            {workout.name}
          </h3>

          <p className="text-xs text-gray-400 flex items-center gap-1.5 line-clamp-1 font-sans">
            <Dumbbell size={14} className="text-gray-500 shrink-0" />
            <span>{workout.equipment || "Bodyweight"}</span>
          </p>
        </div>
      </div>

      <div className="px-5 py-3.5 bg-[#0a0a0c] border-t border-white/5 flex items-center justify-between text-xs text-gray-300 font-medium font-sans mt-2">
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-[#ccff00]" />
          <span>{workout.duration} min</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Flame size={14} className="text-orange-500" />
          <span>{workout.caloriesBurned} kcal</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span>{workout.rating ? Number(workout.rating).toFixed(1) : "N/A"}</span>
        </div>
      </div>
    </Link>
  );
}