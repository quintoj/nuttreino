import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Icons } from './Icons';

interface FastingTimerProps {
    strategy: string; // e.g., "14/10"
}

const FastingTimer: React.FC<FastingTimerProps> = ({ strategy }) => {
    const parseStrategy = useCallback(() => {
        const match = strategy.match(/(\d+)\/(\d+)/);
        if (match) {
            const fastingHours = parseInt(match[1], 10);
            const eatingHours = parseInt(match[2], 10);
            return { fastingHours, eatingHours };
        }
        return { fastingHours: 14, eatingHours: 10 }; // Default
    }, [strategy]);

    const { fastingHours, eatingHours } = useMemo(() => parseStrategy(), [parseStrategy]);
    const TOTAL_DURATION_SECONDS = fastingHours * 60 * 60;

    const [timeRemaining, setTimeRemaining] = useState(TOTAL_DURATION_SECONDS);
    const [isActive, setIsActive] = useState(false);
    const [startTimeInput, setStartTimeInput] = useState('');

    useEffect(() => {
        setIsActive(false);
        setStartTimeInput('');
        setTimeRemaining(TOTAL_DURATION_SECONDS);
    }, [TOTAL_DURATION_SECONDS]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isActive && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeRemaining <= 0) {
            setIsActive(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeRemaining]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const progressPercentage = useMemo(() => {
        if (TOTAL_DURATION_SECONDS === 0) return 0;
        return ((TOTAL_DURATION_SECONDS - timeRemaining) / TOTAL_DURATION_SECONDS) * 100;
    }, [timeRemaining, TOTAL_DURATION_SECONDS]);

    const handleStart = () => {
        if (!isActive) { // Only calculate start time when beginning or resuming
            if (startTimeInput) {
                const now = new Date();
                const [hours, minutes] = startTimeInput.split(':').map(Number);
                
                if (!isNaN(hours) && !isNaN(minutes)) {
                    const startDate = new Date();
                    startDate.setHours(hours, minutes, 0, 0);

                    // If the start time is in the future, assume it was yesterday
                    if (startDate > now) {
                        startDate.setDate(startDate.getDate() - 1);
                    }

                    const elapsedSeconds = Math.floor((now.getTime() - startDate.getTime()) / 1000);

                    if (elapsedSeconds >= TOTAL_DURATION_SECONDS) {
                        setTimeRemaining(0); // Fast is already complete
                    } else if (elapsedSeconds > 0) {
                        setTimeRemaining(TOTAL_DURATION_SECONDS - elapsedSeconds);
                    } else {
                        setTimeRemaining(TOTAL_DURATION_SECONDS); // Start fresh if time is invalid
                    }
                } else {
                     setTimeRemaining(TOTAL_DURATION_SECONDS); // Start fresh if time is invalid
                }

            } else {
                if (timeRemaining <= 0) {
                    setTimeRemaining(TOTAL_DURATION_SECONDS);
                }
            }
        }
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeRemaining(TOTAL_DURATION_SECONDS);
        setStartTimeInput('');
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold flex items-center text-slate-800 mb-4">
                <Icons.Timer className="w-6 h-6 mr-3 text-blue-500" />
                Cronômetro de Jejum {fastingHours}/{eatingHours}
            </h2>
            <div className="text-center my-6">
                <p className="text-5xl font-extrabold text-slate-800 tracking-tight">{formatTime(timeRemaining)}</p>
                <p className="text-sm text-slate-500 mt-1">
                    {isActive ? 'Período de Jejum' : timeRemaining <= 0 ? 'Jejum Concluído!' : 'Pausado'}
                </p>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <p className="text-center text-sm text-slate-600 mb-6">
                Janela alimentar: {eatingHours} horas
            </p>

            <div className="mb-6 space-y-1">
                <label htmlFor="start-time" className="block text-sm font-medium text-slate-600 text-center">
                    Hora de Início (opcional)
                </label>
                <input
                    id="start-time"
                    type="time"
                    value={startTimeInput}
                    onChange={(e) => setStartTimeInput(e.target.value)}
                    disabled={isActive}
                    className="w-full max-w-xs mx-auto block p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
            </div>


            <div className="flex items-center justify-center gap-4">
                <button 
                    onClick={handleStart}
                    className={`px-6 py-2.5 font-semibold text-white rounded-lg transition-colors ${isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {isActive ? 'Pausar' : 'Iniciar'}
                </button>
                <button 
                    onClick={handleReset}
                    className="px-6 py-2.5 font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
                >
                    Reset
                </button>
            </div>
            <div className="text-center text-xs text-slate-400 mt-6 space-y-1">
                <p>Jejum: {fastingHours} horas</p>
                <p>Alimentação: {eatingHours} horas</p>
            </div>
        </div>
    );
};

export default FastingTimer;