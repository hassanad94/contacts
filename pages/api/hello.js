import { sqlite3 } from "sqlite3";

export default function handler(req, res) {
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database(
    "./contacts.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err.message);

      return console.log("db connected");
    }
  );

  db.all("SELECT * FROM person", [], (err, rows) => {
    if (err) return console.error(err.message);
    res.status(200).json(rows);
  });
}
