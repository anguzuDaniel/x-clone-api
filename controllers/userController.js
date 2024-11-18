const { User } = require('../models/User');

exports.getUsers = async (res, req) => {
    try {
        const { _id, name, email } = req.query;

        const filter = {};
        if (_id) filter._id = _id;
        if (name) filter.name = new RegExp(name, 'i');
        if (email) filter.email = email;

        const users = await User.find(filter, '-password');

        res.status(200).json(users);
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message || 'Internal Server Error' || 'Internal Server Error' })
        }
    }
};

exports.getUserById = async (res, req) => {
    try {
        const { _id} = req.query;

        if (!_id) return res.status(400).json({ message: 'User ID is required' }); 

        const user = await User.findOne({ _id});

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
};