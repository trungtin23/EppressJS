const { v4: uuidv4 } = require('uuid');
const { param } = require('../routes/users');

let users = [];

const getUser = (req, res) => {
    console.log(users);

    if (users.length === 0) {
        res.status(404).json({
            error: {
                message: "Danh sách người dùng trống.",
                code: 404
            },
            message: "Danh sách người dùng trống",
            status: 404,
            result: -1,
        });
    } else {
        res.status(200).json({
            message: "Lấy danh sách người dùng thành công",
            status: 200,
            result: 1,
            data: users
        });
    }
};

const addUser = (req, res) => {
    const user = req.body;

    if (!user.firstName || !user.lastName) {
        return res.status(400).json({
            error: {
                message: "Tên và họ là bắt buộc.",
                code: 400
            },
            message: "Vui lòng cung cấp đầy đủ thông tin người dùng.",
            status: 400,
            result: -1,
        });
    }

    try {
        const newUser = { ...user, id: uuidv4() };
        users.push(newUser);

        res.status(201).json({
            message: `Người dùng ${newUser.firstName} đã được thêm thành công.`,
            status: 201,
            result: 1,
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            error: {
                message: "Đã xảy ra lỗi khi thêm người dùng.",
                code: 500
            },
            message: error.message,
            status: 500,
            result: -1,
        });
    }
};

const findUser = (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
        return res.status(404).json({
            error: {
                message: "Không tìm thấy người dùng.",
                code: 404
            },
            message: `Không tìm thấy người dùng với id : ${id}`,
            status: 404,
            result: -1,
        });
    }
    res.status(200).json({
        message: "Tìm người dùng thành công",
        status: 200,
        result: 1,
        data: foundUser
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            error: {
                message: "Người dùng không tồn tại.",
                code: 404
            },
            message: "Không tìm thấy người dùng để xóa.",
            status: 404,
            result: -1,
        });
    }

    users = users.filter((user) => user.id !== id);
    res.status(200).json({
        message: `Người dùng có ID ${id} đã bị xóa.`,
        status: 200,
        result: 1,
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            error: {
                message: "Người dùng không tồn tại.",
                code: 404
            },
            message: "Không thể cập nhật người dùng không tồn tại.",
            status: 404,
            result: -1,
        });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;

    res.status(200).json({
        error: null,
        message: `Người dùng có ID: ${id} đã được cập nhật.`,
        status: 200,
        result: 1,
        data: user
    });
};


module.exports = { getUser, addUser, findUser, deleteUser, updateUser };
