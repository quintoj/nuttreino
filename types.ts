// Fix: Import React to use React.ElementType
import type React from 'react';

export interface Profile {
    name: string;
    age: number;
    height: number;
    currentWeight: number;
    targetWeight: number;
    visceralFat: number;
    muscleMass: number;
    tmb: number;
    get: number;
    workTime: string;
    workoutTime: string;
    restrictionHealth: string;
    restrictionDiet: string;
    fastingStrategy: string;
    activityLevel: string;
}

export interface Calculations {
    targetCalorieGoal: number;
    proteinPercentage: number;
    fatPercentage: number;
    carbPercentage: number;
    goalType: 'weight' | 'date';
    targetDate: string;
}

export interface Supplement {
    id: number;
    name: string;
    dosage: string;
    timing: string;
    taken: boolean;
}

export interface Exercise {
    id: string;
    name: string;
    series: number;
    reps: string;
    rest: string;
    muscles: string;
    description: string;
    alternatives: string;
    isEditing?: boolean;
}


export interface WorkoutTemplate {
    id: string;
    icon: React.ElementType;
    focus: string;
    description: string;
    kcal: number;
    duration: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    exercises: Exercise[];
}

export interface Meal {
    time: string;
    description: string;
    substitutions?: string[];
}

export interface AIContent {
    mealPlan: Meal[];
    motivationalAlert: string;
    workoutSuggestion: string;
}


// --- Workout Logging Types ---

export interface SetLog {
    setNumber: number;
    targetReps: string;
    actualReps: number;
}

export interface ExerciseLog {
    exerciseId: string;
    exerciseName: string;
    sets: SetLog[];
}

export interface WorkoutSessionLog {
    id: number; // Using timestamp for unique ID
    date: string;
    workoutName: string;
    durationMinutes: number;
    exercises: ExerciseLog[];
}