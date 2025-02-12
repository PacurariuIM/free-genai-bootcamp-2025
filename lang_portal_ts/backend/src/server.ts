import app from './app';
import { initDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer(); 