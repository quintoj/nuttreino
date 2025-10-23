import React from 'react';
import type { WorkoutTemplate } from '../types';

interface WorkoutCardProps {
    template: WorkoutTemplate;
    isSelected: boolean;
    onSelect: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ template, isSelected, onSelect }) => {
    return (
        <div
            onClick={onSelect}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center flex flex-col items-center
                ${isSelected ? 'bg-blue-50 border-blue-500 shadow-lg scale-105' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'}`}
        >
            <template.icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-blue-600' : 'text-blue-500'}`} />
            <h3 className="font-bold text-sm text-slate-800">{template.focus}</h3>
            <p className="text-xs text-slate-500 mt-1 mb-3 h-8">{template.description}</p>
            <div className="w-full text-xs text-slate-600 space-y-1">
                <div className="flex justify-center items-center gap-1.5 bg-slate-100 p-1 rounded">
                    <span>🔥</span><span>{template.kcal} kcal</span>
                </div>
                <div className="flex justify-center items-center gap-1.5 bg-slate-100 p-1 rounded">
                   <span>⏱️</span><span>{template.duration} min</span>
                </div>
                 <div className="flex justify-center items-center gap-1.5 bg-slate-100 p-1 rounded">
                    <span>📊</span><span>{template.level}</span>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
