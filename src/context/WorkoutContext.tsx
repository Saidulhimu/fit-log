"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleMarkAsDone: (id: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const localPlan = localStorage.getItem("fitlog_plan");
      const localSaved = localStorage.getItem("fitlog_saved");
      const localCompleted = localStorage.getItem("fitlog_completed");

      if (localPlan) setPlan(JSON.parse(localPlan));
      if (localSaved) setSaved(JSON.parse(localSaved));
      if (localCompleted) setCompletedIds(JSON.parse(localCompleted));
    } catch (error) {
      console.error("Error loading state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
      localStorage.setItem("fitlog_completed", JSON.stringify(completedIds));
    }
  }, [plan, saved, completedIds, isMounted]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Cap reached! Today's plan is limited to 5 lifts.");
      return;
    }
    setPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already in saved list!");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later!");
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from today's plan!");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved list!");
  };

  const toggleMarkAsDone = (id: number) => {
    if (completedIds.includes(id)) {
      setCompletedIds((prev) => prev.filter((item) => item !== id));
      toast("Marked as incomplete");
    } else {
      setCompletedIds((prev) => [...prev, id]);
      toast.success("Workout completed! Great job!");
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        completedIds,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleMarkAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};