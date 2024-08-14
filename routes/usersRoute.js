const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getUser, addUser,deleteUser,findUser,updateUser } = require('../controller/users') ;  

var router = express.Router(); 

router.get('/',getUser );

router.post('/',addUser );

router.get('/:id',findUser);

router.delete('/:id',deleteUser);

router.patch('/:id',updateUser);

module.exports = router;