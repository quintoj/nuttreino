import React from 'react';
import { Icons } from './Icons';

interface AIPlannerCardProps {
    onGenerate: () => void;
    isLoading: boolean;
    alert: string;
    suggestion: string;
}

const AIPlannerCard: React.FC<AIPlannerCardProps> = ({ onGenerate, isLoading, alert, suggestion }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center text-slate-800">
                    <Icons.Zap className="w-6 h-6 mr-3 text-blue-500" />
                    Planejador AI
                </h2>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Icons.Loader2 className="w-4 h-4 animate-spin" />
                            Gerando...
                        </>
                    ) : (
                        <>
                            <Icons.Zap className="w-4 h-4" />
                            Gerar Plano com IA
                        </>
                    )}
                </button>
            </div>
            
            <div className="mt-4 space-y-4">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">Alerta Motivacional</h4>
                    <p className="text-sm italic">"{alert}"</p>
                </div>

                 {suggestion && (
                    <div className="bg-slate-100 text-slate-700 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">Sugestão de Foco (Treino)</h4>
                        <p className="text-sm">{suggestion}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIPlannerCard;