const express = require('express');
const path = require('path');

const app = express();

// If in production mode, serve static build folder
if (process.env.NODE_ENV === 'production') {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    app.get('/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../index.html'));
    })
}

// If development mode
else {
    // app.get('/api', (req, res) => {
    //     res.send('API ROUTE REACHED THROUGH SERVER JS')
    // });
}

app.listen(3000, () => console.log(`Listening on port 3000 in ${process.env.NODE_ENV} mode...`))