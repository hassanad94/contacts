import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";

const saveFile = async (file, filename) => {
  fs.writeFile(filename, file.buffer, "binary", (err) => {});
  return filename;
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.use(multer().any());

apiRoute.post(async (req, res) => {
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database(
    "./contacts.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err.message);
    }
  );

  const getAll = new Promise((resolve, reject) => {
    const sql = "SELECT * FROM person";
    db.all(sql, [], (error, contacts) => {
      if (error) return reject(error);

      contacts.forEach((contact) => {
        contact.formatedPhone = contact.phone
          .replace(/\s+/g, "")
          .replace(/^(\d{2})(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4");
      });

      return resolve(contacts);
    });
  });

  try {
    const get = await getAll;

    res.status(200).json(get);
  } catch (error) {
    return res.json(error);
  }
});

export default apiRoute;
