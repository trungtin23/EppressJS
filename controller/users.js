const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { param } = require('../routes/usersRoute');
const db = require ('../dbconfig/db')
var jwt = require('jsonwebtoken')
const User  = require('../models/modelUsers')
const Post = require('../models/modelPost');
const { successRespHelper, failRespHelper } = require('../helper/respHelper');

const login = async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return failRespHelper(res, 400, "Vui lòng cung cấp tên đăng nhập và mật khẩu.", null);
    }
    try {
        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return failRespHelper(res, 401, "Tên đăng nhập hoặc mật khẩu không đúng.", null);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return failRespHelper(res, 401, "Tên đăng nhập hoặc mật khẩu không đúng.", null);
        }
        const token = jwt.sign({ _id: user._id }, 'tin123', { expiresIn: '1h' });
        successRespHelper(res, 200, "Đăng nhập thành công", token);

    } catch (error) {
        return failRespHelper(res, 500, "Lỗi máy chủ", error.message);
    }
};

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
    const { userName, password, fullName, age } = req.body;

    if (!userName || !password) {
        return failRespHelper(res, 400, "Vui lòng cung cấp đầy đủ thông tin người dùng.", null);
    }

    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const newUser = await User.create({
            uuid: uuidv4(), 
            userName,
            password: hashedPassword,
            fullName,
            age
        });

        successRespHelper(res, 201, `Người dùng ${newUser.userName} đã được thêm thành công.`, newUser);
    } catch (error) {
        failRespHelper(res, 500, "Đã xảy ra lỗi khi thêm người dùng.", error.message);
    }
};

const findUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userFounded = await User.findByPk(id,{
            include: [
                {
                    model: Post,
                    as: 'posts' 
                }
            ]
        });
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
        const { UserName, password, fullName, age } = req.body;
        
        const user = await User.findByPk(id);
        if (!user) {
            return failRespHelper(res, 404, "Người dùng không tồn tại.", null);
        }
        await user.update({
            UserName: UserName || user.UserName,
            password: password || user.password,
            fullName: fullName || user.fullName,
            age: age !== undefined ? age : user.age
        });
        successRespHelper(res, 200, `Người dùng có ID: ${id} đã được cập nhật.`, user);

    } catch (error) {
        failRespHelper(res, 500, "Đã xảy ra lỗi khi cập nhật người dùng.", error.message);
    }
};



module.exports = { getUser, addUser, findUser, deleteUser, updateUser, login};
