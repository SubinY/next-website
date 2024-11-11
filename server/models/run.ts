module.exports = (sequelize: any, DataTypes: any) => {
  const RunModel = sequelize.define(
    "runs",
    {
      startTime: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kilometre: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nameSuffix: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amapWaterMark: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, tableName: 'runs' }
  );

  return RunModel;
};
