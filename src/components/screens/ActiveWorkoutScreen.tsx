import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../../contexts/WorkoutContext';
import { ExerciseList } from '../workout/ExerciseList';
import { Timer, CheckCircle, XCircle, Clock } from 'lucide-react';

export const ActiveWorkoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentWorkout, completeWorkout, addExercise, updateExercise, removeExercise } = useWorkout();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!currentWorkout) {
      navigate('/workouts');
      return;
    }

    const timer = setInterval(() => {
      if (!isPaused) {
        setElapsedTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentWorkout, isPaused, navigate]);

  if (!currentWorkout) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    completeWorkout({
      ...currentWorkout,
      duration: Math.floor(elapsedTime / 60),
    });
    navigate('/workouts');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Active Workout</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2 rounded-full ${
              isPaused ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isPaused ? <Timer className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          </button>
          <div className="text-lg font-medium">
            {formatTime(elapsedTime)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Exercises</p>
            <p className="text-xl font-bold">{currentWorkout.exercises.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Estimated Calories</p>
            <p className="text-xl font-bold">
              {Math.floor(currentWorkout.exercises.reduce((acc, ex) => 
                acc + (ex.sets * (ex.reps || 1) * (ex.weight || 1) * 0.1), 0))}
            </p>
          </div>
        </div>
      </div>

      <ExerciseList
        exercises={currentWorkout.exercises}
        onUpdate={updateExercise}
        onRemove={removeExercise}
        onAdd={addExercise}
      />

      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-2xl flex justify-between items-center">
          <button
            onClick={() => navigate('/workouts')}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Cancel Workout
          </button>
          <button
            onClick={handleComplete}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Complete Workout
          </button>
        </div>
      </div>
    </div>
  );
}; 