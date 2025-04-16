import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/routes.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Adjust if frontend is on another port
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
