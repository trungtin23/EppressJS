const express = require('express')
const bodyParser = require('body-parser')

var userRoutes = require('./routes/users')
const sequelize = require('./dbconfig/db');
const User = require('./models/modelUsers');

const app = express()
const port = 5000

app.use(bodyParser.json())

app.get('/', (req, res) => {res.send('Main Page');});

app.use('/users',userRoutes)

app.listen(port, async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    console.log(`Example app listening on port http://localhost:${port}/`);
 
})

