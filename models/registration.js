module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    }
  });
  return Registration;
};
// input v
