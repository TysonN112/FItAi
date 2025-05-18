import React, { useState, useEffect } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { ProfileFormData, Gender, ActivityLevel, GoalType, BuildType } from '../../types/profile';

export const ProfileScreen: React.FC = () => {
  const { profile, loading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: 'male',
    height: 170,
    weight: 70,
    buildType: 'mesomorph',
    activityLevel: 'moderate',
    goalType: 'maintain',
    targetWeight: undefined,
    weeklyGoal: undefined,
    dietaryRestrictions: [],
    allergies: [],
    medicalConditions: [],
    preferredWorkoutDays: [],
    preferredWorkoutDuration: 45,
    preferredWorkoutTime: 'evening',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        buildType: profile.buildType,
        activityLevel: profile.activityLevel,
        goalType: profile.goalType,
        targetWeight: profile.targetWeight,
        weeklyGoal: profile.weeklyGoal,
        dietaryRestrictions: profile.dietaryRestrictions,
        allergies: profile.allergies,
        medicalConditions: profile.medicalConditions,
        preferredWorkoutDays: profile.preferredWorkoutDays,
        preferredWorkoutDuration: profile.preferredWorkoutDuration,
        preferredWorkoutTime: profile.preferredWorkoutTime,
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim()),
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Physical Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Build Type</label>
                <select
                  name="buildType"
                  value={formData.buildType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="ectomorph">Ectomorph (Naturally thin)</option>
                  <option value="mesomorph">Mesomorph (Athletic build)</option>
                  <option value="endomorph">Endomorph (Naturally heavier)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="sedentary">Sedentary (Little or no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very_active">Very Active (Daily exercise or physical job)</option>
                </select>
              </div>
            </div>

            {/* Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Goal Type</label>
                <select
                  name="goalType"
                  value={formData.goalType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="lose_weight">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain_muscle">Gain Muscle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
                <input
                  type="number"
                  name="targetWeight"
                  value={formData.targetWeight || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weekly Goal (kg/week)</label>
                <input
                  type="number"
                  name="weeklyGoal"
                  value={formData.weeklyGoal || ''}
                  onChange={handleInputChange}
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Health & Preferences */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Dietary Restrictions (comma-separated)</label>
                <input
                  type="text"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions.join(', ')}
                  onChange={handleArrayInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., vegetarian, gluten-free"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Allergies (comma-separated)</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies.join(', ')}
                  onChange={handleArrayInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., peanuts, shellfish"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Medical Conditions (comma-separated)</label>
                <input
                  type="text"
                  name="medicalConditions"
                  value={formData.medicalConditions.join(', ')}
                  onChange={handleArrayInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., diabetes, hypertension"
                />
              </div>
            </div>

            {/* Workout Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Workout Days (comma-separated)</label>
                <input
                  type="text"
                  name="preferredWorkoutDays"
                  value={formData.preferredWorkoutDays.join(', ')}
                  onChange={handleArrayInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., monday, wednesday, friday"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Workout Duration (minutes)</label>
                <input
                  type="number"
                  name="preferredWorkoutDuration"
                  value={formData.preferredWorkoutDuration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Workout Time</label>
                <select
                  name="preferredWorkoutTime"
                  value={formData.preferredWorkoutTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {profile && (
              <>
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="text-sm text-gray-900">{profile.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="text-sm text-gray-900">{profile.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                        <dd className="text-sm text-gray-900">{new Date(profile.dateOfBirth).toLocaleDateString()}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Gender</dt>
                        <dd className="text-sm text-gray-900 capitalize">{profile.gender}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Physical Attributes */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Physical Attributes</h3>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Height</dt>
                        <dd className="text-sm text-gray-900">{profile.height} cm</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Weight</dt>
                        <dd className="text-sm text-gray-900">{profile.weight} kg</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">BMI</dt>
                        <dd className="text-sm text-gray-900">{profile.bmi.toFixed(1)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Build Type</dt>
                        <dd className="text-sm text-gray-900 capitalize">{profile.buildType}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Goals and Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Goals</h3>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Goal Type</dt>
                        <dd className="text-sm text-gray-900 capitalize">{profile.goalType.replace('_', ' ')}</dd>
                      </div>
                      {profile.targetWeight && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Target Weight</dt>
                          <dd className="text-sm text-gray-900">{profile.targetWeight} kg</dd>
                        </div>
                      )}
                      {profile.weeklyGoal && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Weekly Goal</dt>
                          <dd className="text-sm text-gray-900">{profile.weeklyGoal} kg/week</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Activity Level</h3>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Current Level</dt>
                        <dd className="text-sm text-gray-900 capitalize">{profile.activityLevel.replace('_', ' ')}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Daily Calorie Goal</dt>
                        <dd className="text-sm text-gray-900">{profile.dailyCalorieGoal} kcal</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">BMR</dt>
                        <dd className="text-sm text-gray-900">{Math.round(profile.bmr)} kcal</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">TDEE</dt>
                        <dd className="text-sm text-gray-900">{Math.round(profile.tdee)} kcal</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Nutrition Goals */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Daily Nutrition Goals</h3>
                  <dl className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Protein</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">{profile.dailyProteinGoal}g</dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Carbohydrates</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">{profile.dailyCarbsGoal}g</dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Fat</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">{profile.dailyFatGoal}g</dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Total Calories</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">{profile.dailyCalorieGoal} kcal</dd>
                    </div>
                  </dl>
                </div>

                {/* Health & Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Health Information</h3>
                    <dl className="mt-2 space-y-2">
                      {profile.dietaryRestrictions.length > 0 && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Dietary Restrictions</dt>
                          <dd className="text-sm text-gray-900">{profile.dietaryRestrictions.join(', ')}</dd>
                        </div>
                      )}
                      {profile.allergies.length > 0 && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                          <dd className="text-sm text-gray-900">{profile.allergies.join(', ')}</dd>
                        </div>
                      )}
                      {profile.medicalConditions.length > 0 && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Medical Conditions</dt>
                          <dd className="text-sm text-gray-900">{profile.medicalConditions.join(', ')}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Workout Preferences</h3>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Preferred Workout Days</dt>
                        <dd className="text-sm text-gray-900 capitalize">{profile.preferredWorkoutDays.join(', ')}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Workout Duration</dt>
                        <dd className="text-sm text-gray-900">{profile.preferredWorkoutDuration} minutes</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Preferred Time</dt>
                        <dd className="text-sm text-gray-900 capitalize">{profile.preferredWorkoutTime}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 