const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
