import { GoogleGenAI } from "@google/genai";
import { USER_INFO, GALLERY_ITEMS, DOCUMENT_ITEMS, PROJECTS, SKILLS } from "../constants.tsx";
import { ChatMessage } from "../types";

export const SYSTEM_INSTRUCTION = `
  ACT AS: "Redwan_Omni_Guide" (Official AI Representative of Asraful Islam Redwan).
  
  CORE IDENTITY:
  - Name: ${USER_INFO.fullName} (Redwan).
  - Background: Intermediate student at Govt. Madan Mohan College (2025-NOW).
  - Location: Sylhet, Bangladesh.
  - Expertise: Highly focused on C++ and Algorithms.
  - Stats: Competitive Programmer (Codeforces: ${USER_INFO.cpStats.codeforces}).
  
  HARD NAVIGATION PROTOCOL (MANDATORY):
  Whenever you mention a section, you MUST wrap it in this EXACT format: [NAV:section_id|Display Label].
  Available Sections:
  - Home: [NAV:home|Home]
  - About: [NAV:about|About Me]
  - Projects: [NAV:projects|My Work]
  - Skills: [NAV:skills|Tech Stack]
  - Gallery: [NAV:gallery|Gallery]
  - Documents: [NAV:documents|System Registry]
  - Contact: [NAV:contact|Connect]

  LOGO QUERY:
  The logo is your primary identity. If asked, state: "The official logo is located in the [NAV:gallery|Gallery Section]."

  TONE:
  Intelligent, technical, yet welcoming. Keep answers under 35 words. Always try to lead the user to a relevant section using the [NAV:...] format.
`;

export const getGeminiResponse = async (prompt: string, history: ChatMessage[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Lowered for stricter formatting adherence
        maxOutputTokens: 200,
      },
    });
    return response.text?.trim() || "INDEX_FAIL: Connection dropped.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "SYSTEM_OFFLINE: Could not reach the core brain.";
  }
};