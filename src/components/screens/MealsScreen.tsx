import React from 'react';
import { Search, Calendar, Plus } from 'lucide-react';
import { Meal, ColorScheme } from '../types';

interface MealsScreenProps {
  colors: ColorScheme;
  mealHistory: Meal[];
}

export const MealsScreen: React.FC<MealsScreenProps> = ({ colors, mealHistory }) => {
  return (
    <div className={`flex-1 p-4 ${colors.background} overflow-y-auto`}>
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-neutral-400" />
        </div>
        <input 
          type="text" 
          className="block w-full p-3 pl-10 text-sm border border-neutral-200 rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Search meals or scan barcode" 
        />
      </div>
      
      {/* AI Meal Plan */}
      <div className={`${colors.card} rounded-xl p-4 shadow-sm mb-6`}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Your AI Meal Plan</h2>
          <Calendar size={18} className={colors.text} />
        </div>
        
        <div className="bg-neutral-100 p-3 rounded-lg mb-3">
          <div className="flex justify-between mb-1">
            <p className="font-medium">Breakfast</p>
            <p className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">450 cal</p>
          </div>
          <p className="text-sm text-neutral-600">Greek yogurt with berries and honey</p>
        </div>
        
        <div className="bg-neutral-100 p-3 rounded-lg mb-3">
          <div className="flex justify-between mb-1">
            <p className="font-medium">Lunch</p>
            <p className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">650 cal</p>
          </div>
          <p className="text-sm text-neutral-600">Chicken quinoa bowl with vegetables</p>
        </div>
        
        <div className="bg-neutral-100 p-3 rounded-lg">
          <div className="flex justify-between mb-1">
            <p className="font-medium">Dinner</p>
            <p className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">580 cal</p>
          </div>
          <p className="text-sm text-neutral-600">Salmon with roasted vegetables</p>
        </div>
      </div>
      
      {/* Quick Add */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">Quick Add</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <div className="flex flex-col items-center min-w-20">
            <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center mb-1">
              <Plus size={24} className="text-neutral-600" />
            </div>
            <p className="text-xs text-center">Add New</p>
          </div>
          <div className="flex flex-col items-center min-w-20">
            <div className="w-16 h-16 rounded-full bg-cover bg-center mb-1" style={{backgroundImage: "url('/api/placeholder/64/64')"}}></div>
            <p className="text-xs text-center">Breakfast</p>
          </div>
          <div className="flex flex-col items-center min-w-20">
            <div className="w-16 h-16 rounded-full bg-cover bg-center mb-1" style={{backgroundImage: "url('/api/placeholder/64/64')"}}></div>
            <p className="text-xs text-center">Salad</p>
          </div>
          <div className="flex flex-col items-center min-w-20">
            <div className="w-16 h-16 rounded-full bg-cover bg-center mb-1" style={{backgroundImage: "url('/api/placeholder/64/64')"}}></div>
            <p className="text-xs text-center">Protein</p>
          </div>
          <div className="flex flex-col items-center min-w-20">
            <div className="w-16 h-16 rounded-full bg-cover bg-center mb-1" style={{backgroundImage: "url('/api/placeholder/64/64')"}}></div>
            <p className="text-xs text-center">Snack</p>
          </div>
        </div>
      </div>
      
      {/* Meal History */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Your Meal History</h2>
          <p className="text-sm text-blue-500">See all</p>
        </div>
        
        <div className={`${colors.card} rounded-xl shadow-sm overflow-hidden`}>
          {mealHistory.concat(mealHistory).map((meal, index) => (
            <div key={`${meal.id}-${index}`} className={`flex items-center p-3 ${index !== mealHistory.length * 2 - 1 ? 'border-b border-neutral-100' : ''}`}>
              <img src={meal.image} alt={meal.name} className="w-12 h-12 rounded-lg mr-3 object-cover" />
              <div className="flex-1">
                <p className="font-medium">{meal.name}</p>
                <p className="text-xs text-neutral-500">{meal.calories} cal • {meal.protein}g protein</p>
              </div>
              <button className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-lg">
                Add again
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 