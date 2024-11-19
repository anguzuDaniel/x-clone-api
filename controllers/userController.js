const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: 'User ID is required' }); 

        const user = await User.findById(id).exec();

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};