import request from 'supertest';
import app from '../src/app';

describe('Tasks API', () => {
  describe('POST /api/tasks', () => {
    it('should create a task with valid input', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Review case file',
          description: 'Review case #12345',
          status: 'pending',
          dueAt: new Date(Date.now() + 86400000).toISOString(),
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Review case file');
      expect(response.body.status).toBe('pending');
    });

    it('should return 400 for missing title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          description: 'Review case #12345',
          status: 'pending',
          dueAt: new Date(Date.now() + 86400000).toISOString(),
        });

      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid status', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Review case file',
          status: 'invalid_status',
          dueAt: new Date(Date.now() + 86400000).toISOString(),
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/tasks', () => {
    it('should retrieve all tasks', async () => {
      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/99999')
        .send({
          status: 'completed',
        });

      expect(response.status).toBe(404);
    });

    it('should return 400 for invalid task ID', async () => {
      const response = await request(app)
        .put('/api/tasks/invalid')
        .send({
          status: 'completed',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should return 404 for non-existent task', async () => {
      const response = await request(app).delete('/api/tasks/99999');

      expect(response.status).toBe(404);
    });

    it('should return 400 for invalid task ID', async () => {
      const response = await request(app).delete('/api/tasks/invalid');

      expect(response.status).toBe(400);
    });
  });
});
