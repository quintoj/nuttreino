import type { Profile, Calculations, Supplement, WorkoutTemplate, AIContent } from './types';
import { Icons } from './components/Icons';

export const initialProfile: Profile = {
    name: "João Francisco",
    age: 49,
    height: 1.71,
    currentWeight: 89.4,
    targetWeight: 79.4,
    visceralFat: 12,
    muscleMass: 34.4,
    tmb: 1826,
    get: 3287,
    workTime: "06:20-15:30",
    workoutTime: "16:00",
    restrictionHealth: "Artrose no pé esquerdo (sem caminhada e prancha)",
    restrictionDiet: "Nenhuma restrição alimentar selecionada",
    fastingStrategy: "14/10",
    activityLevel: "Ligeiramente Ativo (1.375)",
};

export const initialCalculations: Calculations = {
    targetCalorieGoal: 2667,
    proteinPercentage: 40,
    fatPercentage: 35,
    carbPercentage: 25,
    goalType: 'weight',
    targetDate: '', 
};

export const initialSupplements: Supplement[] = [
    { id: 1, name: 'Vitamina D3', dosage: '2000-4000 UI', timing: 'Manhã com gordura', taken: false },
    { id: 2, name: 'Ômega-3', dosage: '1-2g EPA/DHA', timing: 'Com refeições', taken: false },
    { id: 3, name: 'Complexo B Ativo', dosage: 'B6 + Metilfolato', timing: 'Manhã em jejum', taken: false },
    { id: 4, name: 'Magnésio Quelato', dosage: '200-300mg', timing: 'Noite antes de dormir', taken: false },
    { id: 5, name: 'Whey Protein', dosage: '25-30g', timing: 'Pós-treino', taken: false },
    { id: 6, name: 'Creatina', dosage: '3-5g', timing: 'Qualquer horário', taken: false },
];

