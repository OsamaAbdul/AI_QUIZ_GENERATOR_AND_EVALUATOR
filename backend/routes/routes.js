import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { register, login } from '../controllers/UserController.js';

dotenv.config();

const router = express.Router();

// Routes for login and register
router.post('/login', login);
router.post('/register', register);

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Quiz Route
router.post('/pdf-to-mcq', async (req, res) => {
  try {
    const { text } = req.body; // Extracted text from the frontend

    // Validate input
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate the prompt for Gemini
    const prompt = `
      Based on the content below, generate up to 30 multiple-choice questions in the following JSON format:
      [
        {
          "question": "Sample Question?",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "A",
          "explanation": "State that 'Option A' is the correct answer and explain why it is correct, directly referencing the relevant part of the content. "
        },
        ...
      ]
      Ensure the output is valid JSON. If the content is insufficient, generate as many questions as possible.
      Content:
      ${text}
    `;

    // Send the request to Gemini
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Parse the response as JSON
    let quizJSON;
    try {
      // Gemini may wrap JSON in markdown code blocks (```json ... ```), so clean it
      const cleanedResponse = responseText.replace(/```json\n|```/g, '').trim();
      quizJSON = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error('Failed to parse JSON response:', error, 'Response:', responseText);
      return res.status(500).json({ success: false, message: 'Failed to parse quiz response' });
    }

    // Validate the parsed JSON
    if (!Array.isArray(quizJSON)) {
      return res.status(500).json({ success: false, message: 'Quiz response is not an array' });
    }

    // Send the generated quiz as JSON response
    res.json({ success: true, quiz: quizJSON });
  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ success: false, message: 'Failed to generate quiz' });
  }
});

export default router;