
import { GoogleGenAI } from "@google/genai";

export const generateFollowUpMessage = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating message with Gemini:", error);
    if (error instanceof Error) {
        return `An error occurred while generating the message: ${error.message}`;
    }
    return "An unknown error occurred while generating the message.";
  }
};
