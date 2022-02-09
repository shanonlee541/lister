// Testing API endpoints using supertest 
const request = require('supertest');
const server = 'http://localhost:3000';
const db = require('../server/models/categoriesModel.js');

describe('Route integration', () => {
    // Testing routes to /items
    describe('/items', () => {

        // Before All, remove user with user_id if exists 
        beforeAll((done) => {
            const queryString = `SELECT * FROM users WHERE user_id=3`;
            db.query(queryString)
                .then(data => {
                    // If user with user_id 3 exists, delete user 
                    if (data.rows.length) {
                        const deleteQuery = `DELETE FROM users WHERE user_id=3`;
                        db.query(deleteQuery)
                            .then(() => { 
                                // Return OK signal 
                                return 0;
                            })
                            .err(() => {
                                // Return failure signal: failed to delete 
                                return 1;
                            })
                    }
                })

                .catch(err => {
                    console.log(err);
                })

                done();
            
        })

        // After all, close the connection to the pool 
        afterAll(() => {
            db.end();
        })

        // Testing GET request to /items (fetch all items by user and category)
        describe('GET /items - fetch all items by user and category', () => {
            // Successful GET request to /items?user=1&category=X
            it ('responds with 200 status and JSON content type on success', () => {
                return request(server)
                    .get('/items?user=3&category=home')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
            })
        })

        // Testing POSt to /items (add a new item entry)
        describe('POST /items - add new item entry to DB', () => {
            // Successful POST request 
            it ('responds with 200 status, JSON content type, and newly added item on success', () => {
                return request(server)
                    .post('/items?user=1')
                    .send({ 
                        name: "Test Item", 
                        price: 50, 
                        description: "Test Item Description", 
                        url: "www.myTestURL.com", 
                        category: "home"
                    })
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
            })
        })
    })
});