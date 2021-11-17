const db = require('../models/categoriesModel.js');

const itemsController = {};

// Add item to items database 
// Request URL is /items/?user=1
itemsController.addItem = (req, res, next) => {
    // Check all fields are present 
    const { name, price, description, url, category } = req.body;
    const user_id = req.query.user;

    if (!name || !price || !description || !url || !category) {
        return next({
            status: 400, 
            message: 'itemsController.addItem: All fields are required. Failed to add item.'
        });
    }

    // If has all fields, add row into database 
    const queryString = 
    `INSERT INTO items (name, price, description, url, user_id, category)
    VALUES ($1, $2, $3, $4, $5, $6);`

    const values = [name, price, description, url, user_id, category];

    // Insert into DB 
    db.query(queryString, values)
        .then(data => {
            res.locals.addedItem = data;
            return next();
        })
        .catch(err => {
            return next({
                status: 400,
                message: `itemsController.addItem Error: Could not query database. ${err}`
            })
        });
}


module.exports = itemsController;