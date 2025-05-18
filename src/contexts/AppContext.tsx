import React, { createContext, useContext, useState } from 'react';
import { Meal, ProgressData, WorkoutPlan, ColorScheme } from '../types/app';

interface AppContextType {
  colors: ColorScheme;
  mealHistory: Meal[];
  progressData: ProgressData[];
  workoutPlans: WorkoutPlan[];
}

const defaultColors: ColorScheme = {
  background: 'bg-gray-50',
  card: 'bg-white',
  text: 'text-gray-900',
  textSecondary: 'text-gray-500',
  accent: 'bg-blue-500',
  accentText: 'text-blue-500',
  border: 'border-gray-200',
  highlight: 'bg-blue-50',
};

const defaultMealHistory: Meal[] = [
  {
    id: 1,
    name: 'Greek Yogurt with Berries',
    calories: 320,
    protein: 20,
    image: '/images/meals/yogurt.jpg',
  },
  {
    id: 2,
    name: 'Chicken Quinoa Bowl',
    calories: 450,
    protein: 35,
    image: '/images/meals/quinoa.jpg',
  },
];

const defaultProgressData: ProgressData[] = [
  { day: 'Mon', calories: 1850, protein: 120, fat: 65, carbs: 180 },
  { day: 'Tue', calories: 1950, protein: 130, fat: 70, carbs: 190 },
  { day: 'Wed', calories: 1750, protein: 110, fat: 60, carbs: 170 },
  { day: 'Thu', calories: 1900, protein: 125, fat: 68, carbs: 185 },
  { day: 'Fri', calories: 1800, protein: 115, fat: 62, carbs: 175 },
  { day: 'Sat', calories: 2100, protein: 140, fat: 75, carbs: 200 },
  { day: 'Sun', calories: 1850, protein: 120, fat: 65, carbs: 180 },
];

const defaultWorkoutPlans: WorkoutPlan[] = [
  {
    id: 1,
    name: 'Full-Body HIIT',
    duration: '35 min',
    difficulty: 'Intermediate',
  },
  {
    id: 2,
    name: 'Upper Body Strength',
    duration: '45 min',
    difficulty: 'Advanced',
  },
  {
    id: 3,
    name: 'Core Crusher',
    duration: '25 min',
    difficulty: 'Beginner',
  },
];

const AppContext = createContext<AppContextType>({
  colors: defaultColors,
  mealHistory: defaultMealHistory,
  progressData: defaultProgressData,
  workoutPlans: defaultWorkoutPlans,
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors] = useState<ColorScheme>(defaultColors);
  const [mealHistory] = useState<Meal[]>(defaultMealHistory);
  const [progressData] = useState<ProgressData[]>(defaultProgressData);
  const [workoutPlans] = useState<WorkoutPlan[]>(defaultWorkoutPlans);

  return (
    <AppContext.Provider
      value={{
        colors,
        mealHistory,
        progressData,
        workoutPlans,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}; 