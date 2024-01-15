import { DataSource, DatabaseType } from "typeorm";
import Url from "@/models/urls";

const progresDatabase: DatabaseType = "postgres";

const AppDataSource = new DataSource({
  type: progresDatabase,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: progresDatabase,
  entities: [Url],
  synchronize: true,
});

async function ConnectDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
}

export { AppDataSource, ConnectDatabase };
