import React from 'react';
import type { Meal } from '../types';
import { Icons } from './Icons';

interface MealPlanCardProps {
    mealPlan: Meal[];
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealPlan }) => {
    const hasPlan = mealPlan && mealPlan.length > 0;

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold flex items-center text-slate-800 mb-4">
                <Icons.Utensils className="w-6 h-6 mr-3 text-blue-500" />
                Plano Alimentar (Sugestão IA)
            </h2>

            {hasPlan ? (
                <div className="space-y-4">
                    {mealPlan.map((meal, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-800">{meal.time}</p>
                            <p className="text-sm text-slate-600">{meal.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-slate-500">
                    <p>Nenhum plano alimentar gerado.</p>
                    <p className="text-sm">Clique no botão "Gerar Plano com IA" para receber uma sugestão.</p>
                </div>
            )}
        </div>
    );
};

export default MealPlanCard;