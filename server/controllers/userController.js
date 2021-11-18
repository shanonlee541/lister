const db = require('../models/categoriesModel')

const userController = {};

// user login. Verify username exists and that password is a match
userController.loginUser = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next({
            status: 400, 
            message: `userController.loginUser error. No username or password provided.`
        })
    }

    // Query db for username, then check if that username matches 
    const usernameQuery = 
    `SELECT * FROM users 
    WHERE users.username = '${username}';`

    db.query(usernameQuery)
        .then(data => {
            const user = data.rows[0];
            // If username not found in db
            if (!user) {
                return next({
                    status: 400, 
                    message: 'userController.loginUser: user was not found.'
                })
            }

            // Username exists => check password
            else {
                // Password does not match
                if (user.password !== password) {
                    return next({
                        status: 400, 
                        message: 'userController.loginUser: password does not match.'
                    })
                }

                // Password does match, then authorize user 
                else {
                    res.locals.user_id = user.user_id;
                    return next();
                }
            }
        })
        .catch(err => {
            return next({
                status: 500, 
                message: 'userController.loginUser error: could not query database.'
            })
        });
    
}

module.exports = userController;