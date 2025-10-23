import React, { useState, useEffect, useRef } from 'react';
import type { WorkoutTemplate, WorkoutSessionLog, ExerciseLog, SetLog } from '../types';
import ActiveExercise from './ActiveExercise';
import RestTimer from './RestTimer';
import { Icons } from './Icons';

interface WorkoutSessionModalProps {
    workout: WorkoutTemplate;
    onClose: (finalLog?: WorkoutSessionLog) => void;
}

const WorkoutSessionModal: React.FC<WorkoutSessionModalProps> = ({ workout, onClose }) => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSetNumber, setCurrentSetNumber] = useState(1);
    const [isResting, setIsResting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    
    const workoutLogRef = useRef<WorkoutSessionLog | null>(null);

    // Initialize log on mount
    useEffect(() => {
        workoutLogRef.current = {
            id: Date.now(),
            date: new Date().toISOString(),
            workoutName: workout.focus,
            durationMinutes: 0, // Will be calculated at the end
            exercises: [],
        };
    }, [workout.focus]);

    const currentExercise = workout.exercises[currentExerciseIndex];
    const nextExercise = workout.exercises[currentExerciseIndex + 1];

    const handleCompleteSet = (reps: number) => {
        if (!workoutLogRef.current) return;

        // Find or create the log for the current exercise
        let exerciseLog = workoutLogRef.current.exercises.find(e => e.exerciseId === currentExercise.id);
        if (!exerciseLog) {
            exerciseLog = {
                exerciseId: currentExercise.id,
                exerciseName: currentExercise.name,
                sets: [],
            };
            workoutLogRef.current.exercises.push(exerciseLog);
        }

        // Add the new set log
        const setLog: SetLog = {
            setNumber: currentSetNumber,
            targetReps: currentExercise.reps,
            actualReps: reps,
        };
        exerciseLog.sets.push(setLog);

        setIsResting(true);
    };
    
    const handleFinishRest = () => {
        // More sets in the current exercise?
        if (currentSetNumber < currentExercise.series) {
            setCurrentSetNumber(prev => prev + 1);
        } 
        // More exercises in the workout?
        else if (currentExerciseIndex < workout.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setCurrentSetNumber(1);
        } 
        // Workout finished
        else {
            handleEndWorkout();
        }
        setIsResting(false);
    };

    const handleEndWorkout = () => {
        if (workoutLogRef.current) {
            const startTime = new Date(workoutLogRef.current.date).getTime();
            const endTime = Date.now();
            const durationMs = endTime - startTime;
            workoutLogRef.current.durationMinutes = Math.round(durationMs / 60000);
        }
        setIsFinished(true);
    };

    const handleCloseModal = () => {
        onClose(workoutLogRef.current ?? undefined);
    };

    const parseRestTime = (rest: string): number => {
        const secondsMatch = rest.match(/(\d+)s/);
        if (secondsMatch) {
            return parseInt(secondsMatch[1], 10);
        }
        return 60; // Default to 60 seconds if format is unexpected
    };


    if (isFinished) {
        const finalLog = workoutLogRef.current;
        return (
            <div className="fixed inset-0 bg-slate-900 bg-opacity-95 z-50 flex items-center justify-center p-4">
                <div className="bg-slate-800 text-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-blue-400 mb-2">Treino Concluído!</h2>
                    <p className="text-slate-400 mb-6">Bom trabalho! Aqui está o resumo da sua sessão.</p>
                    
                    <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                        {finalLog?.exercises.map(exLog => (
                             <div key={exLog.exerciseId} className="bg-slate-700 p-4 rounded-lg">
                                <h3 className="font-bold text-lg">{exLog.exerciseName}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-300">
                                    {exLog.sets.map(set => (
                                        <span key={set.setNumber} className="border border-slate-600 px-2 py-0.5 rounded-md">
                                            Série {set.setNumber}: {set.actualReps} reps
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center text-lg">
                        <p>Duração Total: <span className="font-bold text-blue-400">{finalLog?.durationMinutes} minutos</span></p>
                    </div>

                    <button
                        onClick={handleCloseModal}
                        className="w-full mt-8 py-3 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto">
            {isResting ? (
                <RestTimer 
                    durationInSeconds={parseRestTime(currentExercise.rest)}
                    onFinish={handleFinishRest}
                    nextExerciseName={
                        currentSetNumber < currentExercise.series 
                            ? currentExercise.name 
                            : nextExercise?.name
                    }
                />
            ) : (
                <ActiveExercise 
                    exercise={currentExercise}
                    currentSet={currentSetNumber}
                    workoutTitle={workout.focus}
                    onCompleteSet={handleCompleteSet}
                    onEndWorkout={handleEndWorkout}
                    currentExerciseNumber={currentExerciseIndex + 1}
                    totalExercises={workout.exercises.length}
                />
            )}
        </div>
    );
};

export default WorkoutSessionModal;