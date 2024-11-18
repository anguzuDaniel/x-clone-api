const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI.replace(
            '<password>',
            process.env.MONGO_PASSWORD
        );

        await mongoose.connect(MONGO_URI);

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;