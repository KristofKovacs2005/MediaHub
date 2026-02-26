import { defineConfig } from "cypress";
import config from "./src/config/config"
import mysql from "mysql2/promise"
import fs from "fs";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("task", {
        async resetDb() {
          console.log(config.database);
          const connection = await mysql.createConnection(config.database);

          const sql = fs.readFileSync("cypress/db/seed.sql", "utf8");
          await connection.query(sql);
          await connection.end();

          return null;
        },
      });
    },
  },
});