const express = require('express')
const bodyParser = require('body-parser')

var userRoutes = require('./routes/users')

const app = express()
const port = 5000


app.use(bodyParser.json())

app.get('/', (req, res) => {res.send('Main Page');});

app.use('/users',userRoutes)

app.listen(port, () => {console.log(`Example app listening on port http://localhost:${port}/`)})

