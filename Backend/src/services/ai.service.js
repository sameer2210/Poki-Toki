// const { GoogleGenAI } = require ("@google/genai");

// const ai = new GoogleGenAI(process.env.GOOGLE_GENAI_API_KEY);

// async function genrateResponse(chatHistory) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents:chatHistory
//   });
//   return response.candidates[0].content.parts[0].text // if this line not use you dont get response

// }

// module.exports  = genrateResponse

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
