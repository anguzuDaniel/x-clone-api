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

exports.addPostCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const { user, comment } = req.body;

        if (!id) return res.status(400).json({ message: "Please provide a valid post Id" });

        if (!user || !comment) {
            return res.status(400).json({ message: "User and comment are required" });
        }

        const results = await Post.findByIdAndUpdate(
            id, 
            { 
                $push: { comments: { user, comment, date: new Date() } }
            },
            { new: true, runValidators: true }
        );

        if (!results) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ 
            message: "Comment added.",
            comment: results
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server error" });
    }
};

exports.deletePostCommentById = async (req, res) => {
    try {
        const { postId, commentId } = req.params;

        if (!postId) {
            res.status(404).json({ message: "Please provde a valid post id" });
        }

        if (!commentId) {
            res.status(404).json({ message: "Please provde a valid comment id" });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const commenIndex = post.comments.findIndex(
            (comment) =>  comment._id.toString() == commentId
        );

        if (commenIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        post.comments.splice(commenIndex, 1);

        await post.save();

        res.status(200).json({ message: "Comment delete successfully", post });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server error" });
    }
}

exports.updatePostCommentById = async (req, res) => {
    try {
        const { postId, commentId } = req.params;

        const { comment } = req.body;

        if (!postId) {
            res.status(400).json({ message: "Please provide a valid post id." });
        }

        if (!commentId) {
            res.status(400).json({ message: "Please provide a valid comment id." });
        }

        if (!comment) {
            return res.status(404).json({ message: "Comment is required." });
        }

        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId, "comments._id": commentId },
            { $set: { "comments.$.comment": comment }},
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post or Comment not found" });
        }

        res.status(200).json({ 
            message: "Comment updated successfully",  
            updatedComment: { comment, date: new Date() },
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server error" });
    }
}

exports.toggleLikeToPost = async (req, res) => {
    try {
        const { postId, userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({ message: "Invalid post ID provided." });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: "Invalid user ID provided." });
        }        

        const post = await Post.findById(postId);

        if (!post) {
            res.status(400).json({ message: "Post not found." });
        }

        const userIndex = post.likes.indexOf(userId);

        if (userIndex !== -1) {
            post.likes.splice(userIndex, 1);
            await post.save();
            return res.status(200).json({
                message: "Like removed successfully.",
                post: {
                    _id: post._id,
                    likes: post.likes.length,
                    content: post.content,
                    author: post.author,
                },
            });
        } else {
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({
                message: "Like added successfully.",
                post: {
                    _id: post._id,
                    likes: post.likes.length,
                    content: post.content,
                    author: post.author,
                },
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server error" });
    }
}