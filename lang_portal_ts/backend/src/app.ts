import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboard';
import wordsRoutes from './routes/words';
import groupsRoutes from './routes/groups';
import studyActivitiesRoutes from './routes/studyActivities';
import studySessionsRoutes from './routes/studySessions';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/words', wordsRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/study-activities', studyActivitiesRoutes);
app.use('/api/study-sessions', studySessionsRoutes);

// Basic health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app; 