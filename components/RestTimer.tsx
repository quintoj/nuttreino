import React, { useState, useEffect } from 'react';

interface RestTimerProps {
    durationInSeconds: number;
    onFinish: () => void;
    nextExerciseName?: string;
}

const RestTimer: React.FC<RestTimerProps> = ({ durationInSeconds, onFinish, nextExerciseName }) => {
    const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);

    useEffect(() => {
        if (timeRemaining <= 0) {
            onFinish();
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, onFinish]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };
    
    const progress = (timeRemaining / durationInSeconds) * 100;
    const strokeDashoffset = 283 * (1 - progress / 100);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-slate-900">
             <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center mb-8">
                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-slate-700"
                        stroke="currentColor"
                        strokeWidth="5"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                    />
                     <circle
                        className="text-blue-500"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        strokeDasharray="283"
                        strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="z-10">
                    <p className="text-slate-400 text-2xl">Descanso</p>
                    <p className="text-white text-7xl sm:text-8xl font-bold tracking-tighter">
                        {formatTime(timeRemaining)}
                    </p>
                </div>
            </div>

            {nextExerciseName && (
                <div className="mb-8">
                    <p className="text-slate-400 text-lg">A seguir:</p>
                    <p className="text-white text-2xl font-semibold">{nextExerciseName}</p>
                </div>
            )}
            
            <button
                onClick={onFinish}
                className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg text-lg transition-colors"
            >
                Pular Descanso
            </button>
        </div>
    );
};

export default RestTimer;
