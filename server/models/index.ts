const { Sequelize, DataTypes } = require("sequelize");
const pg = require("pg");

const db = {} as any;

const sequelize = new Sequelize(process.env.POSTGRES_URL as string, {
  dialect: "postgres",
  dialectModule: pg,
});

// 检查连接是否完成
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected to discover");
  })
  .catch((err: any) => {
    console.log(err);
  });

async function createTable() {
  try {
    // 同步模型到数据库，如果表不存在则创建
    await sequelize.sync({ force: false }); // 使用 { force: true } 会删除并重新创建所有表，谨慎使用！
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

db.RunModel = require("./run")(sequelize, DataTypes);

createTable();
// 导出模块
module.exports = db;
