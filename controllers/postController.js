const Post = require('../models/Post');
const mongoose = require('mongoose');

exports.getPosts = async (req, res) => {
    try {
        const posts = Post.find({});
        res.status(400).json({ posts })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addPost = async (req, res) => {
    try {
        const { content, image, author } = req.body;

        if (!content || !author) {
            return res.status(400).json({ message: "content and author can not be left empty." });
        }

        // Check if the author is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(author)) {
            return res.status(400).json({ message: "Invalid author ID." });
        }

        const post = Post.create({ content, image, author });

        (await post).save();

        return res.status(201).json({ message: "Post added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server error" });
    }
};