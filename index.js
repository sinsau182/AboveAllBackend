const express = require('express');
const cors = require('cors');
const db = require('./config/database.js');
const cookieParser = require('cookie-parser');
const ApiRoutes = require('./routes/index.js');
const constans = require('./config/constants.js');
const middlewaresConfig = require('./config/middleware.js');

const app = express();

middlewaresConfig(app);
app.use('/api', ApiRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
    });

const server = () => {
    db()
    app.listen(constans.PORT, () => {
        console.log(`listening to port: ${constans.PORT}`);
    })
}

server()