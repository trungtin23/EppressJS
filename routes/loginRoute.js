const express = require('express');
const logger = require('../helper/LoggerHelper')
const { login } = require('../controller/users') ;  
const { route } = require('./usersRoute');
const path = require('path')

var router = express.Router(); 

router.use(logger);

router.post('/',login );


module.exports = router;