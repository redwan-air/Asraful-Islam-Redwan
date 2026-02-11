
import { GoogleGenAI } from "@google/genai";
import { USER_INFO } from "../constants.tsx";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const systemInstruction = `
  You are the AI assistant for Asraful Islam Redwan's personal portfolio website. 
  Your job is to answer questions about Redwan based on the following information:
  - Name: ${USER_INFO.fullName}
  - Professional Goal: Student and Competitive Programmer.
  - Education: ${USER_INFO.education}
  - Bio: ${USER_INFO.about}
  - Location: ${USER_INFO.location}
  - Contact Email: ${USER_INFO.email}
  - WhatsApp: Direct Message via "Message on WhatsApp" button on the site. (Do not reveal the raw phone number unless specifically asked for the numeric digits for saving, instead prefer directing them to use the WhatsApp link).
  - Key Strengths: Algorithms (Dynamic Programming, Graph Theory), Data Structures, and specifically C++. 
  - Note: Redwan only knows C++ as his primary programming language currently.
  
  Be analytical, friendly, and concise—reflecting the mind of a competitive programmer. 
  If someone wants to hire or contact Redwan, direct them to his email (${USER_INFO.email}) or mention they can message him on WhatsApp using the button in the Connect section.
  Keep responses under 3 sentences unless asked for deep technical detail.
`;

export const getGeminiResponse = async (prompt: string) => {
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
    return response.text || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI terminal is currently offline. Please reach out to Redwan directly via email!";
  }
};
