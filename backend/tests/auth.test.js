const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    // Disconnect if already connected (e.g. from server.js)
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Auth API Endpoints', () => {
    test('POST /api/auth/login should fail for non-existent user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'nonexistent@example.com',
                password: 'wrongpassword'
            });

        expect(res.statusCode).not.toBe(200);
    });

    test('POST /api/auth/register should fail for invalid data', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'invalid-email',
                password: '123'
            });

        expect(res.statusCode).toBe(400);
    });
});
