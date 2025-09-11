import dotenv from 'dotenv';
dotenv.config(); 
import path from 'path'
import express from 'express';
import cors from 'cors';
import cookieParser  from 'cookie-parser'
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import airRoutes from './routes/ai.routes.js';
const app = express();

app.use(cookieParser());

app.use(express.static(path.join('public')));

app.use(cors({
  credentials: true,
  origin: 'https://bixi-devin.onrender.com'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello bigmouse');
});
app.use('/projects', projectRoutes);
app.use('/ai', airRoutes);
app.get('*name', (req, res) => {
  res.sendFile(path.join(__dirname,"..","/public/index.html"));
});
export default app;
