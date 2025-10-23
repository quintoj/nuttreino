import React from 'react';
import type { Profile } from '../types';
import { Icons } from './Icons';

interface PersonalDataCardProps {
    profile: Profile;
    onEdit: () => void;
}

const DataPoint: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <label className="text-xs text-slate-500 block">{label}</label>
        <div className="font-semibold text-slate-800">
            {value} <span className="text-sm font-normal text-slate-600">{unit}</span>
        </div>
    </div>
);

const FullWidthDataPoint: React.FC<{ label: string; value: string }> = ({ label, value }) => (
     <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 col-span-2">
        <label className="text-xs text-slate-500 block">{label}</label>
        <div className="font-semibold text-slate-800 text-sm">
            {value}
        </div>
    </div>
);


const PersonalDataCard: React.FC<PersonalDataCardProps> = ({ profile, onEdit }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center text-slate-800">
                    <Icons.User className="w-6 h-6 mr-3 text-blue-500" />
                    Dados Pessoais
                </h2>
                <button 
                    onClick={onEdit}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                    <Icons.Pencil className="w-4 h-4" />
                    Editar
                </button>
            </div>
            <p className="text-sm text-slate-500 mb-6">Mantenha seus dados atualizados para cálculos precisos.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <DataPoint label="Nome" value={profile.name.split(' ')[0]} />
                <DataPoint label="Idade" value={profile.age} unit="anos" />
                <DataPoint label="Altura" value={profile.height} unit="m" />
                <div className="sm:col-span-1 hidden sm:block"></div>
                <DataPoint label="Peso Atual" value={profile.currentWeight} unit="kg" />
                <DataPoint label="Meta de Peso" value={profile.targetWeight} unit="kg" />
                <DataPoint label="Gordura Visceral" value={profile.visceralFat} unit="%" />
                <DataPoint label="Massa Muscular" value={profile.muscleMass} unit="kg" />
                <DataPoint label="TMB" value={profile.tmb} unit="kcal" />
                <DataPoint label="GET" value={profile.get} unit="kcal" />
                <DataPoint label="Turno de Trabalho" value={profile.workTime} />
                <DataPoint label="Horário de Treino" value={profile.workoutTime} />
                 <FullWidthDataPoint label="Restrições Físicas" value={profile.restrictionHealth} />
            </div>
        </div>
    );
};

export default PersonalDataCard;