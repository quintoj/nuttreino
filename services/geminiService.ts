import { GoogleGenAI, Type } from "@google/genai";
import type { Profile, Calculations, AIContent } from '../types';

export const generatePlans = async (profile: Profile, calculations: Calculations): Promise<AIContent> => {
    
    // Ensure API_KEY is available
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API Key not found.");
        throw new Error("API Key não configurada. Verifique o ambiente.");
    }

    const ai = new GoogleGenAI({ apiKey });

    const userContext = `
        - **Nome:** ${profile.name}
        - **Idade:** ${profile.age}
        - **Peso Atual:** ${profile.currentWeight} kg
        - **Meta Calórica Diária:** ${calculations.targetCalorieGoal} kcal
        - **Macros:** Proteína ${Math.round((calculations.targetCalorieGoal * (calculations.proteinPercentage / 100)) / 4)}g, Gordura ${Math.round((calculations.targetCalorieGoal * (calculations.fatPercentage / 100)) / 9)}g, Carboidrato ${Math.round((calculations.targetCalorieGoal * (calculations.carbPercentage / 100)) / 4)}g
        - **Restrições Alimentares:** ${profile.restrictionDiet}
        - **Restrições de Treino:** ${profile.restrictionHealth}
        - **Estratégia de Jejum:** ${profile.fastingStrategy}
    `;

    const systemPrompt = `
        Você é um nutricionista e coach esportivo de elite, especialista em otimização de performance e bem-estar.
        Sua tarefa é criar um plano conciso e prático para o usuário, baseado nos dados fornecidos.
        A resposta DEVE ser um objeto JSON válido, em português do Brasil, e seguir estritamente o schema definido.

        **Instruções:**
        1.  **Plano Alimentar (mealPlan):** Crie 4 refeições principais (ex: Café da Manhã, Almoço, Lanche, Jantar) que se encaixem na meta calórica e nas restrições. As refeições devem ser simples, com ingredientes comuns.
        2.  **Alerta Motivacional (motivationalAlert):** Crie uma frase curta, poderosa e encorajadora para o usuário.
        3.  **Sugestão de Treino (workoutSuggestion):** Analise o perfil e sugira uma combinação de treinos para a semana. Seja breve e direto. Ex: "Para queimar gordura e manter a massa magra, foque em 'Pernas e Glúteos' e 'Corpo Inteiro', complementando com 'Cardio Leve' nos dias de descanso ativo."
    `;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            mealPlan: {
                type: Type.ARRAY,
                description: "Plano alimentar com 4 refeições.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        time: { type: Type.STRING, description: "Nome da refeição (ex: Almoço)" },
                        description: { type: Type.STRING, description: "Descrição da refeição." }
                    },
                    required: ["time", "description"]
                }
            },
            motivationalAlert: {
                type: Type.STRING,
                description: "Frase motivacional curta."
            },
            workoutSuggestion: {
                type: Type.STRING,
                description: "Sugestão textual e breve de foco de treino semanal."
            }
        },
        required: ["mealPlan", "motivationalAlert", "workoutSuggestion"]
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ parts: [{ text: userContext }] }],
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });

        const jsonText = response.text.trim();
        if (!jsonText) {
            throw new Error("Resposta da IA vazia ou mal formatada.");
        }

        const parsedContent = JSON.parse(jsonText);
        return parsedContent;

    } catch (error) {
        console.error("Erro ao chamar a Gemini API:", error);
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        // Retorna um objeto de erro para ser exibido na UI
        return {
            mealPlan: [],
            motivationalAlert: `Erro na IA: ${errorMessage}. Tente novamente.`,
            workoutSuggestion: "Não foi possível gerar sugestão de treino."
        };
    }
};