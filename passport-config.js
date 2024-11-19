const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('./models/User');

const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const db = require('./config/db');

passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
        console.log(`Attempting to find user: ${username}`);
        const user = await User.findOne({ username: username });
        if (!user) {
            console.log('User not found');
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        if (!user.salt) {
            console.log('Salt not found for the user');
            return done(null, false, { message: 'Salt not found for the user.' });
        }

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return done(err); }
            if (!crypto.timingSafeEqual(Buffer.from(user.hashedPassword), Buffer.from(hashedPassword))) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        return done(error);
    }
}));

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

module.exports = passport;