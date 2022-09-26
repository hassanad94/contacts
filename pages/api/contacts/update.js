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

  var imageFileName = "";

  if (!req.body.image) {
    let path = `./public/uploads/`;
    let dateName = `${new Date().getTime()}-${req.files[0].originalname}`;

    imageFileName = `${path}${dateName}`;
  }

  var { name, phone, email, image, id } = req.body;

  if (req.body.image) {
    imageFileName = image;
  }

  const updateContactSQL = new Promise((resolve, reject) => {
    const sql =
      "UPDATE person set name = ? , email = ?, phone = ?, image = ? WHERE person_id = ?";
    db.run(
      sql,
      [
        name,
        email,
        phone.replace("+", ""),
        imageFileName.replace("./public", "http://localhost:3000"),
        id,
      ],
      async function (err) {
        if (err) {
          return reject(err);
        }
        const revalidate = await fetch(
          "http://localhost:3000/api/revalidate?secret=testtoken"
        );
        return resolve(this);
      }
    );
  });

  try {
    if (!req.body.image) {
      const uploadImage = await saveFile(req.files[0], imageFileName);
    }

    const updateContact = await updateContactSQL;

    res.status(200).json({ data: { status: true, id: updateContact } });
  } catch (error) {
    return res.json(error);
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
