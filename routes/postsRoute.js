const express = require('express');
const logger = require('../helper/LoggerHelper')
var router = express.Router(); 
const {addPost,deletePost,updatePost, getPost, findPost} = require('../controller/posts')

router.use(logger)

router.get('/', getPost);

router.post('/', addPost);

router.get('/:id', findPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

module.exports = router;