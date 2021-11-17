const express = require('express');
const itemsController = require('../controllers/itemsController.js');

const router = express.Router();

// GET request to /items?user=1&category=X
router.get('/', itemsController.fetchItems, (req, res) => {
    return res
        .set('Content-Type', 'application/json')
        .status(200)
        .json({ items: res.locals.items })
})

// POST requests to /items?user=1
router.post('/', itemsController.addItem, (req, res) => {
    res
        .status(200)
        .json(res.locals.addedItem);
});

// PATCH requests to /items?item_id=X
router.patch('/', itemsController.updateItem, (req, res) => {
    res
        .status(202)
        .send('Successful Update From Backend')
})

// Export whole router
module.exports = router;