import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  pdfUrl: { type: String },
  questions: [
    {
      questionText: String,
      options: [String],
      correctOption: Number,
    },
  ],
  status: { type: String, enum: ['uploaded', 'generated', 'generated_difficulty'], default: 'uploaded' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Quiz', quizSchema);