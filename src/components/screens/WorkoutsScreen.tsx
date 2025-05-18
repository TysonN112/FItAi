import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../../contexts/WorkoutContext';
import { useApp } from '../../contexts/AppContext';
import { Play, Clock, TrendingUp, Dumbbell, Plus } from 'lucide-react';

export const WorkoutsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { colors, workoutPlans } = useApp();
  const { currentWorkout, workoutHistory, startWorkout } = useWorkout();

  // If there's an active workout, navigate to it
  React.useEffect(() => {
    if (currentWorkout) {
      navigate('/workout/active');
    }
  }, [currentWorkout, navigate]);

  const handleStartWorkout = (workoutPlanId: number) => {
    startWorkout(workoutPlanId);
    navigate('/workout/active');
  };

  return (
    <div className={`flex-1 p-4 ${colors.background} overflow-y-auto`}>
      {/* Today's Workout */}
      <div className={`${colors.card} rounded-xl p-4 shadow-sm mb-6`}>
        <h2 className="text-lg font-bold mb-3">Today's Workout</h2>
        {workoutPlans[0] && (
          <>
            <div className="relative overflow-hidden rounded-lg h-40 mb-4">
              <img src="/images/workouts/hiit.jpg" alt="Workout" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold">{workoutPlans[0].name}</h3>
                <p className="text-white text-sm">{workoutPlans[0].duration} • {workoutPlans[0].difficulty}</p>
              </div>
            </div>
            <button
              onClick={() => handleStartWorkout(workoutPlans[0].id)}
              className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Play className="w-5 h-5 inline-block mr-2" />
              Start Workout
            </button>
          </>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`${colors.card} rounded-xl p-4 shadow-sm text-center`}>
          <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-gray-600">This Week</p>
          <p className="text-xl font-bold">{workoutHistory.filter(w => 
            new Date(w.date).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
          ).length} workouts</p>
        </div>
        <div className={`${colors.card} rounded-xl p-4 shadow-sm text-center`}>
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
          <p className="text-sm text-gray-600">Calories Burned</p>
          <p className="text-xl font-bold">
            {workoutHistory.reduce((acc, w) => acc + w.caloriesBurned, 0)}
          </p>
        </div>
        <div className={`${colors.card} rounded-xl p-4 shadow-sm text-center`}>
          <Dumbbell className="w-6 h-6 mx-auto mb-2 text-purple-500" />
          <p className="text-sm text-gray-600">Total Exercises</p>
          <p className="text-xl font-bold">
            {workoutHistory.reduce((acc, w) => acc + w.exercises.length, 0)}
          </p>
        </div>
      </div>

      {/* Workout Plans */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Your Workout Plans</h2>
          <button className="text-blue-500 hover:text-blue-600">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className={`${colors.card} rounded-xl shadow-sm overflow-hidden`}>
          {workoutPlans.map((workout, index) => (
            <div
              key={workout.id}
              className={`p-4 ${index !== workoutPlans.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{workout.name}</h3>
                <p className="text-xs bg-neutral-100 px-2 py-1 rounded-full">{workout.difficulty}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">{workout.duration}</p>
                <button
                  onClick={() => handleStartWorkout(workout.id)}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Workouts */}
      {workoutHistory.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">Recent Workouts</h2>
          <div className={`${colors.card} rounded-xl shadow-sm overflow-hidden`}>
            {workoutHistory.slice(0, 3).map((workout, index) => (
              <div
                key={workout.id}
                className={`p-4 ${index !== Math.min(2, workoutHistory.length - 1) ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">
                    {workoutPlans.find(p => p.id === workout.workoutPlanId)?.name || 'Custom Workout'}
                  </h3>
                  <p className="text-xs text-gray-500">{new Date(workout.date).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>{workout.exercises.length} exercises</p>
                  <p>{workout.duration} min • {workout.caloriesBurned} cal</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 