const Sequelize = require('sequelize');
const User = require("./User")
const Post = require("./Post")
const Comment = require("./Comment")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Post: Post(sequelize, Sequelize.DataTypes),
  Comment: Comment(sequelize, Sequelize.DataTypes),
}

const applyExtraSetup = (sequelize) => {
  const { user, post, comment } = sequelize.models

  user.hasMany(post, {
    foreignKey: "creator_id"
  })

  user.hasMany(comment, {
    foreignKey: "user_id"
  })

  post.hasMany(comment, {
    foreignKey: "post_id"
  })

}

applyExtraSetup(sequelize)

models.sequelize = sequelize;

module.exports = models;
