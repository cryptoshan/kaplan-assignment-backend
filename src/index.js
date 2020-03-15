const express = require('express');
const path = require('path');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// const { env, server } = require('./config');
const { env, server } = { env: 'development', server: { port: 3000 } };

const production = env === 'production';

// Initialize express app
const app = express();

// Initialize middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// API Routes
// require('./routes')(app);

// Route only for API documentation (disabled in production)
if (!production) {
    app.use('/docs', express.static(path.join(__dirname, './swagger/')));
    app.use(errorHandler());
}

// Add app routes
app.use(require('./routes'));

/// error handlers
/// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, _req, res, next) => {
    if (typeof err === 'object') {
        // Ensure that err.message is enumerable (It is not by default)
        Object.defineProperty(err, 'message', { enumerable: true });
    } else {
        err = { message: String(err) };
    }

    if (!production) console.error(err.stack);

    const message = err.message;
    const error = production ? {} : err;

    res.status(err.status || 500).json({
        message,
        error
    });
});

app.listen(server.port, () => {
    console.log(`App is listening on port ${server.port}`);
});
