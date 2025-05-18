import React from 'react';
import { AddCalorieEntry } from '../components/AddCalorieEntry';
import { DailyCalorieSummary } from '../components/DailyCalorieSummary';

export const CaloriesScreen: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Calorie Tracker</h1>
      
      <div className="space-y-6">
        <DailyCalorieSummary />
        <AddCalorieEntry />
      </div>
    </div>
  );
}; 