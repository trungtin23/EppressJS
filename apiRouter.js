const express = require('express');
var router = express.Router(); 

router.get('/', (req, res) => {
    res.send('root router');
  });

router.get('/router1', (req, res) => {
  res.send('this is router1');
});

router.get('/router2', (req, res) => {
  res.send('this is router2');
});

module.exports = router;
