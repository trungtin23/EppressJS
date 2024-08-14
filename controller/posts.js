const { v4: uuidv4 } = require('uuid');
const User  = require('../models/modelUsers')
const Post  = require('../models/modelPost')
const { successRespHelper, failRespHelper } = require('../helper/respHelper');


const addPost = async (req, res) => {
    const { userId, title, content } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return failRespHelper(res, 404, `người dùng với id: ${userId} không tồn tại`, null);
        }

        const newPost = await Post.create({      
            title,
            content,
            userId 
        });
        successRespHelper(res, 200, "Tạo post thành công", newPost);
    } catch (error) {
        failRespHelper(res, 500, "Đã xảy ra Lỗi khi tạo post", error.message);
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return failRespHelper(res, 404, "Không tìm thấy post", null);
        }

        await post.destroy();
        successRespHelper(res, 200, "Xóa thành công post", null);
    } catch (error) {
        failRespHelper(res, 500, "Đã xảy ra lỗi khi xóa post", error.message);
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return failRespHelper(res, 404, "Không tìm thấy post", null);
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();
        successRespHelper(res, 200, "Post cập nhật thành công", post);
    } catch (error) {
        failRespHelper(res, 500, "Lỗi khi cập nhật post", error.message);
    }
};

module.exports ={
    addPost,deletePost,updatePost
}