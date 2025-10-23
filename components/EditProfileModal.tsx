import React, { useState } from 'react';
import type { Profile } from '../types';
import { Icons } from './Icons';

interface EditProfileModalProps {
    profile: Profile;
    onSave: (updatedProfile: Profile) => void;
    onClose: () => void;
}

const ModalInput: React.FC<{ label: string; name: keyof Profile; value: any; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; type?: string; unit?: string; as?: 'textarea' }> = 
({ label, name, value, onChange, type = 'text', unit, as = 'input' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <div className="flex items-center">
            {as === 'textarea' ? (
                 <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={3}
                    className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    step={type === 'number' ? '0.1' : undefined}
                />
            )}
            {unit && <span className="ml-2 text-slate-500">{unit}</span>}
        </div>
    </div>
);


const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, onSave, onClose }) => {
    const [formData, setFormData] = useState<Profile>(profile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        // Handle number inputs correctly
        const isNumberField = type === 'number';
        const parsedValue = isNumberField ? (value === '' ? '' : parseFloat(value)) : value;

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Convert empty strings in number fields to 0 or a sensible default if necessary
        const cleanedData = { ...formData };
        Object.keys(cleanedData).forEach(key => {
            const field = key as keyof Profile;
            if (typeof profile[field] === 'number' && cleanedData[field] === '') {
                (cleanedData[field] as any) = 0;
            }
        });
        onSave(cleanedData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">Editar Perfil e Restrições</h2>
                    <p className="text-sm text-slate-500">Faça as alterações e salve para atualizar o dashboard.</p>
                </div>

                <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <h3 className="md:col-span-2 text-lg font-semibold text-slate-700 border-b pb-2 mb-2">Dados Básicos</h3>
                        <ModalInput label="Nome" name="name" value={formData.name} onChange={handleChange} />
                        <ModalInput label="Idade" name="age" value={formData.age} onChange={handleChange} type="number" unit="anos"/>
                        <ModalInput label="Altura" name="height" value={formData.height} onChange={handleChange} type="number" unit="m"/>
                        <ModalInput label="Peso Atual" name="currentWeight" value={formData.currentWeight} onChange={handleChange} type="number" unit="kg"/>
                        <ModalInput label="Meta de Peso" name="targetWeight" value={formData.targetWeight} onChange={handleChange} type="number" unit="kg"/>
                        <ModalInput label="Gordura Visceral" name="visceralFat" value={formData.visceralFat} onChange={handleChange} type="number" unit="%"/>
                        <ModalInput label="Massa Muscular" name="muscleMass" value={formData.muscleMass} onChange={handleChange} type="number" unit="kg"/>
                        
                        <h3 className="md:col-span-2 text-lg font-semibold text-slate-700 border-b pb-2 mb-2 mt-4">Metabolismo e Rotina</h3>
                        <ModalInput label="TMB" name="tmb" value={formData.tmb} onChange={handleChange} type="number" unit="kcal"/>
                        <ModalInput label="GET" name="get" value={formData.get} onChange={handleChange} type="number" unit="kcal"/>
                        <ModalInput label="Turno de Trabalho" name="workTime" value={formData.workTime} onChange={handleChange} />
                        <ModalInput label="Horário de Treino" name="workoutTime" value={formData.workoutTime} onChange={handleChange} />
                        <ModalInput label="Estratégia de Jejum" name="fastingStrategy" value={formData.fastingStrategy} onChange={handleChange} placeholder="Ex: 14/10"/>

                        <h3 className="md:col-span-2 text-lg font-semibold text-slate-700 border-b pb-2 mb-2 mt-4">Restrições</h3>
                        <div className="md:col-span-2">
                            <ModalInput label="Restrições Físicas (Treino)" name="restrictionHealth" value={formData.restrictionHealth} onChange={handleChange} as="textarea" />
                        </div>
                        <div className="md:col-span-2">
                            <ModalInput label="Restrições Alimentares (Dieta)" name="restrictionDiet" value={formData.restrictionDiet} onChange={handleChange} as="textarea" />
                        </div>
                    </div>
                </form>

                <div className="p-6 border-t border-slate-200 mt-auto bg-slate-50 rounded-b-2xl flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;