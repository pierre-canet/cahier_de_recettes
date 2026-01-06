const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
mongoose
  .connect(
    "mongodb+srv://pierrecanet_db_user:fjU1RFdbqljGO0LM@recipebook.dtoh6wu.mongodb.net/RecipeBook?retryWrites=true&w=majority"
  )

  .then(() => console.log("Connexion à MongoDB réussie !"))

  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

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

app.use("/api/stuff", (req, res, next) => {
  Recipe.find()

    .then((things) => res.status(200).json(things))

    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
