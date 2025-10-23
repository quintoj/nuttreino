import React, { useState } from 'react';
import type { Exercise } from '../types';
import { Icons } from './Icons';

interface ActiveExerciseProps {
    exercise: Exercise;
    currentSet: number;
    workoutTitle: string;
    onCompleteSet: (reps: number) => void;
    onEndWorkout: () => void;
    currentExerciseNumber: number;
    totalExercises: number;
}

const ActiveExercise: React.FC<ActiveExerciseProps> = ({ exercise, currentSet, workoutTitle, onCompleteSet, onEndWorkout, currentExerciseNumber, totalExercises }) => {
    const [repsDone, setRepsDone] = useState('');

    const handleComplete = () => {
        onCompleteSet(parseInt(repsDone, 10) || 0);
    };

    return (
        <div className="min-h-screen flex flex-col p-4 sm:p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">{workoutTitle}</h1>
                    <p className="text-slate-400">Exercício {currentExerciseNumber} de {totalExercises}</p>
                </div>
                <button onClick={onEndWorkout} className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg">
                    Finalizar Treino
                </button>
            </header>

            <main className="flex-grow flex flex-col justify-center items-center text-center">
                <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-2xl">
                    <p className="text-xl sm:text-2xl font-semibold text-slate-400">Série {currentSet} de {exercise.series}</p>
                    <h2 className="text-4xl sm:text-6xl font-bold my-4">{exercise.name}</h2>
                    <p className="text-2xl sm:text-3xl font-light text-blue-400 mb-8">Meta: {exercise.reps} reps</p>
                    
                    <div className="max-w-xs mx-auto">
                        <label htmlFor="repsDone" className="block text-lg font-medium text-slate-300 mb-2">Quantas repetições você fez?</label>
                        <input
                            id="repsDone"
                            type="number"
                            value={repsDone}
                            onChange={(e) => setRepsDone(e.target.value)}
                            className="w-full text-center text-5xl font-bold p-3 bg-slate-700 border-2 border-slate-600 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition"
                            placeholder="0"
                        />
                    </div>
                </div>
            </main>

            <footer className="mt-8">
                <button
                    onClick={handleComplete}
                    className="w-full max-w-2xl mx-auto py-4 text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-transform hover:scale-105"
                >
                    Finalizar Série e Descansar
                </button>
            </footer>
        </div>
    );
};

export default ActiveExercise;
