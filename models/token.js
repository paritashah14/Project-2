module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
    }
  });
  return token;
};
