const Sequelize = require('sequelize');
const User = require("./User")
const Post = require("./Post")
const Comment = require("./Comment")
const Favorite = require("./Favorite")
const Friend = require("./Friend")
const applyExtraSetup = require("./extrasetup")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Post: Post(sequelize, Sequelize.DataTypes),
  Comment: Comment(sequelize, Sequelize.DataTypes),
  Favorite: Favorite(sequelize, Sequelize.DataTypes),
  Friend: Friend(sequelize, Sequelize.DataTypes),
}

applyExtraSetup(sequelize)

models.sequelize = sequelize;

module.exports = models;
