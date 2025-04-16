import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Configuration constants
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = {
  REGISTER: '1d',
  LOGIN: '2h'
};

// Input validation
const validateInput = (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  // Check email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email format');
  }
  // Check password length
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
};

// Generate JWT token
const generateToken = (userId, expiry) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: expiry });
};

// Register User
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate inputs
    validateInput(email, password);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await User.create({ email, password: hashedPassword });
    
    // Generate token
    const token = generateToken(user._id, TOKEN_EXPIRY.REGISTER);
    
    // Send response
    return res.status(201).json({ 
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    // Handle error
    const status = error.message.includes('already registered') ? 400 : 500;
    return res.status(status).json({ error: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate inputs
    validateInput(email, password);

    // Find user and select password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id, TOKEN_EXPIRY.LOGIN);
    
    // Send response
    return res.status(200).json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    // Log and handle errors
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
