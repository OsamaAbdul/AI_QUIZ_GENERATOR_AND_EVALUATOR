import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';
import dotenv from 'dotenv';
import { Methods } from 'openai/resources/fine-tuning/methods.mjs';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow specific origins
const allowedOrigins = [
  'https://ai-quiz-app.netlify.app',
  'https://ai-quiz-generator-and-evaluator-t26o.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // If your API requires credentials (e.g., cookies)
}));

// Middleware
app.use(cors(corsOptions)); //configure cors options
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files like uploaded PDFs
app.use(express.static('public'));

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// Routes
app.use('/api/user', routes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
