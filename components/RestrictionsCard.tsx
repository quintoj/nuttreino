import React from 'react';
import { Icons } from './Icons';

interface RestrictionsCardProps {
    restrictions: string;
    onEdit: () => void;
}

const RestrictionsCard: React.FC<RestrictionsCardProps> = ({ restrictions, onEdit }) => {
    const hasRestrictions = restrictions && restrictions.toLowerCase() !== 'nenhuma restrição alimentar selecionada' && restrictions.trim() !== '';

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center text-slate-800">
                    <Icons.Ban className="w-6 h-6 mr-3 text-blue-500" />
                    Restrições Alimentares
                </h2>
                <button 
                    onClick={onEdit}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                    <Icons.Pencil className="w-4 h-4" />
                    Editar
                </button>
            </div>

            {hasRestrictions ? (
                <p className="text-sm text-slate-600">{restrictions}</p>
            ) : (
                <div className="text-center py-8">
                    <div className="mx-auto bg-slate-100 rounded-full h-16 w-16 flex items-center justify-center">
                        <Icons.AlertCircle className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="mt-4 font-semibold text-slate-700">Nenhuma restrição alimentar selecionada</p>
                    <p className="text-sm text-slate-500">Clique em "Editar" para configurar suas restrições.</p>
                </div>
            )}
        </div>
    );
};

export default RestrictionsCard;