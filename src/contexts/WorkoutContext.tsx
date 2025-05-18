import React, { createContext, useContext, useState } from 'react';
import { WorkoutPlan } from '../types/app';

export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps?: number;
  weight?: number;
  duration?: number;
  restTime: number;
  notes?: string;
}

export interface WorkoutSession {
  id: number;
  date: string;
  workoutPlanId: number;
  exercises: Exercise[];
  duration: number;
  caloriesBurned: number;
  completed: boolean;
}

interface WorkoutContextType {
  currentWorkout: WorkoutSession | null;
  workoutHistory: WorkoutSession[];
  startWorkout: (workoutPlanId: number) => void;
  completeWorkout: (session: WorkoutSession) => void;
  addExercise: (exercise: Exercise) => void;
  updateExercise: (exerciseId: number, updates: Partial<Exercise>) => void;
  removeExercise: (exerciseId: number) => void;
}

const defaultExercises: Exercise[] = [
  {
    id: 1,
    name: 'Push-ups',
    sets: 3,
    reps: 12,
    restTime: 60,
    notes: 'Focus on form and controlled movement',
  },
  {
    id: 2,
    name: 'Squats',
    sets: 4,
    reps: 15,
    restTime: 90,
    notes: 'Keep back straight, go parallel to ground',
  },
  {
    id: 3,
    name: 'Plank',
    sets: 3,
    duration: 60,
    restTime: 45,
    notes: 'Maintain straight line from head to heels',
  },
];

const WorkoutContext = createContext<WorkoutContextType>({
  currentWorkout: null,
  workoutHistory: [],
  startWorkout: () => {},
  completeWorkout: () => {},
  addExercise: () => {},
  updateExercise: () => {},
  removeExercise: () => {},
});

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutSession | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);

  const startWorkout = (workoutPlanId: number) => {
    const newWorkout: WorkoutSession = {
      id: Date.now(),
      date: new Date().toISOString(),
      workoutPlanId,
      exercises: [...defaultExercises],
      duration: 0,
      caloriesBurned: 0,
      completed: false,
    };
    setCurrentWorkout(newWorkout);
  };

  const completeWorkout = (session: WorkoutSession) => {
    const completedSession = {
      ...session,
      completed: true,
      duration: session.duration || Math.floor((Date.now() - new Date(session.date).getTime()) / 1000 / 60),
      caloriesBurned: session.caloriesBurned || Math.floor(session.exercises.reduce((acc, ex) => 
        acc + (ex.sets * (ex.reps || 1) * (ex.weight || 1) * 0.1), 0)),
    };
    setWorkoutHistory(prev => [completedSession, ...prev]);
    setCurrentWorkout(null);
  };

  const addExercise = (exercise: Exercise) => {
    if (!currentWorkout) return;
    setCurrentWorkout(prev => prev ? {
      ...prev,
      exercises: [...prev.exercises, { ...exercise, id: Date.now() }],
    } : null);
  };

  const updateExercise = (exerciseId: number, updates: Partial<Exercise>) => {
    if (!currentWorkout) return;
    setCurrentWorkout(prev => prev ? {
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      ),
    } : null);
  };

  const removeExercise = (exerciseId: number) => {
    if (!currentWorkout) return;
    setCurrentWorkout(prev => prev ? {
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId),
    } : null);
  };

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        workoutHistory,
        startWorkout,
        completeWorkout,
        addExercise,
        updateExercise,
        removeExercise,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}; 