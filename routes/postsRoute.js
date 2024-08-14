const express = require('express');
var router = express.Router(); 
const {addPost,deletePost,updatePost} = require('../controller/posts')

router.post('/', addPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

module.exports = router;