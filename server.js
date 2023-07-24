require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();
const connectDB = require('./config/database');
// Routes
const v1Routes = require('./app/routes/v1');

// Connect to the MongoDB database
connectDB();

const NO_AUTH_ROUTES = [
    { path: '/api/v1/users/login', method: 'post' },
    { path: '/api/v1/users/logout', method: 'get' },
    { path: '/api/v1/users', method: 'post' },
];

// Middlewares

app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use(express.json());

app.use((req, res, next) => {
    // Skip validation for some resolvers resolver
    const isNotAuthRoute = NO_AUTH_ROUTES.find((r) => r.path === req.path && r.method === req.method.toLowerCase());
    if (isNotAuthRoute) {
        return next();
    }

    // Get the access_token from the request cookies or headers
    const accessToken = req.cookies.access_token ?? req.headers['x-access-token'];

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    try {
        // Verify the access token using your secret key
        const decoded = jwt.verify(accessToken, process.env.JWT_PASS);
        /*
        if (decoded.exp < new Date()) {
            throw new Error('Token expired');
        }
        */
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid access token' });
    }
});

// Mount the routes
app.use('/api/v1', v1Routes);



// Error handling middleware
app.use((err, _, res) => {
    console.error(err.stack);

    // Check if the error is a Mongoose validation error
    if (err.name === 'ValidationError') {
        // Extract the validation error messages from the error object
        const validationErrors = Object.values(err.errors).map((error) => error.message);
        return res.status(400).json({ message: 'Validation Error', errors: validationErrors });
    }

    // Check if the error is a Mongoose CastError (e.g., invalid ObjectId)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid ID provided' });
    }

    // For other types of errors, provide a generic error message
    return res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

module.exports = app;