const express = require('express');
var router = express.Router(); 
const {addPost,deletePost,updatePost, getPost, findPost} = require('../controller/posts')

router.get('/', getPost);

router.post('/', addPost);

router.get('/:id', findPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

module.exports = router;