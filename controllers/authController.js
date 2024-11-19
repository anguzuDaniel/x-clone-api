const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All feilds are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword 
        });

        await newUser.save();

        res.status(201).json({
            message: 'User register successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            res.status(401).json({ messsage: "Incorrect credentails" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            meassage: 'Login successful', 
            token,
            user: {
                id: user._id,
                email: user.email,
                user: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logoutUser = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout Failed', error: err.message });
        }

        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: err.message })

            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successfull' });
        });
    });
};