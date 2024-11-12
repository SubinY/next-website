module.exports = (sequelize: any, DataTypes: any) => {
  const WorkModel = sequelize.define(
    "works",
    {
      onTime: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      offTime: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      overTimeDuration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, tableName: 'works' }
  );

  return WorkModel;
};
