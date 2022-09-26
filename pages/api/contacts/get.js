import nextConnect from "next-connect";
import multer from "multer";

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

  const { contactID } = JSON.parse(req.body);

  const dbQuery = new Promise((resolve, reject) => {
    const sql = "SELECT * FROM person WHERE person_id = (?)";
    db.all(sql, [contactID], (error, contacts) => {
      if (error) return reject(error);

      return resolve(contacts);
    });
  });

  try {
    const getAPerson = await dbQuery;

    res.status(200).json({ data: { status: true }, person: getAPerson });
  } catch (error) {
    return res.json(error);
  }
});

export default apiRoute;
