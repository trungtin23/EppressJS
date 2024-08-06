const express = require('express');
const app = express();
const port = 3001;
var router1 = require('./apiRouter'); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router1);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
