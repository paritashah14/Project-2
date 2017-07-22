module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  })
  return user;
}
// input v
