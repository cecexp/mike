import { createPool } from "mysql";
import { promisify } from "util";

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED");
    } else {
      console.error(err.code);
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TOO MANY CONNECTIONS");
    } else {
      console.error(err.code);
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED");
    } else {
      console.error(err.code);
    }
  }

  if (connection) {
    connection.release();
    console.log("DATABASE CONNECTION WAS ACCEPTED");
  } else {
    console.log("DATABASE IS NOT CONNECTED");
  }
});

pool.query = promisify(pool.query);

export default pool;
