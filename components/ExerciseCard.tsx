import React from 'react';
import type { Exercise } from '../types';

interface ExerciseCardProps {
    exercise: Exercise;
    index: number;
}

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-slate-700">{value}</p>
    </div>
);

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, index }) => {
    return (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center">
                    {index}
                </div>
                <div className="flex-grow">
                    <h5 className="font-bold text-slate-800">{exercise.name}</h5>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
                        <DetailItem label="Séries" value={exercise.series} />
                        <DetailItem label="Reps" value={exercise.reps} />
                        <DetailItem label="Descanso" value={exercise.rest} />
                        <DetailItem label="Músculos" value={exercise.muscles} />
                    </div>
                     <p className="text-sm text-slate-600 mt-3">{exercise.description}</p>
                     <p className="text-xs text-slate-500 mt-2">
                        <span className="font-semibold">Alternativas:</span> {exercise.alternatives}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExerciseCard;