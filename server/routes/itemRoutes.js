const express = require('express');
const itemsController = require('../controllers/itemsController.js');

const router = express.Router();

router.post('/', itemsController.addItem, (req, res) => {
    console.log(req.query.user);
    console.log(req.body);
    console.log('Redirected through items router!')
    res.status(200).send('items');
});

// Export whole router
module.exports = router;