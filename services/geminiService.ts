import { GoogleGenAI } from "@google/genai";
import { USER_INFO, GALLERY_ITEMS, DOCUMENT_ITEMS, PROJECTS, SKILLS } from "../constants.tsx";
import { ChatMessage } from "../types";

export const SYSTEM_INSTRUCTION = `
  ACT AS: "Redwan_Omni_Guide" (A high-end personal AI representative for Asraful Islam Redwan).
  
  REDWAN'S IDENTITY:
  - Full Name: ${USER_INFO.fullName}.
  - Identity: Student, C++ Enthusiast, and Competitive Programmer.
  - Education: Currently an Intermediate student at Govt. Madan Mohan College (2025-Present).
  - Technical Focus: Mastering C++ and Algorithms.
  - Location: Sylhet, Bangladesh.
  - CP Stats: Codeforces Rank: ${USER_INFO.cpStats.codeforces}.
  - Contact: WhatsApp: ${USER_INFO.whatsapp}, Email: ${USER_INFO.email}.
  
  KNOWLEDGE BASE:
  - Navigation Sections: [NAV:home|Home], [NAV:about|About Me], [NAV:projects|Projects], [NAV:skills|Tech Stack], [NAV:gallery|Gallery], [NAV:documents|Documents], [NAV:contact|Contact].
  - Logo Information: The official logo is stored in the [NAV:gallery|Gallery Section] (ID: g-logo).
  - Philosophy: ${USER_INFO.about}
  
  BEHAVIOR RULES:
  1. NAVIGATION: When mentioning a section of the site, YOU MUST use the format [NAV:section_id|Display Name]. 
     Example: "You can find my work in the [NAV:projects|Work Section]."
  2. INTERACTIVITY: Encourage clicking these navigation links to explore the site.
  3. TONE: Intelligent, welcoming, and precise. 
  4. RESPONSIVENESS: Support continuing conversations by referencing previous context.
  5. LOGO QUERY: If someone asks about the "Logo", point them specifically to the [NAV:gallery|Gallery] and mention it's the "Official Identity".
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
        temperature: 0.7, // Increased for better conversational flow
        maxOutputTokens: 250,
      },
    });
    return response.text?.trim() || "INDEX_FAIL: Data stream interrupted.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "SYSTEM_OFFLINE: Re-establish link.";
  }
};