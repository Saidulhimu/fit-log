"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface WorkoutContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  completedWorkouts: number[];
  isLoading: boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromTodayPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleCompleteWorkout: (id: number) => void;

  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
  removeFromPlan: (id: number) => void;
  toggleMarkAsDone: (id: number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadState = () => {
      try {
        const localPlan = localStorage.getItem("fitlog_plan");
        const localSaved = localStorage.getItem("fitlog_saved");
        const localCompleted = localStorage.getItem("fitlog_completed");

        if (localPlan) setTodayPlan(JSON.parse(localPlan));
        if (localSaved) setSavedWorkouts(JSON.parse(localSaved));
        if (localCompleted) setCompletedWorkouts(JSON.parse(localCompleted));
      } catch (error) {
        console.error("Error loading state from localStorage", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = window.setTimeout(loadState, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("fitlog_plan", JSON.stringify(todayPlan));
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
      localStorage.setItem("fitlog_completed", JSON.stringify(completedWorkouts));
    }
  }, [todayPlan, savedWorkouts, completedWorkouts, isLoading]);

  const addToPlan = (workout: Workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    if (todayPlan.length >= 5) {
      toast.error("Cap reached! Today's plan is limited to 5 lifts.");
      return;
    }
    setTodayPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.error("Already in saved list!");
      return;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success("Saved for later!");
  };

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from today's plan!");
  };

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved list!");
  };

  const toggleCompleteWorkout = (id: number) => {
    if (completedWorkouts.includes(id)) {
      setCompletedWorkouts((prev) => prev.filter((item) => item !== id));
      toast("Marked as incomplete");
    } else {
      setCompletedWorkouts((prev) => [...prev, id]);
      toast.success("Workout completed! Great job!");
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        // New Names
        todayPlan,
        savedWorkouts,
        completedWorkouts,
        isLoading,
        addToPlan,
        addToSaved,
        removeFromTodayPlan,
        removeFromSaved,
        toggleCompleteWorkout,

        plan: todayPlan,
        saved: savedWorkouts,
        completedIds: completedWorkouts,
        removeFromPlan: removeFromTodayPlan,
        toggleMarkAsDone: toggleCompleteWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }
  return context;
};

export const useWorkout = useWorkoutContext;