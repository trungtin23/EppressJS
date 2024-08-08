const { v4: uuidv4 } = require('uuid');

let users = []

const getUser = (req, res) => {
    console.log(users);
    res.send(users);
};

const addUser =(req,res) =>{
    const user  = req.body

    users.push({...user, id: uuidv4()})

    res.send(`USER ${user.firstName} added`)

}

const findUser = (req,res) =>{
    const {id} = req.params

    const foudUser = users.find((user) => user.id == id) 

    res.send(foudUser)

}

const deleteUser =(req,res) =>{
    const {id} = req.params 
    users = users.filter((user) => user.id !== id) 

    res.send(`deleted user has id ${id}`)
  

}

const updateUser =  (req,res) =>{
    const {id} = req.params 
    const {firstName,lastName,age}  = req.body

    const user = users.find((user) => user.id == id) 

    if(firstName){user.firstName = firstName}

    if(lastName){user.lastName = lastName}

    if(age){user.age = age}

    
    res.send(`user has id: ${id} has been updated`)
  

}

module.exports = { getUser,addUser,findUser,deleteUser,updateUser };