const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// POST request to /user/login 
router.post('/login', userController.loginUser, (req, res) => {
    // Send back user_id to frontend
    return res
        .set('Content-Type', 'application/json')
        .status(200)
        .json({ user_id: res.locals.user_id })
})

module.exports = router;