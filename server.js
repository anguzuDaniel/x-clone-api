const express = require('express');
require('dotenv').config();
const passport = require('./passport-config'); // Adjust path if necessary
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const imageRoutes = require('./routes/imageRoutes');

const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session())

// authentication routes
app.use('/api/v1/auth', require('./routes/auth'));

// user routes
app.use('/api/v1/user', userRoutes);

// post routes
app.use('/api/v1/post', postRoutes);

// upload routes
app.use('/api/v1/upload/', imageRoutes);

app.use((req, res, next) => {
    console.log('Middleware hit:', req.method, req.url);
    next();
});


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.timeout = 100000; // 100 seconds