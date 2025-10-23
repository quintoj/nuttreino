import React from 'react';
import type { Exercise } from '../types';
import { Icons } from './Icons';
import ExerciseEditForm from './ExerciseEditForm';

interface ExerciseListItemProps {
    exercise: Exercise;
    index: number;
    onUpdate: (exercise: Exercise) => void;
    onDelete: () => void;
    onToggleEdit: () => void;
}

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ exercise, index, onUpdate, onDelete, onToggleEdit }) => {
    if (exercise.isEditing) {
        return <ExerciseEditForm exercise={exercise} onSave={onUpdate} onCancel={onToggleEdit} />;
    }

    return (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center">
                        {index}
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800">{exercise.name}</h5>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
                            <span><span className="text-slate-500">Séries:</span> {exercise.series}</span>
                            <span><span className="text-slate-500">Reps:</span> {exercise.reps}</span>
                            <span><span className="text-slate-500">Descanso:</span> {exercise.rest}</span>
                            <span><span className="text-slate-500">Músculos:</span> {exercise.muscles}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">{exercise.description}</p>
                        <p className="text-xs text-slate-500 mt-2">
                            <span className="font-semibold">Alternativas:</span> {exercise.alternatives}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onToggleEdit} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded-md">
                        <Icons.Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={onDelete} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-md">
                        <Icons.Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExerciseListItem;
