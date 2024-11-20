const express = require('express');

const postController = require('../controllers/postController');
const router = express.Router();

router.get('/', postController.getPosts);
router.post('/', postController.addPost);

router.put('/:id/update', postController.updatePost);
router.put('/:id/comment', postController.addPostCommentById);
router.put('/:postId/update/comment/:commentId', postController.updatePostCommentById);
router.put('/:postId/like/:userId', postController.toggleLikeToPost);

router.delete('/delete/:postId/comment/:commentId', postController.deletePostCommentById);
router.delete('/delete/:id', postController.deletePostById);
router.delete('/delete/user/:id', postController.deleteUserPostsByUserId);

module.exports = router;