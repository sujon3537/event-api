import { dbConnection, insertData } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const enteredEmail = req.body.email;
    if (!enteredEmail || !enteredEmail.includes("@")) {
      return res
        .status(401)
        .json({ error: "plase enter a valid email address" });
    }

    let client;
    try {
      client = await dbConnection();
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to database" });
      return;
    }

    try {
      await insertData(client, "newsletter", {
        email: enteredEmail,
      });
      client.close();
    } catch (error) {
      res.status(422).json({ message: "Data insertion failed!" });
      return;
    }

    res.status(201).json({ message: "your email registered successfully!" });
  }
}

export default handler;
