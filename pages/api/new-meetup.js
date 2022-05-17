import { MongoClient } from "mongodb";

async function handeler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const connectedClient = await MongoClient.connect(
      "mongodb+srv://isroiljon:12ab34sd@cluster0.enpgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = connectedClient.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    connectedClient.close();

    res.status(201).json({message: 'meetup inserted!'});
  }
}

export default handeler;
