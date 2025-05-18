import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Meal, ProgressData, ColorScheme } from '../types';

interface HomeScreenProps {
  colors: ColorScheme;
  mealHistory: Meal[];
  progressData: ProgressData[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ colors, mealHistory, progressData }) => {
  return (
    <div className={`flex-1 p-4 ${colors.background} overflow-y-auto`}>
      {/* Dashboard Summary */}
      <div className={`${colors.card} rounded-xl p-4 shadow-sm mb-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Today's Summary</h2>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Day 28 🔥</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-neutral-100 rounded-lg">
            <p className="text-xs text-neutral-500">Calories</p>
            <p className="font-bold">1,850</p>
            <p className="text-xs text-green-500">-350</p>
          </div>
          <div className="text-center p-2 bg-neutral-100 rounded-lg">
            <p className="text-xs text-neutral-500">Protein</p>
            <p className="font-bold">128g</p>
            <p className="text-xs text-green-500">+8g</p>
          </div>
          <div className="text-center p-2 bg-neutral-100 rounded-lg">
            <p className="text-xs text-neutral-500">Water</p>
            <p className="font-bold">1.8L</p>
            <p className="text-xs text-red-500">-0.7L</p>
          </div>
        </div>
        
        <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-1">
          <div className="bg-blue-500 h-2.5 rounded-full w-3/4"></div>
        </div>
        <p className="text-xs text-neutral-500 text-right">75% of daily goal</p>
      </div>
      
      {/* AI Recommendations */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">AI Recommendations</h2>
          <ChevronRight size={20} className={colors.textSecondary} />
        </div>
        
        <div className={`${colors.card} rounded-xl p-4 shadow-sm mb-3 border-l-4 border-blue-500`}>
          <p className="text-sm font-medium mb-1">Meal recommendation based on your goals</p>
          <p className="text-xs text-neutral-500 mb-3">Your protein intake has been below target this week.</p>
          <div className="flex justify-between items-center">
            <p className="text-xs font-medium text-blue-600">View high-protein meal ideas</p>
            <ArrowRight size={16} className="text-blue-600" />
          </div>
        </div>
        
        <div className={`${colors.card} rounded-xl p-4 shadow-sm border-l-4 border-purple-500`}>
          <p className="text-sm font-medium mb-1">Try this workout to boost metabolism</p>
          <p className="text-xs text-neutral-500 mb-3">30-min HIIT session optimized for fat burning</p>
          <div className="flex justify-between items-center">
            <p className="text-xs font-medium text-purple-600">View workout plan</p>
            <ArrowRight size={16} className="text-purple-600" />
          </div>
        </div>
      </div>
      
      {/* Meal History */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Recent Meals</h2>
          <p className="text-sm text-blue-500">See all</p>
        </div>
        
        <div className={`${colors.card} rounded-xl shadow-sm overflow-hidden`}>
          {mealHistory.map((meal, index) => (
            <div key={meal.id} className={`flex items-center p-3 ${index !== mealHistory.length - 1 ? 'border-b border-neutral-100' : ''}`}>
              <img src={meal.image} alt={meal.name} className="w-12 h-12 rounded-lg mr-3 object-cover" />
              <div className="flex-1">
                <p className="font-medium">{meal.name}</p>
                <p className="text-xs text-neutral-500">{meal.calories} cal • {meal.protein}g protein</p>
              </div>
              <ChevronRight size={16} className={colors.textSecondary} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Progress Visualization */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Weekly Progress</h2>
          <p className="text-sm text-blue-500">Details</p>
        </div>
        
        <div className={`${colors.card} rounded-xl p-4 shadow-sm`}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} width={30} />
              <Tooltip />
              <Line type="monotone" dataKey="calories" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}; 