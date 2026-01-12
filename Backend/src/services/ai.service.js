console.log('AI SERVICE LOADED AT:', __filename);
console.log('MODEL USED:', 'gemini-2.5-flash');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const ai = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

async function genrateResponse(chatHistory) {
  const model = ai.getGenerativeModel({
    model: 'gemini-2.5-flash',
  });

  const response = await model.generateContent({
    contents: chatHistory, // ← FIXED
  });

  return response.response.text();
}

module.exports = genrateResponse;
