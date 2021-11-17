const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const itemRoutes = require('./routes/itemRoutes.js');

const app = express();

// urlEncoding for queryStrings
// app.use(bodyParser.urlencoded({ extended: false }));
// For POST requests, you need to recognize and convert incoming data as json data! 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// If in production mode, serve static build folder
if (process.env.NODE_ENV === 'production') {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    app.use('/items', itemRoutes);

    // Global Error Handler 
    app.use((err, req, res, next) => {
        const defaultError = {
            status: 500, 
            message: 'Default Express Error from server... Something went wrong.'
        }
        // Replace defaultError with custom error if passed in 
        const customError = Object.assign({}, defaultError, err);
        return res
            .status(customError.status)
            .send(customError.messsage);
    })

    // Serve template
    app.use('*', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../index.html'));
    })
}

// If development mode
else {
    // Redirect requests to /items to itemRoutes
    // I think I need to move these routes to the production if block as well, or else 
    // server can't handle the requests
    app.use('/items', itemRoutes);

    // Global Error Handler 
    app.use((err, req, res, next) => {
        const defaultError = {
            status: 500, 
            message: 'Default Express Error from server... Something went wrong.'
        }
        // Replace defaultError with custom error if passed in 
        const customError = Object.assign({}, defaultError, err);
        console.log(customError.message);
        return res
            .status(customError.status)
            .send(customError.messsage);
    })

}

app.listen(3000, () => console.log(`Listening on port 3000 in ${process.env.NODE_ENV} mode...`))