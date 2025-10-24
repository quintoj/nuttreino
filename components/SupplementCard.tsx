import React from 'react';
import type { Supplement } from '../types';
import { Icons } from './Icons';

interface SupplementCardProps {
    supplements: Supplement[];
    onToggle: (id: number) => void;
    onReset: () => void;
}

const SupplementItem: React.FC<{ supplement: Supplement, onToggle: (id: number) => void }> = ({ supplement, onToggle }) => (
    <div 
        onClick={() => onToggle(supplement.id)}
        className="flex items-center justify-between p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
    >
        <div className="flex items-center">
            <div className="mr-3">
                <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all
                        ${supplement.taken ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300'}`}
                >
                    {supplement.taken && <Icons.CheckCircle className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
            </div>
            <div>
                <p className="font-semibold text-sm text-slate-800">{supplement.name}</p>
                <div className="flex items-center text-xs text-slate-500">
                    <span>{supplement.dosage}</span>
                    {/* Fix: The `title` prop is not valid on SVG elements. Wrapped the icon in a `span` to apply the tooltip. */}
                    <span title={supplement.timing}>
                        <Icons.Info className="w-3 h-3 ml-2 text-slate-400 cursor-help" />
                    </span>
                    <span className="ml-1 hidden sm:inline">{supplement.timing}</span>
                </div>
            </div>
        </div>
    </div>
);

const SupplementCard: React.FC<SupplementCardProps> = ({ supplements, onToggle, onReset }) => {
    const takenCount = supplements.filter(s => s.taken).length;
    const totalCount = supplements.length;

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center text-slate-800">
                    <Icons.Pill className="w-6 h-6 mr-3 text-blue-500" />
                    Suplementação
                </h2>
                <button 
                    onClick={onReset}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                    Resetar Dia
                </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">
                {takenCount}/{totalCount} tomados hoje
            </p>
            <div className="space-y-3">
                {supplements.map(sup => (
                    <SupplementItem key={sup.id} supplement={sup} onToggle={onToggle} />
                ))}
            </div>
             <div className="mt-6 text-xs text-yellow-700 bg-yellow-100 p-3 rounded-lg flex items-start">
                <Icons.AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <p>Lembrete: Consulte sempre um profissional de saúde antes de iniciar qualquer suplementação.</p>
            </div>
        </div>
    );
};

export default SupplementCard;