import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Get professional product description from Gemini
export async function getProductDescription(productName: string, category: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling, professional e-commerce product description for a ${productName} in the ${category} category. 
          Focus on high-end quality, unique benefits, and customer satisfaction. Keep the tone sophisticated and the length under 80 words.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
}

// Get smart product recommendations based on cart contents
export async function getSmartRecommendations(cartItems: string[]): Promise<string[]> {
  if (cartItems.length === 0) return [];
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on a shopping cart containing these items: ${cartItems.join(', ')}, suggest 3 related or complementary product categories or specific items that an e-commerce customer might like. Return only a plain list separated by commas.`,
    });
    const text = response.text || "";
    return text.split(',').map(s => s.trim()).filter(s => s.length > 0);
  } catch (error) {
    return [];
  }
}