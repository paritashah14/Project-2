module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmPassword: DataTypes.STRING
  })
  return Registration;
}
// input v
