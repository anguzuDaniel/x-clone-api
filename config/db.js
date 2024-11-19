const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI.replace(
            '<password>',
            process.env.MONGO_PASSWORD
        );

        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error:, ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;