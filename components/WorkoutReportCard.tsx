import React from 'react';
import type { WorkoutSessionLog } from '../types';
import { Icons } from './Icons';

interface WorkoutReportCardProps {
    logs: WorkoutSessionLog[];
}

const WorkoutReportCard: React.FC<WorkoutReportCardProps> = ({ logs }) => {
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold flex items-center text-slate-800 mb-4">
                <Icons.Timer className="w-6 h-6 mr-3 text-blue-500" />
                Histórico de Treinos
            </h2>

            {logs.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {logs.map(log => (
                        <div key={log.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-slate-800">{log.workoutName}</p>
                                <p className="text-xs text-slate-500">{formatDate(log.date)}</p>
                            </div>
                            <div className="text-sm font-medium text-slate-600 bg-slate-200 px-2 py-1 rounded">
                                {log.durationMinutes} min
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-slate-500">
                    <p>Nenhum treino registrado ainda.</p>
                    <p className="text-sm">Complete uma sessão de treino para vê-la aqui.</p>
                </div>
            )}
        </div>
    );
};

export default WorkoutReportCard;
