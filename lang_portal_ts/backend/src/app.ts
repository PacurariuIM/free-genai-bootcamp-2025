import express from 'express';
import { sequelize } from './config/database';

const app = express();

app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app; 