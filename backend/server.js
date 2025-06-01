import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';
import dotenv from 'dotenv';
import job from './config/cron.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// only if in production mode
if(process.env.NODE_ENV ==="production") job.start();

// ✅ Define allowed origins without trailing slashes
const allowedOrigins = [
  'https://ai-quiz-app.netlify.app',
  'https://ai-quiz-generator-and-evaluator-t26o.vercel.app',
];

// ✅ Define corsOptions
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// ✅ Apply CORS once with the correct options
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public')); // Serve static files like uploaded PDFs

// ✅ DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// ✅ Routes
app.use('/api/user', routes);

// Route to check server

app.get('/server-check', (req, res) => {
    res.status(200).json({ message: "Server up and running.........."})
})

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
