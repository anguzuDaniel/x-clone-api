const express = require('express');

const Post = require('../models/Post');
const mongoose = require('mongoose');

const controller = express.controller


exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
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

exports.updatePost = async(req, res) => {
    try {
        const { id } = req.params;
        const { content, image, author } = req.body;

        if (!id) return res.status(400).json({ message: "Please provide a valid post Id" });

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { content, image, author },
            { new: true, runValidators: true } // Return the updated post and run schema validations
        );

        if (!updatedPost) {
            res.status(404).json({ message: "Post not found." });
        }

        return res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server error" });
    }
}

exports.deletePostById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: "Please provide a valid post Id" });

        await Post.findByIdAndDelete(id);

        return res.status(201).json({ message: "Post delete successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server error" });
    }
};

exports.deleteUserPostsByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: "Please provide a valid post Id" });

        const results = await Post.deleteMany({ author: id });

        if (results.deleteCount === 0) {
            res.status(404).json({ message: "No posts found for the provided user ID." });
        }

        return res.status(200).json({ message: "Posts delete successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server error" });
    }
};