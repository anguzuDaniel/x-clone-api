const Image = require("../models/Image");
const mongose = require('mongoose');
const Post = require("../models/Post");

exports.uploadProfileImage = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Please provide a valid user Id." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const { location, key } = req.file;

        const image = new Image({ url: location, key: key, userId: userId });

        await image.save();

        res.status(201).json({
            message: "Profile image uploaded successfully",
            image
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Errror' });
    }
}

exports.uploadPostImage = async (req, res) => {
    console.log('Files received:', req.files); // Should be an array
    console.log('Body received:', req.body);   // Should contain postId and userId

    try {
        const { postId, userId } = req.params;

        if (!mongose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Please provide a valid post Id." });
        }

        if (!mongose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Please provide a valid user Id." });
        }

        console.log(`Upload files: ${JSON.stringify(req.files, null, 2)}`);

        const imagePromises = req.files.map(async (file) => {
            const { location, key } = file;
            const image = new Image({
                url: location,
                key: key,
                userId: userId,
                postId: postId
            });
            await image.save();
            return image._id;
        });

        const imageIds = await Promise.all(imagePromises)

        if (imageIds.length === 0) {
            return res.status(500).json({ message: "Failed to upload images." });
        }

        // Update the Post document to include the image reference
        const post = await Post.findByIdAndUpdate(
            postId,
            { $push: { images: { $each: imageIds } } }, // Append the image ID to the images array
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.status(201).json({
            message: "Post image uploaded successfully",
            post
        });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal Server Errror' });
    }
}