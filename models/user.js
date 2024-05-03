module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        defaultValue: "shiva",
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: "pal",
      },
    },
    {
      tableName: "users",
      updatedAt: "updateTimestamp",
    }
  );
  return User;
};
