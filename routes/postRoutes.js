const express = require('express');

const postController = require('../controllers/postController');
const router = express.Router();

router.get('/', postController.getPosts);
router.post('/', postController.addPost);

router.put('/update/:id', postController.updatePost);
router.put('/comment/:id', postController.addPostCommentById);
router.put('/update/:postId/comment/:commentId', postController.updatePostCommentById);

router.delete('/delete/:postId/comment/:commentId', postController.deletePostCommentById);
router.delete('/delete/:id', postController.deletePostById);
router.delete('/delete/user/:id', postController.deleteUserPostsByUserId);

module.exports = router;