const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('datlichkhambenh', 'root', 'nguyenpro20311', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307,
  logging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối đã được thiết lập thành công.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = connectDB;
