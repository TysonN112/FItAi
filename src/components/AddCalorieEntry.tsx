import React, { useState } from 'react';
import { useCalories } from '../contexts/CaloriesContext';
import { CalorieEntry } from '../types/calories';

export const AddCalorieEntry: React.FC = () => {
  const { addEntry } = useCalories();
  const [formData, setFormData] = useState({
    calories: '',
    mealType: 'breakfast' as CalorieEntry['mealType'],
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.calories || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    const calories = parseInt(formData.calories);
    if (isNaN(calories) || calories <= 0) {
      alert('Please enter a valid calorie amount');
      return;
    }

    addEntry({
      date: new Date().toISOString().split('T')[0],
      calories,
      mealType: formData.mealType,
      description: formData.description,
    });

    // Reset form
    setFormData({
      calories: '',
      mealType: 'breakfast',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800">Add Calorie Entry</h2>
      
      <div>
        <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
          Calories
        </label>
        <input
          type="number"
          id="calories"
          value={formData.calories}
          onChange={(e) => setFormData(prev => ({ ...prev, calories: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter calories"
        />
      </div>

      <div>
        <label htmlFor="mealType" className="block text-sm font-medium text-gray-700">
          Meal Type
        </label>
        <select
          id="mealType"
          value={formData.mealType}
          onChange={(e) => setFormData(prev => ({ ...prev, mealType: e.target.value as CalorieEntry['mealType'] }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="What did you eat?"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Entry
      </button>
    </form>
  );
}; 