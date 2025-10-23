
import React, { useState, useMemo, useEffect } from 'react';
import { initialProfile, initialCalculations, initialSupplements, initialWorkoutTemplates, initialAIContent } from './constants';
import type { Profile, Calculations, Supplement, WorkoutTemplate, AIContent, WorkoutSessionLog } from './types';
import { generatePlans } from './services/geminiService';

import PersonalDataCard from './components/PersonalDataCard';
import MacroCard from './components/MacroCard';
import FastingTimer from './components/FastingTimer';
import RestrictionsCard from './components/RestrictionsCard';
import SupplementCard from './components/SupplementCard';
import WorkoutCard from './components/WorkoutCard';
import { Icons } from './components/Icons';
import EditProfileModal from './components/EditProfileModal';
import EditRestrictionsModal from './components/EditRestrictionsModal';
import AIPlannerCard from './components/AIPlannerCard';
import MealPlanCard from './components/MealPlanCard';
import WorkoutDetail from './components/WorkoutDetail';
import EditWorkoutModal from './components/EditWorkoutModal';
import WorkoutSessionModal from './components/WorkoutSessionModal';
import WorkoutReportCard from './components/WorkoutReportCard';


const App: React.FC = () => {
    const [profile, setProfile] = useState<Profile>(initialProfile);
    const [calculations, setCalculations] = useState<Calculations>(initialCalculations);
    const [supplements, setSupplements] = useState<Supplement[]>(initialSupplements);
    const [workoutTemplates, setWorkoutTemplates] = useState<WorkoutTemplate[]>(initialWorkoutTemplates);
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutTemplate | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRestrictionsModalOpen, setIsRestrictionsModalOpen] = useState(false);
    const [isEditWorkoutModalOpen, setIsEditWorkoutModalOpen] = useState(false);
    const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutTemplate | null>(null);
    const [aiContent, setAiContent] = useState<AIContent>(initialAIContent);
    const [isLoading, setIsLoading] = useState(false);
    const [isWorkoutSessionActive, setIsWorkoutSessionActive] = useState(false);
    const [activeWorkout, setActiveWorkout] = useState<WorkoutTemplate | null>(null);
    const [workoutLogs, setWorkoutLogs] = useState<WorkoutSessionLog[]>([]);

    useEffect(() => {
        try {
            const savedLogs = localStorage.getItem('workoutLogs');
            if (savedLogs) {
                setWorkoutLogs(JSON.parse(savedLogs));
            }
        } catch (error) {
            console.error("Failed to load workout logs from localStorage", error);
        }
    }, []);


    const derivedMetrics = useMemo(() => {
        const { targetCalorieGoal, proteinPercentage, fatPercentage, carbPercentage } = calculations;
        
        const proteinGrams = Math.round((targetCalorieGoal * (proteinPercentage / 100)) / 4);
        const fatGrams = Math.round((targetCalorieGoal * (fatPercentage / 100)) / 9);
        const carbGrams = Math.round((targetCalorieGoal * (carbPercentage / 100)) / 4);

        return {
            proteinGrams,
            fatGrams,
            carbGrams,
        };
    }, [calculations]);

    const handleGeneratePlan = async () => {
        setIsLoading(true);
        const result = await generatePlans(profile, calculations);
        setAiContent(result);
        setIsLoading(false);
    };
    
    const handleSupplementToggle = (id: number) => {
        setSupplements(prevSupplements =>
            prevSupplements.map(sup =>
                sup.id === id ? { ...sup, taken: !sup.taken } : sup
            )
        );
    };

    const handleProfileSave = (updatedProfile: Profile) => {
        setProfile(updatedProfile);
        setIsEditModalOpen(false);
    };

    const handleRestrictionsSave = (newRestrictions: string) => {
        setProfile(prev => ({ ...prev, restrictionDiet: newRestrictions }));
        setIsRestrictionsModalOpen(false);
    };

    const resetSupplements = () => {
        setSupplements(prevSupplements =>
            prevSupplements.map(sup => ({ ...sup, taken: false }))
        );
    };

    const handleSelectWorkout = (templateId: string) => {
        const workout = workoutTemplates.find(w => w.id === templateId) || null;
        setSelectedWorkout(workout);
    };

    const handlePersonalizeWorkout = (workout: WorkoutTemplate) => {
        setWorkoutToEdit(workout);
        setIsEditWorkoutModalOpen(true);
    };

    const handleSaveWorkout = (updatedWorkout: WorkoutTemplate) => {
        const updatedList = workoutTemplates.map(w => w.id === updatedWorkout.id ? updatedWorkout : w);
        setWorkoutTemplates(updatedList);
        // If the currently selected workout was the one being edited, update it
        if (selectedWorkout && selectedWorkout.id === updatedWorkout.id) {
            setSelectedWorkout(updatedWorkout);
        }
        setIsEditWorkoutModalOpen(false);
        setWorkoutToEdit(null);
    };

    const handleStartWorkout = (workout: WorkoutTemplate) => {
        setActiveWorkout(workout);
        setIsWorkoutSessionActive(true);
    };

    const handleEndWorkout = (finalLog?: WorkoutSessionLog) => {
        if (finalLog) {
            setWorkoutLogs(prevLogs => {
                const newLogs = [finalLog, ...prevLogs];
                try {
                    localStorage.setItem('workoutLogs', JSON.stringify(newLogs));
                } catch (error) {
                    console.error("Failed to save workout logs to localStorage", error);
                }
                return newLogs;
            });
        }
        setIsWorkoutSessionActive(false);
        setActiveWorkout(null);
    };


    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 font-inter p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* Coluna Principal (Esquerda) */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <PersonalDataCard profile={profile} onEdit={() => setIsEditModalOpen(true)} />
                        
                        <AIPlannerCard 
                            onGenerate={handleGeneratePlan}
                            isLoading={isLoading}
                            alert={aiContent.motivationalAlert}
                            suggestion={aiContent.workoutSuggestion}
                        />

                        <MealPlanCard mealPlan={aiContent.mealPlan} />

                        <RestrictionsCard restrictions={profile.restrictionDiet} onEdit={() => setIsRestrictionsModalOpen(true)} />

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-bold flex items-center text-slate-800 mb-4">
                                <Icons.Workout className="w-6 h-6 mr-3 text-blue-500" />
                                Seleção de Treino
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {workoutTemplates.map(template => (
                                    <WorkoutCard
                                        key={template.id}
                                        template={template}
                                        isSelected={selectedWorkout?.id === template.id}
                                        onSelect={() => handleSelectWorkout(template.id)}
                                    />
                                ))}
                            </div>
                           {selectedWorkout && (
                                <WorkoutDetail 
                                    workout={selectedWorkout}
                                    onHide={() => setSelectedWorkout(null)}
                                    onPersonalize={handlePersonalizeWorkout}
                                    onStart={() => handleStartWorkout(selectedWorkout)}
                                />
                           )}
                        </div>
                        <WorkoutReportCard logs={workoutLogs} />
                    </div>

                    {/* Coluna Secundária (Direita) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <MacroCard
                            calories={calculations.targetCalorieGoal}
                            get={profile.get}
                            proteinGrams={derivedMetrics.proteinGrams}
                            fatGrams={derivedMetrics.fatGrams}
                            carbGrams={derivedMetrics.carbGrams}
                            proteinPercentage={calculations.proteinPercentage}
                            fatPercentage={calculations.fatPercentage}
                            carbPercentage={calculations.carbPercentage}
                        />
                        <FastingTimer strategy={profile.fastingStrategy} />
                        <SupplementCard 
                            supplements={supplements}
                            onToggle={handleSupplementToggle}
                            onReset={resetSupplements}
                        />
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditProfileModal
                    profile={profile}
                    onSave={handleProfileSave}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
            {isRestrictionsModalOpen && (
                <EditRestrictionsModal
                    initialRestrictions={profile.restrictionDiet}
                    onSave={handleRestrictionsSave}
                    onClose={() => setIsRestrictionsModalOpen(false)}
                />
            )}
            {isEditWorkoutModalOpen && workoutToEdit && (
                <EditWorkoutModal
                    workout={workoutToEdit}
                    onSave={handleSaveWorkout}
                    onClose={() => setIsEditWorkoutModalOpen(false)}
                />
            )}
            {isWorkoutSessionActive && activeWorkout && (
                <WorkoutSessionModal
                    workout={activeWorkout}
                    onClose={handleEndWorkout}
                />
            )}
        </div>
    );
};

export default App;