const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

var userRoutes = require('./routes/usersRoute')
var postRoutes = require('./routes/postsRoute')
var loginRoutes = require('./routes/loginRoute')
const sequelize = require('./dbconfig/db');


const app = express()
const port = 5000

app.use(bodyParser.json())

app.get('/', (req, res) => {res.send('Main Page');});

app.use('/users',userRoutes)

app.use('/posts',postRoutes)

app.use('/login',loginRoutes)

app.use('/', express.static(path.join(__dirname,'/views')))

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html'));
});


app.listen(port, async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    console.log(`Example app listening on port http://localhost:${port}/`);
 
})

