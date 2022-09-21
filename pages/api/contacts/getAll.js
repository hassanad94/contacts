export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

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

    res.status(500).json(get);
  } catch (error) {
    return res.json(error);
  }
}
