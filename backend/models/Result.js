import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  answers: [
    {
      questionId: String,
      selectedOption: Number,
    },
  ],
  feedback: [
    {
      questionId: String,
      correct: Boolean,
      explanation: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Result', resultSchema);