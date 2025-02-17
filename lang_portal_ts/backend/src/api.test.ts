import request from 'supertest';
import app from './app'; // Adjust the import based on your app's entry point

describe('API Endpoints', () => {
  it('GET /api/dashboard/last_study_session', async () => {
    const response = await request(app).get('/api/dashboard/last_study_session');
    expect(response.status).toBe(200);
    // Add more assertions based on expected response structure
  });

  it('GET /api/dashboard/study_progress', async () => {
    const response = await request(app).get('/api/dashboard/study_progress');
    expect(response.status).toBe(200);
    // Add more assertions based on expected response structure
  });

  it('GET /api/dashboard/quick_stats', async () => {
    const response = await request(app).get('/api/dashboard/quick_stats');
    expect(response.status).toBe(200);
    // Add more assertions based on expected response structure
  });

  it('GET /api/study_activities', async () => {
    const response = await request(app).get('/api/study_activities');
    expect(response.status).toBe(200);
    // Add more assertions based on expected response structure
  });

  it('GET /api/study_sessions', async () => {
    const response = await request(app).get('/api/study_sessions');
    expect(response.status).toBe(200);
    // Add more assertions based on expected response structure
  });

  // Add more tests for other endpoints as needed
}); 