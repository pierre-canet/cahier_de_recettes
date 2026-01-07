const Recipe = require("../models/recipe");

exports.createRecipe = (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    userId: req.body.userId,
    date: req.body.date,
  });

  recipe
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllRecipes = (req, res, next) => {
  Recipe.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneRecipe = (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyRecipe = (req, res, next) => {
  Recipe.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteRecipe = (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
