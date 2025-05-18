export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type GoalType = 'lose_weight' | 'maintain' | 'gain_muscle';
export type BuildType = 'ectomorph' | 'mesomorph' | 'endomorph';

export interface UserProfile {
  // Basic Information
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  
  // Physical Attributes
  height: number; // in centimeters
  weight: number; // in kilograms
  buildType: BuildType;
  activityLevel: ActivityLevel;
  
  // Goals
  goalType: GoalType;
  targetWeight?: number; // in kilograms
  weeklyGoal?: number; // kg per week
  
  // Health & Preferences
  dietaryRestrictions: string[];
  allergies: string[];
  medicalConditions: string[];
  preferredWorkoutDays: string[]; // ['monday', 'tuesday', etc.]
  preferredWorkoutDuration: number; // in minutes
  preferredWorkoutTime: 'morning' | 'afternoon' | 'evening';
  
  // Calculated Fields
  bmi: number;
  bmr: number; // Basal Metabolic Rate
  tdee: number; // Total Daily Energy Expenditure
  dailyCalorieGoal: number;
  dailyProteinGoal: number; // in grams
  dailyCarbsGoal: number; // in grams
  dailyFatGoal: number; // in grams
}

export interface ProfileFormData extends Omit<UserProfile, 'id' | 'bmi' | 'bmr' | 'tdee' | 'dailyCalorieGoal' | 'dailyProteinGoal' | 'dailyCarbsGoal' | 'dailyFatGoal'> {} 