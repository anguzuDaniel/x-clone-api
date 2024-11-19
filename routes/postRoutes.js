const express = require('express');

const { getPosts, addPost, deletePostById } = require('../controllers/postController');
const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);
router.delete('/delete/:id', deletePostById);

module.exports = router;