const Sequelize = require('sequelize');
const User = require('./user');
const Comment2 = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

console.log(config);

const db= {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Comment2 = Comment2;

User.initiate(sequelize);
Comment2.initiate(sequelize);

User.associate(db);
Comment2.associate(db);

module.exports = db;