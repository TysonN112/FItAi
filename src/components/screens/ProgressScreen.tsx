import React from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ProgressData, ColorScheme } from '../types';

interface ProgressScreenProps {
  colors: ColorScheme;
  progressData: ProgressData[];
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ colors, progressData }) => {
  return (
    <div className={`flex-1 p-4 ${colors.background} overflow-y-auto`}>
      {/* Progress Summary */}
      <div className={`${colors.card} rounded-xl p-4 shadow-sm mb-6`}>
        <h2 className="text-lg font-bold mb-4">Progress Summary</h2>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-neutral-100 rounded-lg p-3 text-center">
            <p className="text-xs text-neutral-500 mb-1">Weight</p>
            <p className="text-lg font-bold">172 lbs</p>
            <p className="text-xs text-green-500">-3.5 lbs</p>
          </div>
          <div className="bg-neutral-100 rounded-lg p-3 text-center">
            <p className="text-xs text-neutral-500 mb-1">Calories Avg</p>
            <p className="text-lg font-bold">1,950</p>
            <p className="text-xs text-green-500">-150</p>
          </div>
          <div className="bg-neutral-100 rounded-lg p-3 text-center">
            <p className="text-xs text-neutral-500 mb-1">Workouts</p>
            <p className="text-lg font-bold">16</p>
            <p className="text-xs text-green-500">+3</p>
          </div>
        </div>
        
        <div className="bg-neutral-100 rounded-lg p-3 flex items-center justify-between">
          <div>
            <p className="font-medium">Current streak</p>
            <p className="text-sm text-neutral-500">Keep it up!</p>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              28
            </div>
            <p className="ml-2 text-sm font-medium">Days</p>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Nutrition Trends</h2>
          <select className="text-sm border border-neutral-200 rounded-lg p-1">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        
        <div className={`${colors.card} rounded-xl p-4 shadow-sm`}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{fontSize: 12}} />
              <YAxis tick={{fontSize: 12}} width={30} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="protein" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="carbs" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="fat" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Goals */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Your Goals</h2>
          <p className="text-sm text-blue-500">Edit</p>
        </div>
        
        <div className={`${colors.card} rounded-xl p-4 shadow-sm`}>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <p className="font-medium">Weight Goal</p>
              <p className="text-sm">160 lbs</p>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-neutral-500">172 lbs</p>
              <p className="text-xs text-neutral-500">12 lbs to go</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <p className="font-medium">Daily Protein</p>
              <p className="text-sm">140g</p>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
            </div>
            <p className="text-xs text-neutral-500 mt-1">Avg. 128g daily</p>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <p className="font-medium">Weekly Workouts</p>
              <p className="text-sm">5 sessions</p>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full w-3/5"></div>
            </div>
            <p className="text-xs text-neutral-500 mt-1">Completed 3 of 5 this week</p>
          </div>
        </div>
      </div>
      
      {/* AI Insights */}
      <div>
        <h2 className="text-lg font-bold mb-3">AI Insights</h2>
        <div className={`${colors.card} rounded-xl p-4 shadow-sm mb-3 border-l-4 border-green-500`}>
          <p className="font-medium mb-1">Consistency Improvement</p>
          <p className="text-sm text-neutral-600">Your consistency has improved by 35% this month. Keep up the great work!</p>
        </div>
        
        <div className={`${colors.card} rounded-xl p-4 shadow-sm border-l-4 border-yellow-500`}>
          <p className="font-medium mb-1">Nutrition Suggestion</p>
          <p className="text-sm text-neutral-600">Try increasing your protein intake on workout days for better muscle recovery.</p>
        </div>
      </div>
    </div>
  );
}; 