import React, { createContext, useContext, useState, useEffect } from 'react';
import { CalorieEntry, DailyCalorieSummary, CalorieGoal } from '../types/calories';

interface CaloriesContextType {
  entries: CalorieEntry[];
  dailyGoal: number;
  weeklyGoal: number;
  addEntry: (entry: Omit<CalorieEntry, 'id' | 'timestamp'>) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, entry: Partial<CalorieEntry>) => void;
  getDailySummary: (date: string) => DailyCalorieSummary;
  updateGoals: (goals: CalorieGoal) => void;
}

const CaloriesContext = createContext<CaloriesContextType | undefined>(undefined);

export const CaloriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<CalorieEntry[]>([]);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [weeklyGoal, setWeeklyGoal] = useState(14000);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('calorieEntries');
    const savedGoals = localStorage.getItem('calorieGoals');
    
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    if (savedGoals) {
      const goals = JSON.parse(savedGoals);
      setDailyGoal(goals.dailyGoal);
      setWeeklyGoal(goals.weeklyGoal);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calorieEntries', JSON.stringify(entries));
    localStorage.setItem('calorieGoals', JSON.stringify({ dailyGoal, weeklyGoal }));
  }, [entries, dailyGoal, weeklyGoal]);

  const addEntry = (entry: Omit<CalorieEntry, 'id' | 'timestamp'>) => {
    const newEntry: CalorieEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setEntries(prev => [...prev, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, updatedEntry: Partial<CalorieEntry>) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
  };

  const getDailySummary = (date: string): DailyCalorieSummary => {
    const dayEntries = entries.filter(entry => entry.date === date);
    const totalCalories = dayEntries.reduce((sum, entry) => sum + entry.calories, 0);
    
    return {
      date,
      totalCalories,
      entries: dayEntries,
    };
  };

  const updateGoals = (goals: CalorieGoal) => {
    setDailyGoal(goals.dailyGoal);
    setWeeklyGoal(goals.weeklyGoal);
  };

  return (
    <CaloriesContext.Provider
      value={{
        entries,
        dailyGoal,
        weeklyGoal,
        addEntry,
        removeEntry,
        updateEntry,
        getDailySummary,
        updateGoals,
      }}
    >
      {children}
    </CaloriesContext.Provider>
  );
};

export const useCalories = () => {
  const context = useContext(CaloriesContext);
  if (context === undefined) {
    throw new Error('useCalories must be used within a CaloriesProvider');
  }
  return context;
}; 