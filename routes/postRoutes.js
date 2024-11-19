const express = require('express');

const postController = require('../controllers/postController');
const router = express.Router();

router.get('/', postController.getPosts);
router.post('/', postController.addPost);
router.put('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePostById);
router.delete('/delete/user/:id', postController.deleteUserPostsByUserId);

module.exports = router;