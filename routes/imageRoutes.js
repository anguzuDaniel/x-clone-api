const express = require('express');
const imageController = require('../controllers/imageController');
const upload = require('../config/aws-s3');
const router = express.Router();
const multer = require('multer');

router.post("/image/profile/:userId", upload.single('image'), imageController.uploadProfileImage);
router.post("/image/post/:postId/:userId", upload.array('postImages', 5), imageController.uploadPostImage);

router.use((err, req, res, next) => {
    console.error(err); // Log the error to the console
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'File size exceeds the 1.5MB limit.',
            });
        }

        // Handle other multer errors (unexpected file, file count, etc.)
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                message: 'Unexpected field encountered in the file upload.',
            });
        }

        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                message: `Too many files uploaded. Max allowed: ${err.limit}`, // Show limit from error
            });
        }

        return res.status(400).json({
            message: `Multer error: ${err.message}`,
        });
    }

    // Handle generic validation errors (e.g., if using a validation library like Joi or express-validator)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: `Validation error: ${err.message}`,
            details: err.errors, // Provide validation details if needed
        });
    }

    // Handle other application-specific errors
    if (err.name === 'CustomError') {
        return res.status(err.status || 500).json({
            message: err.message,
        });
    }

    // Handle general errors
    if (err) {
        console.error('Unexpected error:', err); // Log the error for debugging
        return res.status(500).json({
            message: `Server error: ${err.message}`,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Optional stack trace in development
        });
    }

    next();
});

module.exports = router;