import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { register, login } from '../controllers/UserController.js';

dotenv.config();

const router = express.Router();

// Auth routes
router.post('/login', login);
router.post('/register', register);

// Fireworks AI client
const openai = new OpenAI({
  baseURL: 'https://models.aixplain.com/api/v1/',
  apiKey: process.env.FIREWORKS_API_KEY,
});

// PDF-to-MCQ route
router.post('/pdf-to-mcq', async (req, res) => {
  try {
    const { text, quizCount, userPrompt } = req.body;
   
    

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Valid text content is required' });
    }

    const prompt = `
            You are an expert educational content generator.

            Using this ${userPrompt} to Generate up to ${quizCount} multiple-choice questions (MCQs) based on the input text below. Output only a **valid JSON array**, no markdown or commentary.

            Each MCQ must follow this format:
            {
              "question": "...",
              "options": ["A: ...", "B: ...", "C: ...", "D: ..."],
              "correctAnswer": "A",
              "correctAnswerText": "...",
              "explanation": "..."
            }

            Rules:
            1. The correctAnswer must be the letter ("A", "B", "C", or "D") that matches the correct option label.
            2. The correctAnswerText must be the text portion **after the label** of the correct option.
            3. Explanations must justify the correct answer and debunk the incorrect ones.
            4. All questions must be self-contained, unambiguous, and derived from the content.

            Input Text:
${text.trim()}
`;

    const messages = [
      {
        role: 'system',
        content: 'You are an MCQ generator that returns clean, accurate JSON with matching answer labels and values.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    let responseText;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const completion = await openai.chat.completions.create({
          model: '671932146eb5638ce20300a1',
          messages,
          temperature: 0.5,
          max_tokens: 8192,
        });

        responseText = completion.choices[0].message.content;
        break;
      } catch (error) {
        if (attempt === 3) {
          console.error('OpenAI failed after 3 attempts:', error);
          return res.status(500).json({ success: false, message: 'Failed to generate quiz' });
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    let quizJSON;
    try {
      const cleanedResponse = responseText
        .replace(/```(?:json)?\n?([\s\S]*?)\n?```/g, '$1')
        .replace(/^[^\[{]*?([\[{].*[\]}])[^}\]]*?$/s, '$1')
        .trim();

      quizJSON = JSON.parse(cleanedResponse);
    } catch (error) {
      console.error('Failed to parse quiz JSON:', error, '\nPartial response:', responseText.slice(0, 500));
      return res.status(500).json({ success: false, message: 'Invalid quiz response format' });
    }

    // Validate and enrich
    const validOptions = ['A', 'B', 'C', 'D'];
    quizJSON = Array.isArray(quizJSON)
      ? quizJSON
          .filter((q, i) => {
            const isValid =
              q &&
              typeof q.question === 'string' &&
              q.question.trim() &&
              Array.isArray(q.options) &&
              q.options.length === 4 &&
              q.options.every(opt => typeof opt === 'string' && /^[ABCD]:\s/.test(opt)) &&
              typeof q.correctAnswer === 'string' &&
              validOptions.includes(q.correctAnswer) &&
              typeof q.explanation === 'string' &&
              q.explanation.trim();

            const correctOption = q.options.find(opt => opt.startsWith(`${q.correctAnswer}:`));
            if (!correctOption) {
              console.warn(`Mismatch at index ${i}: No matching correct option for letter ${q.correctAnswer}`);
              return false;
            }

            // Add correctAnswerText field
            q.correctAnswerText = correctOption.split(':').slice(1).join(':').trim();
            return isValid;
          })
      : [];

    if (quizJSON.length === 0) {
      return res.status(500).json({ success: false, message: 'No valid questions generated' });
    }

    return res.json({ success: true, quiz: quizJSON });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
