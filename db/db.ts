const { Pool } = require("pg");

let globalPool: any = null;

export async function getDb() {
  if (!globalPool) {
    const connectionString = process.env.POSTGRES_URL;
    globalPool = new Pool({
      connectionString,
    });
  }

  return globalPool;
}
