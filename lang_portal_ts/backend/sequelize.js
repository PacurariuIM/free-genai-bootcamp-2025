const { Sequelize } = require('sequelize');
const config = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  test: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
};

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  test: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite',
  },
}; 