export const initialWorkoutTemplates: WorkoutTemplate[] = [
    {
        id: 'bracos_ombros',
        icon: Icons.Arm,
        focus: 'Braços e Ombros',
        description: 'Fortalecimento de membros superiores',
        kcal: 420,
        duration: 45,
        level: 'Intermediate',
        exercises: [
            { id: 'bo1', name: 'Desenvolvimento com Halteres', series: 4, reps: '8-12', rest: '60s', muscles: 'ombros, tríceps', description: 'Sentado em um banco com apoio, eleve os halteres acima da cabeça.', alternatives: 'Desenvolvimento Arnold, Elevação Lateral' },
            { id: 'bo2', name: 'Rosca Direta com Barra', series: 3, reps: '10-15', rest: '60s', muscles: 'bíceps', description: 'Em pé, segure a barra com as palmas para cima e flexione os cotovelos.', alternatives: 'Rosca Alternada, Rosca Martelo' },
            { id: 'bo3', name: 'Tríceps na Polia Alta', series: 3, reps: '12-15', rest: '60s', muscles: 'tríceps', description: 'Puxe a barra para baixo até a extensão completa dos cotovelos.', alternatives: 'Tríceps Testa, Tríceps Francês' },
        ]
    },
    {
        id: 'pernas_gluteos',
        icon: Icons.Leg,
        focus: 'Pernas e Glúteos',
        description: 'Fortalecimento de membros inferiores',
        kcal: 550,
        duration: 50,
        level: 'Intermediate',
        exercises: [
             { id: 'pg1', name: 'Agachamento Livre', series: 4, reps: '8-12', rest: '90s', muscles: 'quadríceps, glúteos', description: 'Descer até 90° mantendo o peso nos calcanhares.', alternatives: 'Agachamento Sumô, Agachamento Búlgaro' },
             { id: 'pg2', name: 'Levantamento Terra Romeno', series: 3, reps: '10-12', rest: '75s', muscles: 'posteriores, glúteos', description: 'Mantenha as pernas semi-flexionadas e desça o tronco com a coluna reta.', alternatives: 'Stiff com Halteres' },
             { id: 'pg3', name: 'Elevação Pélvica', series: 4, reps: '12-15', rest: '60s', muscles: 'glúteos', description: 'Eleve o quadril contraindo os glúteos ao máximo no topo.', alternatives: 'Elevação Pélvica Unilateral' },
        ]
    },
    {
        id: 'corpo_inteiro',
        icon: Icons.Body,
        focus: 'Corpo Inteiro',
        description: 'Treino completo e funcional',
        kcal: 480,
        duration: 55,
        level: 'Intermediate',
        exercises: [
            { id: 'ci1', name: 'Agachamento Livre', series: 4, reps: '12-15', rest: '90s', muscles: 'quadríceps, glúteos', description: 'Descer até 90° mantendo o peso nos calcanhares.', alternatives: 'Agachamento Sumô, Agachamento Búlgaro' },
            { id: 'ci2', name: 'Flexão Modificada', series: 3, reps: '8-12', rest: '60s', muscles: 'peito, tríceps', description: 'Flexão nos joelhos ou inclinada no banco.', alternatives: 'Flexão na Parede, Flexão Inclinada' },
            { id: 'ci3', name: 'Remada Curvada', series: 3, reps: '10-12', rest: '75s', muscles: 'costas, bíceps', description: 'Puxar os cotovelos para trás contraindo as escápulas.', alternatives: 'Remada Unilateral, Remada no Cabo' },
            { id: 'ci4', name: 'Burpee Modificado', series: 3, reps: '5-8', rest: '90s', muscles: 'corpo todo', description: 'Versão sem salto, stepping back ao invés de jump.', alternatives: 'Mountain Climbers, Squat to Press' },
        ]
    },
    {
        id: 'core_postura',
        icon: Icons.Core,
        focus: 'Core e Postura',
        description: 'Estabilização e mobilidade',
        kcal: 320,
        duration: 40,
        level: 'Beginner',
        exercises: [
            { id: 'cp1', name: 'Prancha Isométrica (Joelhos)', series: 4, reps: '30-45s', rest: '60s', muscles: 'abdômen, lombar', description: 'Mantenha o corpo alinhado com apoio nos antebraços e joelhos.', alternatives: 'Prancha lateral (joelhos)' },
            { id: 'cp2', name: 'Perdigueiro', series: 3, reps: '12-15 por lado', rest: '45s', muscles: 'core, glúteos', description: 'Em 4 apoios, estenda braço e perna opostos simultaneamente.', alternatives: 'Superman no chão' },
            { id: 'cp3', name: 'Ponte de Glúteos', series: 4, reps: '15-20', rest: '60s', muscles: 'glúteos, lombar', description: 'Deitado, eleve o quadril contraindo os glúteos.', alternatives: 'Ponte Unilateral' },
        ]
    },
    {
        id: 'cardio_leve',
        icon: Icons.Cardio,
        focus: 'Cardio Leve',
        description: 'Baixo impacto para articulações',
        kcal: 380,
        duration: 35,
        level: 'Beginner',
        exercises: [
            { id: 'cl1', name: 'Bicicleta Ergométrica', series: 1, reps: '25 min', rest: 'N/A', muscles: 'cardio, pernas', description: 'Manter um ritmo constante e moderado, sem sobrecarregar o joelho.', alternatives: 'Elíptico (transport), Natação' },
            { id: 'cl2', name: 'Polichinelo sem Salto', series: 5, reps: '45s', rest: '30s', muscles: 'cardio', description: 'Abra e feche braços e pernas alternadamente, tocando o pé ao lado.', alternatives: 'Marcha estacionária' },
        ]
    },
];

export const initialAIContent: AIContent = {
    mealPlan: [],
    motivationalAlert: "Clique em 'Gerar Plano com IA' para receber um plano personalizado.",
    workoutSuggestion: ""
};