const express = require('express');
const itemsController = require('../controllers/itemsController.js');

const router = express.Router();

// Route: POST /items?user=1
router.post('/', itemsController.addItem, (req, res) => {
    res
        .status(200)
        .json(res.locals.addedItem);
});

// Export whole router
module.exports = router;