const { v4: uuidv4 } = require('uuid');

let users = [];

const getUser = (req, res) => {
    if (users.length === 0) {
        res.status(404).json({
            status: "error",
            message: "No users found",
            errors: [{ message: "The users list is empty" }]
        });
    } else {
        res.status(200).json({
            status: "success",
            data: users,
            message: "Users retrieved successfully"
        });
    }
};

const addUser = (req, res) => {
    const user = req.body;
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);

    res.status(201).json({
        status: "success",
        data: newUser,
        message: `User ${newUser.firstName} added`
    });
};

const findUser = (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
        res.status(200).json({
            status: "success",
            data: foundUser,
            message: "User found"
        });
    } else {
        res.status(404).json({
            status: "error",
            message: `User with id ${id} not found`,
            errors: [{ field: "id", message: "User not found" }]
        });
    }
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const initialLength = users.length;
    users = users.filter((user) => user.id !== id);

    if (users.length < initialLength) {
        res.status(200).json({
            status: "success",
            message: `Deleted user with id ${id}`
        });
    } else {
        res.status(404).json({
            status: "error",
            message: `User with id ${id} not found`,
            errors: [{ field: "id", message: "User not found" }]
        });
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const user = users.find((user) => user.id === id);

    if (user) {
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (age) user.age = age;

        res.status(200).json({
            status: "success",
            data: user,
            message: `User with id ${id} has been updated`
        });
    } else {
        res.status(404).json({
            status: "error",
            message: `User with id ${id} not found`,
            errors: [{ field: "id", message: "User not found" }]
        });
    }
};

module.exports = { getUser, addUser, findUser, deleteUser, updateUser };