import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CaloriesProvider } from './contexts/CaloriesContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignupScreen } from './components/screens/SignupScreen';
import { CaloriesScreen } from './components/screens/CaloriesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { MealsScreen } from './components/screens/MealsScreen';
import { WorkoutsScreen } from './components/screens/WorkoutsScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { useAuth } from './contexts/AuthContext';
import { Home, Utensils, Dumbbell, TrendingUp, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return null;
  }

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/meals', icon: Utensils, label: 'Meals' },
    { path: '/calories', icon: TrendingUp, label: 'Calories' },
    { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const AppRoutes: React.FC = () => {
  const { colors, mealHistory, progressData, workoutPlans } = useApp();

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/calories" element={<CaloriesScreen />} />
      <Route path="/meals" element={<MealsScreen colors={colors} mealHistory={mealHistory} />} />
      <Route path="/workouts" element={<WorkoutsScreen />} />
      <Route path="/progress" element={<ProgressScreen colors={colors} progressData={progressData} />} />
      <Route path="/" element={<HomeScreen colors={colors} mealHistory={mealHistory} progressData={progressData} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
          <CaloriesProvider>
            <AppProvider>
              <div className="min-h-screen bg-gray-50 pb-16">
                <Navigation />
                <main className="container mx-auto px-4">
                  <AppRoutes />
                </main>
              </div>
            </AppProvider>
          </CaloriesProvider>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
};

export default App; 