import React from 'react';
import type { WorkoutTemplate } from '../types';
import { Icons } from './Icons';
import ExerciseCard from './ExerciseCard';

interface WorkoutDetailProps {
    workout: WorkoutTemplate;
    onHide: () => void;
    onPersonalize: (workout: WorkoutTemplate) => void;
    onStart: () => void;
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ workout, onHide, onPersonalize, onStart }) => {
    return (
        <div className="mt-8 pt-6 border-t border-slate-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <workout.icon className="w-8 h-8 text-blue-600" />
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800">{workout.focus}</h3>
                            <p className="text-slate-500">{workout.description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-semibold shrink-0">
                    <span className="flex items-center gap-1.5"><span>⏱️</span>{workout.duration} min</span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1.5"><span>🔥</span>{workout.kcal} kcal</span>
                </div>
            </div>

             {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
                <button 
                    onClick={onHide}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors">
                    Ocultar Exercícios
                </button>
                <button 
                    onClick={() => onPersonalize(workout)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                     <Icons.PencilLine className="w-4 h-4" />
                    Personalizar
                </button>
                 <button 
                    onClick={onStart}
                    className="flex-1 sm:flex-none justify-center items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex">
                    <Icons.Play className="w-4 h-4 fill-current" />
                    Iniciar Treino
                </button>
            </div>


            {/* Exercise List */}
            <div className="mt-8">
                <h4 className="text-lg font-bold text-slate-700 mb-4">Exercícios do Treino:</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {workout.exercises.map((exercise, index) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} index={index + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutDetail;