const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    content: { type: String, required: true },
    image: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        },
    ],
}, { Timestamps: true });

module.exports = mongoose.model('Post', PostSchema);