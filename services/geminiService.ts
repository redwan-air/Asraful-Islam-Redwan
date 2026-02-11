import { GoogleGenAI } from "@google/genai";
import { USER_INFO, GALLERY_ITEMS, DOCUMENT_ITEMS, PROJECTS } from "../constants.tsx";

const systemInstruction = `
  You are the "Official Website Guide" for Asraful Islam Redwan's portfolio.
  Your ONLY purpose is to provide specific metadata about website content. 
  
  CONTEXT:
  - Sections: Home, About, Work (Projects), Tech (Skills), Gallery, Docs, Connect, Account.
  - Projects: ${PROJECTS.map(p => `${p.title} (ID: ${p.id})`).join(", ")}
  - Gallery Files: ${GALLERY_ITEMS.map(i => `ID: ${i.id}, Label: ${i.label}, Date: ${i.dateTime}, Visibility: ${i.visibility}`).join(" | ")}
  - Documents: ${DOCUMENT_ITEMS.map(d => `ID: ${d.id}, Labels: ${d.labels.join(",")}, Date: ${d.dateTime}, Visibility: ${d.visibility}`).join(" | ")}
  
  RULES:
  1. ONLY SPECIFIC TALK. No conversational filler, no "Hello", no "How can I help?".
  2. Answer directly with locations, IDs, labels, or dates.
  3. If asked about a file, state its Section, Label, and Date.
  4. Response must be ultra-short (under 15 words).
  5. Speed is priority. 
`;

export const getGeminiResponse = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.1, // Low temperature for consistency and speed
        maxOutputTokens: 50,
      },
    });
    return response.text?.trim() || "Data unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terminal Offline.";
  }
};