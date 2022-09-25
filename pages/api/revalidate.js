export default async function handler(req, res) {
  //In production i would us preccess.env but i dont want to upload .env file on github due to gitguardian
  if (req.query.secret !== "testtoken") {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
