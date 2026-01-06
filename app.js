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

app.get("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",

      title: "Mon premier objet",

      description: "Les infos de mon premier objet",

      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",

      price: 4900,

      userId: "qsomihvqios",
    },

    {
      _id: "oeihfzeomoihi",

      title: "Mon deuxième objet",

      description: "Les infos de mon deuxième objet",

      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",

      price: 2900,

      userId: "qsomihvqios",
    },
  ];

  res.status(200).json(stuff);
});

module.exports = app;
