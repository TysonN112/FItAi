import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ProfileFormData } from '../types/profile';
import { useAuth } from './AuthContext';

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: ProfileFormData) => Promise<void>;
  calculateNutritionGoals: (profile: UserProfile) => UserProfile;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // Calculate BMI
  const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
    const baseBMR = 10 * weight + 6.25 * height - 5 * age;
    return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
  };

  // Calculate TDEE based on activity level
  const calculateTDEE = (bmr: number, activityLevel: string): number => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    return bmr * (activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2);
  };

  // Calculate daily nutrition goals
  const calculateNutritionGoals = (profile: UserProfile): UserProfile => {
    const age = new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear();
    const bmi = calculateBMI(profile.weight, profile.height);
    const bmr = calculateBMR(profile.weight, profile.height, age, profile.gender);
    const tdee = calculateTDEE(bmr, profile.activityLevel);

    // Adjust calories based on goal
    let dailyCalorieGoal = tdee;
    switch (profile.goalType) {
      case 'lose_weight':
        dailyCalorieGoal = tdee - 500; // 500 calorie deficit
        break;
      case 'gain_muscle':
        dailyCalorieGoal = tdee + 300; // 300 calorie surplus
        break;
      // maintain stays at TDEE
    }

    // Calculate macronutrient goals
    const dailyProteinGoal = profile.weight * 2; // 2g per kg of body weight
    const dailyFatGoal = (dailyCalorieGoal * 0.25) / 9; // 25% of calories from fat
    const dailyCarbsGoal = (dailyCalorieGoal - (dailyProteinGoal * 4 + dailyFatGoal * 9)) / 4; // Remaining calories from carbs

    return {
      ...profile,
      bmi,
      bmr,
      tdee,
      dailyCalorieGoal: Math.round(dailyCalorieGoal),
      dailyProteinGoal: Math.round(dailyProteinGoal),
      dailyFatGoal: Math.round(dailyFatGoal),
      dailyCarbsGoal: Math.round(dailyCarbsGoal),
    };
  };

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        // TODO: Implement Firebase fetch
        // const docRef = doc(db, 'profiles', currentUser.uid);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   setProfile(calculateNutritionGoals(docSnap.data() as UserProfile));
        // }
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
        console.error('Error loading profile:', err);
      }
    };

    loadProfile();
  }, [currentUser]);

  // Update profile
  const updateProfile = async (data: ProfileFormData) => {
    if (!currentUser) {
      throw new Error('User must be logged in to update profile');
    }

    try {
      const newProfile: UserProfile = {
        ...data,
        id: currentUser.uid,
        bmi: 0, // These will be calculated
        bmr: 0,
        tdee: 0,
        dailyCalorieGoal: 0,
        dailyProteinGoal: 0,
        dailyCarbsGoal: 0,
        dailyFatGoal: 0,
      };

      const updatedProfile = calculateNutritionGoals(newProfile);
      // TODO: Implement Firebase update
      // await setDoc(doc(db, 'profiles', currentUser.uid), updatedProfile);
      setProfile(updatedProfile);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, error, updateProfile, calculateNutritionGoals }}>
      {children}
    </ProfileContext.Provider>
  );
}; 