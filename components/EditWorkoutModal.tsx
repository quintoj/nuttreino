import React, { useState, useEffect } from 'react';
import type { WorkoutTemplate, Exercise } from '../types';
import { Icons } from './Icons';
import ExerciseListItem from './ExerciseListItem';

interface EditWorkoutModalProps {
    workout: WorkoutTemplate;
    onSave: (updatedWorkout: WorkoutTemplate) => void;
    onClose: () => void;
}

const EditWorkoutModal: React.FC<EditWorkoutModalProps> = ({ workout, onSave, onClose }) => {
    const [editedWorkout, setEditedWorkout] = useState<WorkoutTemplate>(workout);

    useEffect(() => {
        // Ensure local state is in sync if the prop changes
        setEditedWorkout(workout);
    }, [workout]);

    const handleUpdateExercise = (updatedExercise: Exercise) => {
        setEditedWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map(ex =>
                ex.id === updatedExercise.id ? { ...updatedExercise, isEditing: false } : ex
            )
        }));
    };

    const handleDeleteExercise = (exerciseId: string) => {
        setEditedWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
        }));
    };

    const handleToggleEdit = (exerciseId: string) => {
        setEditedWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map(ex =>
                ex.id === exerciseId ? { ...ex, isEditing: !ex.isEditing } : { ...ex, isEditing: false }
            )
        }));
    };
    
    const handleAddNewExercise = () => {
        const newExercise: Exercise = {
            id: `new_${Date.now()}`,
            name: 'Novo Exercício',
            series: 3,
            reps: '10-12',
            rest: '60s',
            muscles: '',
            description: '',
            alternatives: '',
            isEditing: true,
        };
        setEditedWorkout(prev => ({
            ...prev,
            exercises: [...prev.exercises, newExercise]
        }));
    };

    const handleFinalize = () => {
        // Clean up isEditing flags before saving
        const finalWorkout = {
            ...editedWorkout,
            exercises: editedWorkout.exercises.map(({ isEditing, ...rest }) => rest)
        };
        onSave(finalWorkout);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">Personalizar Treino: {workout.focus}</h2>
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg">
                        Fechar
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-grow p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <Icons.Workout className="w-6 h-6 text-blue-500"/>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">Editor de Exercícios</h3>
                                <p className="text-sm text-slate-500">{editedWorkout.exercises.length} exercícios no treino</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                             <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-500 hover:bg-blue-50 rounded-lg">
                                <Icons.Upload className="w-4 h-4"/>
                                Exportar
                            </button>
                            <button onClick={handleAddNewExercise} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-500 hover:bg-blue-50 rounded-lg">
                                <Icons.Plus className="w-4 h-4"/>
                                Adicionar
                            </button>
                            <button onClick={handleFinalize} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                                Finalizar
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {editedWorkout.exercises.map((exercise, index) => (
                             <ExerciseListItem
                                key={exercise.id}
                                exercise={exercise}
                                index={index + 1}
                                onUpdate={handleUpdateExercise}
                                onDelete={() => handleDeleteExercise(exercise.id)}
                                onToggleEdit={() => handleToggleEdit(exercise.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditWorkoutModal;
