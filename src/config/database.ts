import sql from "mssql";
import "dotenv/config";

const config: sql.config = {
  server: process.env.DB_SERVER || "localhost",
  port: 1433,
  database: process.env.DB_NAME || "ACTI",
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    cryptoCredentialsDetails: {
      minVersion: "TLSv1",
    },
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

class Database {
  private static instance: Database;
  private pool: sql.ConnectionPool | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<sql.ConnectionPool> {
    if (this.pool && this.pool.connected) {
      return this.pool;
    }

    try {
      this.pool = await sql.connect(config);
      console.log("✅ Conectado ao SQL Server");
      return this.pool;
    } catch (error) {
      console.error("❌ Erro ao conectar com o banco:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
      console.log("🔌 Desconectado do SQL Server");
    }
  }

  public getPool(): sql.ConnectionPool | null {
    return this.pool;
  }
}

export default Database;
