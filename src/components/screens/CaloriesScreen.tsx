import React, { useState } from 'react';
import { AddCalorieEntry } from '../AddCalorieEntry';
import { DailyCalorieSummary } from '../DailyCalorieSummary';
import { BarcodeScanner } from '../BarcodeScanner';
import { Scan, Plus } from 'lucide-react';

export const CaloriesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'scan'>('manual');

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Calorie Tracker</h1>
      
      <div className="space-y-6">
        <DailyCalorieSummary />
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'manual'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Plus className="w-5 h-5 inline-block mr-2" />
              Manual Entry
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === 'scan'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Scan className="w-5 h-5 inline-block mr-2" />
              Scan Barcode
            </button>
          </div>
          
          <div className="p-4">
            {activeTab === 'manual' ? (
              <AddCalorieEntry />
            ) : (
              <BarcodeScanner />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 