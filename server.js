const express = require('express');
require('dotenv').config();
const passport = require('./passport-config'); // Adjust path if necessary
const session = require('express-session');
const userRoutes = require('./routes/users');
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

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));