// Testing API endpoints using supertest 
const request = require('supertest');
const server = 'http://localhost:3000';
const db = require('../server/models/categoriesModel.js');

describe('Route integration', () => {
    // Testing routes to /items
    describe('/items', () => {

        // Before All, create test user  
        beforeAll((done) => {
            const queryString = `INSERT INTO users (user_id, username, password, firstname) VALUES ($1, $2 ,$3, $4)`;
            const values = [880783, 'testUser', 'testUser', 'testUser'];

            db.query(queryString, values)
                .then(data => {
                    console.log(data.rows)
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
                    .get('/items?user=880783&category=home')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
            })
        })

        // Testing POST to /items (add a new item entry)
        describe('POST /items - add new item entry to DB', () => {
            // Clear out any additions to db in each test 
            afterEach(() => {
                const queryString = `DELETE FROM items
                WHERE name = '79db5bbfb39a4a62820a02618ac02e88';`
                db.query(queryString)
            })

            // Successful POST request 
            it ('responds with 200 status, JSON content type, and newly added item on success', () => {
                return request(server)
                    .post('/items?user=880783')
                    .send({ 
                        name: "79db5bbfb39a4a62820a02618ac02e88", 
                        price: "50", 
                        description: "Test Item Description", 
                        url: "www.myTestURL.com", 
                        category: "home"
                    })
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
            })

            // Unsuccessful POST request - No name provided 
            it ('responds with 400 status when item name is not provided', () => {
                return request(server)
                    .post('/items?user=880783')
                    .send({
                        price: "50", 
                        description: "Test Item Description", 
                        url: "www.myTestURL.com", 
                        category: "home"
                    })
                    .expect(400)
            })
        })
    })
});