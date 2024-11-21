const express = require('express');
const imageController = require('../controllers/imageController');
const upload = require('../config/aws-s3');
const router = express.Router();

const singleType = upload.single('image');
const multipleType = upload.fields([
    { name: "postImages", maxCount: 10 }
]);

router.post("/image/profile/:userId", singleType, imageController.uploadProfileImage);
router.post("/image/post/:postId/:userId", multipleType, imageController.uploadPostImage);

module.exports = router;