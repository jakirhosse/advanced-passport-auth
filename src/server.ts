import express, { Application } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { connectDB } from './config/database';
import './config/passport';

dotenv.config();
connectDB();

const app: Application = express();
app.use(express.json());
app.use(passport.initialize());

// Routes (to be implemented)
app.use('/api/auth', require('./routes/authRoutes'));
// Add other routes as needed

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
