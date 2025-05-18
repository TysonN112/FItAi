import React from 'react';
import { Exercise, useWorkout } from '../../contexts/WorkoutContext';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface ExerciseListProps {
  exercises: Exercise[];
  onUpdate: (id: number, updates: Partial<Exercise>) => void;
  onRemove: (id: number) => void;
  onAdd: (exercise: Exercise) => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onUpdate,
  onRemove,
  onAdd,
}) => {
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [newExercise, setNewExercise] = React.useState<Partial<Exercise>>({
    name: '',
    sets: 3,
    reps: 10,
    restTime: 60,
  });

  const handleAdd = () => {
    if (!newExercise.name) return;
    onAdd({
      id: Date.now(),
      name: newExercise.name,
      sets: newExercise.sets || 3,
      reps: newExercise.reps,
      restTime: newExercise.restTime || 60,
      notes: newExercise.notes,
    });
    setNewExercise({
      name: '',
      sets: 3,
      reps: 10,
      restTime: 60,
    });
  };

  return (
    <div className="space-y-4">
      {/* Add New Exercise Form */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-medium mb-3">Add Exercise</h3>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Exercise name"
            value={newExercise.name}
            onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
            className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <label className="block text-sm text-gray-600 mb-1">Sets</label>
            <input
              type="number"
              value={newExercise.sets}
              onChange={(e) => setNewExercise(prev => ({ ...prev, sets: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Reps</label>
            <input
              type="number"
              value={newExercise.reps}
              onChange={(e) => setNewExercise(prev => ({ ...prev, reps: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Rest (seconds)</label>
            <input
              type="number"
              value={newExercise.restTime}
              onChange={(e) => setNewExercise(prev => ({ ...prev, restTime: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Notes</label>
            <input
              type="text"
              value={newExercise.notes || ''}
              onChange={(e) => setNewExercise(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-5 h-5 inline-block mr-2" />
          Add Exercise
        </button>
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-lg p-4 shadow-sm">
            {editingId === exercise.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => onUpdate(exercise.id, { name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Sets</label>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => onUpdate(exercise.id, { sets: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Reps</label>
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) => onUpdate(exercise.id, { reps: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Rest (s)</label>
                    <input
                      type="number"
                      value={exercise.restTime}
                      onChange={(e) => onUpdate(exercise.id, { restTime: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 text-blue-600 hover:text-blue-900"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{exercise.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingId(exercise.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onRemove(exercise.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{exercise.sets}</span> sets
                  </div>
                  <div>
                    <span className="font-medium">{exercise.reps || exercise.duration}</span>
                    {exercise.reps ? ' reps' : ' seconds'}
                  </div>
                  <div>
                    <span className="font-medium">{exercise.restTime}</span>s rest
                  </div>
                </div>
                {exercise.notes && (
                  <p className="mt-2 text-sm text-gray-500">{exercise.notes}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 