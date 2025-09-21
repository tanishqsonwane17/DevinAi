import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import airRoutes from './routes/ai.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/ai', airRoutes);

app.get('/', (req, res) => {
  res.send('Hello bigmouse');
});

app.get('*name', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

export default app;
