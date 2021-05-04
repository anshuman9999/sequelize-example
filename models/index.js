const Sequelize = require('sequelize');
const User = require("./User")
const Post = require("./Post")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Post: Post(sequelize, Sequelize.DataTypes)
}

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
