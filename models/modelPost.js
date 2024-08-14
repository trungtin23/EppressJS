const { DataTypes } = require('sequelize');
const sequelize = require('../dbconfig/db');
const User = require('./modelUsers');  

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'posts',
    timestamps: false
});

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ force: false })  
    .then(() => {
        console.log('tạo bảng post thành công');
    })
    .catch((error) => {
        console.error('tạo bảng post thất bại', error);
    });

module.exports = Post;
