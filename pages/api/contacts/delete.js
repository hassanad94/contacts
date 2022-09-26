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
    const sql = "DELETE FROM person WHERE person_id = (?)";

    db.run(sql, [contactID], async function (err) {
      if (err) {
        return reject(err);
      }
      const revalidate = await fetch(
        "http://localhost:3000/api/revalidate?secret=testtoken"
      );
      console.log(this);
      return resolve(this);
    });
  });

  try {
    const deletePerson = await dbQuery;

    res.status(200).json({ data: { status: true }, deletePerson });
  } catch (error) {
    return res.json(error);
  }
});

export default apiRoute;
