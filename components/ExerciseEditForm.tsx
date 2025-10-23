import React, { useState } from 'react';
import type { Exercise } from '../types';

interface ExerciseEditFormProps {
    exercise: Exercise;
    onSave: (exercise: Exercise) => void;
    onCancel: () => void;
}

const InputField = ({ label, name, value, onChange }: { label: string, name: keyof Exercise, value: any, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }) => (
    <div className="flex-1 min-w-[120px]">
        <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
        <input
            type={name === 'series' ? 'number' : 'text'}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
    </div>
);

const ExerciseEditForm: React.FC<ExerciseEditFormProps> = ({ exercise, onSave, onCancel }) => {
    const [formData, setFormData] = useState(exercise);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-300">
            <div className="space-y-3">
                <div className="flex flex-wrap gap-4">
                    <InputField label="Nome" name="name" value={formData.name} onChange={handleChange} />
                    <InputField label="Séries" name="series" value={formData.series} onChange={handleChange} />
                    <InputField label="Repetições" name="reps" value={formData.reps} onChange={handleChange} />
                    <InputField label="Descanso" name="rest" value={formData.rest} onChange={handleChange} />
                </div>
                 <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Descrição</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={2}
                        className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                     />
                </div>
            </div>
            <div className="flex justify-start gap-3 mt-4">
                <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                    Salvar
                </button>
                <button onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg">
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default ExerciseEditForm;
