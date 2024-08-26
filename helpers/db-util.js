import { MongoClient } from "mongodb";

export async function dbConnection() {
  const client = await MongoClient.connect(
    "mongodb+srv://eventor:ka1amani|<@cluster0.km2vh9e.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}

export async function insertData(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}
