import {
  dbConnection,
  insertData,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventid = req.query.eventId;

  let client;
  try {
    client = await dbConnection();
  } catch (error) {
    res.status(500).json({ message: "Failed to connect to database" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    if (
      (!email ||
        !email.includes("@") ||
        email.trim() === " " ||
        !name ||
        name.trim() === " ",
      !comment || comment.trim() === " ")
    ) {
      res
        .status(422)
        .json({ message: "Invalid input, please input data correctly!" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      comment,
      eventid,
    };

    let result;
    try {
      result = await insertData(client, "comments", newComment);
      console.log(result);
      res.status(201).json({
        message: "Your comment added successfully",
        comment: newComment,
      });
      client.close();
    } catch (error) {
      res.status(422).json({ message: "Data insertion failed!" });
      return;
    }
  }

  if (req.method === "GET") {
    let documents;
    try {
      documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Fetching comments failed!" });
    }
    client.close();
  }
}

export default handler;
