import React from 'react';
import { Icons } from './Icons';

interface MacroCardProps {
    calories: number;
    get: number;
    proteinGrams: number;
    fatGrams: number;
    carbGrams: number;
    proteinPercentage: number;
    fatPercentage: number;
    carbPercentage: number;
}

const MacroBar: React.FC<{ label: string; grams: number; percentage: number; color: string }> = ({ label, grams, percentage, color }) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <span className="text-sm font-semibold text-slate-800">{grams}g ({percentage}%)</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

const MacroCard: React.FC<MacroCardProps> = (props) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center text-slate-800">
                    <Icons.Macros className="w-6 h-6 mr-3 text-blue-500" />
                    Macronutrientes
                </h2>
            </div>
            <div className="text-center mb-6">
                <p className="text-5xl font-extrabold text-slate-800">{props.calories}</p>
                <p className="text-sm text-slate-500">kcal/dia</p>
                <p className="text-xs text-slate-400 mt-1">Semana - Déficit Progressivo</p>
            </div>
            <div className="space-y-4">
                <MacroBar label="Proteína" grams={props.proteinGrams} percentage={props.proteinPercentage} color="bg-red-400" />
                <MacroBar label="Gordura" grams={props.fatGrams} percentage={props.fatPercentage} color="bg-yellow-400" />
                <MacroBar label="Carboidratos" grams={props.carbGrams} percentage={props.carbPercentage} color="bg-green-400" />
            </div>
             <div className="mt-6 text-center text-xs text-slate-500 bg-blue-50 p-2 rounded-lg">
                Estratégia: Déficit calórico progressivo de {props.get} para {props.calories} kcal
            </div>
        </div>
    );
};

export default MacroCard;