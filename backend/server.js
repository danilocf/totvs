const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;
let db;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) throw err;
    db = client.db("totvs");
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
  }
);

app.get("/clients", (req, res) => {
  db.collection("clients")
    .find({})
    .toArray((err, result) => {
      if (err) {
        console.log("err", err);
        return res.status(500);
      }
      res.send(result);
    });
});
