import React from 'react';
import { useCalories } from '../contexts/CaloriesContext';
import { CalorieEntry } from '../types/calories';

export const DailyCalorieSummary: React.FC = () => {
  const { getDailySummary, dailyGoal, removeEntry } = useCalories();
  const today = new Date().toISOString().split('T')[0];
  const summary = getDailySummary(today);

  const getProgressColor = (total: number, goal: number) => {
    const percentage = (total / goal) * 100;
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatMealType = (type: CalorieEntry['mealType']) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Today's Summary</h2>
        <span className={`text-lg font-medium ${getProgressColor(summary.totalCalories, dailyGoal)}`}>
          {summary.totalCalories} / {dailyGoal} kcal
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${
            summary.totalCalories >= dailyGoal
              ? 'bg-red-600'
              : summary.totalCalories >= dailyGoal * 0.8
              ? 'bg-yellow-600'
              : 'bg-green-600'
          }`}
          style={{ width: `${Math.min((summary.totalCalories / dailyGoal) * 100, 100)}%` }}
        ></div>
      </div>

      <div className="space-y-3">
        {summary.entries.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No entries for today</p>
        ) : (
          summary.entries.map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <span className="font-medium text-gray-800">{formatMealType(entry.mealType)}</span>
                <p className="text-sm text-gray-600">{entry.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-800">{entry.calories} kcal</span>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 