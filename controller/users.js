const { v4: uuidv4 } = require('uuid');
const { param } = require('../routes/users');
const db = require ('../dbconfig/db')
const User  = require('../models/modelUsers')
const { successRespHelper, failRespHelper } = require('../helper/respHelper');


let users = [];

const getUser = async (req, res) => {
    
    try {
        const users = await User.findAll()

        if (users.length === 0) {
            console.log( users.length)
            return failRespHelper(res, 404, "Không có người dùng nào ", null);
        }
        successRespHelper(res, 200, `Lấy danh sách người dùng thành công`, users);

    } catch (error) {
        return failRespHelper(res, 500, "Lỗi khi lấy ra danh sách người dùng ", error.message);
    }
};


const addUser = async (req, res) => {
    const { firstName, lastName, age } = req.body;


    if (!firstName || !lastName) {
        return failRespHelper(res, 400, "Vui lòng cung cấp đầy đủ thông tin người dùng.", null);
    }

    try {
        const newUser = await User.create({
            uuidv4,
            firstName,
            lastName,
            age
        });
        successRespHelper(res, 201, `Người dùng ${newUser.firstName} đã được thêm thành công.`, newUser);
    } catch (error) {
        failRespHelper(res, 500, "Đã xảy ra lỗi khi thêm người dùng.", error.message);
    }
};

const findUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userFounded = await User.findByPk(id);
        if (!userFounded) {
            return failRespHelper(res, 404, "Người dùng không tồn tại", null);
        }
        successRespHelper(res, 200, "Tìm thành công người dùng", userFounded);
    } catch (error) {
        failRespHelper(res, 500, "Đã xảy ra lỗi khi tìm kiếm người dùng", error.message);
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userFounded = await User.findByPk(id);
        if (!userFounded) {
            return failRespHelper(res, 404, "Người dùng không tồn tại", null);
        }
        await User.destroy({ where: { id } });
        successRespHelper(res, 200, `Người dùng có ID ${id} đã bị xóa thành công.`, null);
    } catch (error) {
        failRespHelper(res, 500, "Đã xảy ra lỗi khi xóa người dùng", error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;
        
        const user = await User.findByPk(id);
        if (!user) {
            return failRespHelper(res, 404, "Người dùng không tồn tại.", null);
        }
        await user.update({
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            age: age !== undefined ? age : user.age
        });
        successRespHelper(res, 200, `Người dùng có ID: ${id} đã được cập nhật.`, user);

    } catch (error) {
        failRespHelper(res, 500, "Đã xảy ra lỗi khi cập nhật người dùng.", error.message);
    }
};



module.exports = { getUser, addUser, findUser, deleteUser, updateUser };
