const express = require('express')
const bodyParser = require('body-parser')

var userRoutes = require('./routes/usersRoute')
var postRoutes = require('./routes/postsRoute')
const sequelize = require('./dbconfig/db');


const app = express()
const port = 5000

app.use(bodyParser.json())

app.get('/', (req, res) => {res.send('Main Page');});

app.use('/users',userRoutes)

app.use('/posts',postRoutes)

app.listen(port, async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    console.log(`Example app listening on port http://localhost:${port}/`);
 
})

