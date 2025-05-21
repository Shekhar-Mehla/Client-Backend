import { MongoClient } from "mongodb";

export const regitserNewUser = async (req, res, next) => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();
    const collection = db.collection("User");
    const result = await collection.insertOne(req.body);
    console.log(result.insertedId);
  } catch (error) {}
};
