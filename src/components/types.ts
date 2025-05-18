export interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  image: string;
}

export interface WorkoutPlan {
  id: number;
  name: string;
  duration: string;
  difficulty: string;
}

export interface ProgressData {
  day: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface ColorScheme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentText: string;
  border: string;
  highlight: string;
} 