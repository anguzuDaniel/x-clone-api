const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    image: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        },
    ],
}, { Timestamps: true });

module.exports = mongoose.model('Post', PostSchema);