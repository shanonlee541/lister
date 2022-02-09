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

// Fetch items from database with user and category from req.query 
itemsController.fetchItems = (req, res, next) => {
    const { user, category, item_id } = req.query;
    if (!user) {
        return next({
            status: 400, 
            message: 'itemsController.fetchItems: Request does not contain user.'
        })
    }

    // Search for user and category
    if (user && category) {
        // query to left join user id and category onto items 
        const queryString = 
        `SELECT items.item_id, users.user_id as user, items.name, items.price, items.description, items.url, items.category
        FROM items
        LEFT JOIN users ON users.user_id = items.user_id
        LEFT JOIN category ON items.category = category.category_name
        WHERE users.user_id = $1 AND category= $2;`

        const values = [user, category];

        // Query db 
        db.query(queryString, values)
            .then(data => {
                // data is an object with rows; need to isolate rows. Gives an array of objects
                res.locals.items = data.rows;
                return next();
            })
            .catch(err => {
                return next({
                    status: 500, 
                    message: `itemsController.fetchItems error: Fail to query db. ${err}`
                })
            })
    }

    // Query db for an item id 
    else if (user && item_id) {
        const queryString = 
        `SELECT * FROM items WHERE item_id = ${item_id};`;
        
        db.query(queryString)
            .then(data => {
                // res.locals.items contains an object
                res.locals.items = data.rows[0];
                return next();
            })
            .catch(err => {
                return next({
                    status: 500, 
                    message: `itemsController.fetchItems (user & item_id) error: ${err}`
                })
            })
    }
}

// Update item in DB based on item_id 
itemsController.updateItem = (req, res, next) => {
    const { item_id } = req.query;
    const { newName, newPrice, newDescription, newUrl, newCategory } = req.body;


    if (!item_id) {
        return next({
            status: 400, 
            message: 'itemsController.updateItem Error: Item ID not found. Failed to update.'
        })
    }

    // Perform UPDATE on items table
    const queryString = 
    `UPDATE items
    SET price = '${newPrice}', description='${newDescription}', name='${newName}', 
    url='${newUrl}', category='${newCategory}'
    WHERE item_id = ${item_id}
    RETURNING *;`;

    db.query(queryString) 
        .then(data => {
            return next();
        })
        .catch(err => {
            return next({
                status: 500, 
                message: `itemsController.updateItem: Could not update item in database. ${err}`
            })
        })
};

// DELETE request to /items?item_id=5
itemsController.deleteItem = (req, res, next) => {
    const { item_id } = req.query;
    // If delete id not found
    if (!item_id) {
        return next({
            status: 400, 
            message: `itemsController.deleteItem: Could not delete item. Item ID not found in request.`
        })
    }

    const queryString = 
    `DELETE FROM items
    WHERE item_id = '${item_id}';`

    // Delete from db
    db.query(queryString)
        .then(data => {
            return next();
        })
        .catch(err => `Err ${err}`);
    
}


module.exports = itemsController;