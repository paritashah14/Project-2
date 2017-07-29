module.exports = function(sequelize, DataTypes) {
  
  var Task = sequelize.define("Task", {
    text: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    dueDay: DataTypes.DATEONLY
    }
  );

   return Task;
};

  
  

