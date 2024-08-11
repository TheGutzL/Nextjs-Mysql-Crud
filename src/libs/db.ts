import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: "localhost",
    user: "gutz",
    password: "gutzpassword",
    port: 3306,
    database: "nextjsmysqlcrud",
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
