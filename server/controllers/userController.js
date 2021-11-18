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

// Sign up user (create new user using name, username, password)
userController.createUser = (req, res, next) => {
    const { name, username, password } = req.body;

    // If missing fields 
    if (!name || !username || !password) {
        return next({
            status: 400, 
            message: 'userController.createUser: Name, username, or password was not found.'
        })
    }

    // Check if username already exists in database 
    const checkUsernameQuery = `SELECT * FROM users WHERE username='${username}'`;
    db.query(checkUsernameQuery) 
        .then(data => {
            // data.rows[0] returns an object if user is found. If not found, username is available.
            // Username is taken, throw error
            if (data.rows[0]) {
                return next({
                    status: 400, 
                    message: 'userController.createUser error. Username is taken.'
                })
            }
            
            // Else, username is free. Proceed to create user. 
            else {
                // Find highest current user_id 
                const queryStr = 
                `SELECT user_id FROM users
                ORDER BY user_id DESC
                LIMIT 1;`;

                let newUserId;

                db.query(queryStr)
                    .then(data => {
                        // Increment new user id 
                        newUserId = Number(data.rows[0].user_id) + 1;

                        // Insert user into db
                        const createUserQuery = 
                        `INSERT INTO users (user_id, username, password, firstname) 
                        VALUES ($1, $2, $3, $4)
                        RETURNING user_id;`;
                        const values = [newUserId, username, password, name];
        
                        db.query(createUserQuery, values)
                            .then(data => {
                                // data[0] is { user_id: 4 }
                                // console.log(data.rows[0])
                                res.locals.user_id = data.rows[0];
                                return next();
                            })
                            .catch(err => {
                                return next({
                                    status: 500, 
                                    message: `userController.createUser: Could not insert user into db. ${err}`
                                })
                            })
                    })
                    .catch(err => {
                        return next({
                            status: 500, 
                            message: `userController.createUser: Could not insert user into db. ${err}`
                        })
                    })
            }
        })
        .catch(err => console.log(err))
    
};


module.exports = userController;