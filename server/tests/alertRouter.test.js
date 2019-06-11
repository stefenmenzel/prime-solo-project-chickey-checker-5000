const app = require('../server.js');
let testServer = require('supertest');
require('dotenv').config();

describe("Testing the alert router path", () => {
    test('alertRouter should reject an unauthenticated user', async () => {
        const response = await testServer(app).get('/api/alerts');
        expect(response.statusCode).toBe(403);
    })

    test('alertRouter should be able to add an alert if user is logged in', async() => {
        let agent = testServer.agent(app);
        const postResponse = await agent
                                .post('/api/user/login')
                                .send({username: 'stuff', password:process.env.TEST_USER_PASS})
        expect(postResponse.statusCode).toBe(200);

        const makeAlertResponse = await agent.post('/api/alerts/add')
                                            .send({
                                                sensor: 1,
                                                condition: '<',
                                                value: '33',
                                                email: true,
                                                phone: true,
                                                user: 17
                                            })
        expect(makeAlertResponse.statusCode).toBe(201);
    })
})