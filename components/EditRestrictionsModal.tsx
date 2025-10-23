import React, { useState } from 'react';

interface EditRestrictionsModalProps {
    initialRestrictions: string;
    onSave: (newRestrictions: string) => void;
    onClose: () => void;
}

const EditRestrictionsModal: React.FC<EditRestrictionsModalProps> = ({ initialRestrictions, onSave, onClose }) => {
    const [restrictions, setRestrictions] = useState(initialRestrictions);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(restrictions);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
                <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">Editar Restrições Alimentares</h2>
                    <p className="text-sm text-slate-500">Atualize sua dieta e restrições.</p>
                </div>

                <div className="p-6">
                    <label htmlFor="restrictions" className="block text-sm font-medium text-slate-600 mb-2">
                        Dieta (Restrições)
                    </label>
                    <textarea
                        id="restrictions"
                        value={restrictions}
                        onChange={(e) => setRestrictions(e.target.value)}
                        rows={5}
                        className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Ex: Anti-inflamatória (sem lactose, aveia, batata-doce, frituras)"
                    />
                </div>

                <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditRestrictionsModal;