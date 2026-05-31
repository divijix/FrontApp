import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db.js';
import router from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Default Route
app.get('/', (req, res) => {
  res.send('API Server is running...');
});

// Start Database and Server
const startServer = async () => {
  try {
    // Initialize database
    await initDb();
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
