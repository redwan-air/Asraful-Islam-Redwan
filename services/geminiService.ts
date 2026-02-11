import { GoogleGenAI } from "@google/genai";
import { USER_INFO } from "../constants.tsx";

// System instruction for the assistant
const systemInstruction = `
  You are the AI assistant for Asraful Islam Redwan's personal portfolio website. 
  Your job is to answer questions about Redwan based on the following information:
  - Name: ${USER_INFO.fullName}
  - Professional Goal: Student and Competitive Programmer.
  - Education: ${USER_INFO.education}
  - Bio: ${USER_INFO.about}
  - Location: ${USER_INFO.location}
  - Contact Email: ${USER_INFO.email}
  - WhatsApp: Direct Message via "Message on WhatsApp" button in the Connect section.
  - Key Strengths: Algorithms (Dynamic Programming, Graph Theory), Data Structures, and specifically C++. 
  - Note: Redwan only knows C++ as his primary programming language currently.
  
  Be analytical, friendly, and concise—reflecting the mind of a competitive programmer. 
  If someone wants to hire or contact Redwan, direct them to his email (${USER_INFO.email}) or the "Connect" section on the website.
  Keep responses under 3 sentences unless asked for deep technical detail.
`;

export const getGeminiResponse = async (prompt: string) => {
  // Always initialize GoogleGenAI with process.env.API_KEY directly and inside the call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      },
    });
    // The response.text property directly returns the string output as a property.
    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI terminal is currently offline. Please reach out to Redwan directly via email!";
  }
};