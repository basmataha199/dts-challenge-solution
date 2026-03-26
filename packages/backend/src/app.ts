import express from 'express';
import tasksRouter from './routes/tasks';

const app = express();

app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
