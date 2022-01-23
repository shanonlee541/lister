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
        describe('GET - fetch all items by user and category', () => {
            // Successful GET request to /items?user=1&category=X
            it ('responds with 200 status and JSON content type', () => {
                return request(server)
                    .get('/items?user=3&category=home')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
            })
        })
    })
});