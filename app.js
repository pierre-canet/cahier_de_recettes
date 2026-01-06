const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const uri =
  "mongodb+srv://pierrecanet_db_user:fjU1RFdbqljGO0LM@recipebook.dtoh6wu.mongodb.net/RecipeBook";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

app.use(express.json());

app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;

  const recipe = new Recipe({
    ...req.body,
  });

  recipe
    .save()

    .then(() => res.status(201).json({ message: "Objet enregistré !" }))

    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/stuff/:id", (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })

    .then((thing) => res.status(200).json(thing))

    .catch((error) => res.status(404).json({ error }));
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use("/api/stuff", (req, res, next) => {
  Recipe.find()

    .then((things) => res.status(200).json(things))

    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
