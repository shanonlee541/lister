const db = require('../models/categoriesModel.js');

const itemsController = {};

// Add item to items database 
// Request URL is /items/?user=1
itemsController.addItem = (req, res, next) => {
    // Check all fields are present 
    const { name, price, description, url, category } = req.body;

    if (!name || !price || !description || !url || !category) {
        return next({
            status: 400, 
            message: 'itemsController.addItem: All fields are required. Failed to add item.'
        });
    }
}


module.exports = itemsController;