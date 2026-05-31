import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from '../server/db.js';
import router from '../server/routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB on request if not already done
let dbInitialized = false;
app.use(async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await initDb();
      dbInitialized = true;
    } catch (err) {
      console.error('Failed to initialize database in Vercel function:', err);
    }
  }
  next();
});

// Routes
app.use('/api', router);

// Default Route
app.get('/', (req, res) => {
  res.send('API Server is running...');
});

export default app;
