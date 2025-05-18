export interface CalorieEntry {
  id: string;
  date: string;
  calories: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description: string;
  timestamp: number;
}

export interface DailyCalorieSummary {
  date: string;
  totalCalories: number;
  entries: CalorieEntry[];
}

export interface CalorieGoal {
  dailyGoal: number;
  weeklyGoal: number;
} 